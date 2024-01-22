import React, { useState, useEffect } from 'react';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

axios.defaults.withCredentials = true;

const CreatePurchaseOrder = () => {
  const [formData, setFormData] = useState({
    supplier: '',
    site: '',
    purchaseOrderNo: '',
    duration: '',
    startdate: '',
    requirement: [{
      material: '',
      rate: '',
      quantity: '',
      unit: '',
      amount: '',
    }],
  });
  const [requirement, setRequirement] = useState({
    material: '',
    rate: '',
    quantity: '',
    unit: '',
    amount: '',
    status: '',
  });
  const [data, setData] = useState({
    supplier: '',
    site: '',
  });
  const [sites, setSite] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const status = ['Started', 'Completed', 'Pending', 'Partaly Completed'];
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM', 'BAG', 'KG', 'TONES', 'LITERS'];
  const [requirementToEdit, setRequirementToEdit] = useState({
    id: '',
    index: '',
  });
  const [purchaseOrderToEdit, setPurchaseOrderToEdit] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { index } = useParams();

  useEffect(() => {
    if (id && index) {
      setRequirementToEdit({ id, index })
      fetchPurchaseOrder(id, index);
    } else if (id && !index) {
      setPurchaseOrderToEdit(id)
      fetchPurchaseOrder(id)
    }
  }, [id, index]);

  useEffect(() => {

    const fetchSite = async () => {
      try {
        const response = await axios.get('/api/v1/site');
        setSite(response.data)
      } catch (error) {
        toast.error(error.message)
      }
    };

    const fetchSupplier = async () => {
      try {
        const supplierData = await axios.get('/api/v1/Supplier');
        setSupplier(supplierData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchSite();
    fetchSupplier();
  }, []);

  const fetchPurchaseOrder = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/purchase-order/${id}`);
      if (id && index) {
        const require = response.data.requirement[index];
        setRequirement({
          material: require.material,
          rate: require.rate,
          quantity: require.quantity,
          unit: require.unit,
          amount: require.amount,
          status: require.status,
        })
      } else if (id && !index) {
        setData({
          site: response.data?.site.name,
          supplier: response.data?.supplier.name,
        });
        setFormData({
          supplier: response.data?.supplier._id,
          site: response.data?.site._id,
          purchaseOrderNo: response.data?.purchaseOrderNo,
          duration: response.data?.duration,
          startdate: response.data?.startdate,
          requirement: [{
            material: '',
            rate: '',
            quantity: '',
            unit: '',
            amount: '',
          }],
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleUpdate = (field, value) => {
    setRequirement({
      ...requirement,
      [field]: value
    })
  }

  const handleAddWork = () => {
    setFormData({
      ...formData,
      requirement: [
        ...formData.requirement,
        {
          material: '',
          rate: '',
          quantity: '',
          unit: '',
        },
      ],
    });
  };

  const handleRemoveWork = (index) => {
    const updatedRequirement = [...formData.requirement];
    updatedRequirement.splice(index, 1);
    setFormData({
      ...formData,
      requirement: updatedRequirement,
    });
  };

  const handleWorkChange = (index, field, value) => {
    const updatedRequirement = [...formData.requirement];
    updatedRequirement[index][field] = value;
    setFormData({
      ...formData,
      requirement: updatedRequirement,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      requirement: formData.requirement.map((detail) => {
        const amount = parseFloat(detail.quantity) * parseFloat(detail.rate);
        return {
          ...detail,
          amount: isNaN(amount) ? '' : amount.toFixed(2),
        };
      }),
    };
    setFormData(updatedFormData)

    const amount = parseFloat(requirement.quantity) * parseFloat(requirement.rate);
    const updatedDetail = {
      ...requirement,
      amount: isNaN(amount) ? '' : amount.toFixed(2),
    }

    try {
      if (purchaseOrderToEdit) {
        console.log(updatedFormData)
        const response = await axios.put(`/api/v1/purchase-order/${purchaseOrderToEdit}`, updatedFormData);
        toast.success(response.data.message)
        navigate(-1)
      } else if (requirementToEdit.id && requirementToEdit.index) {
        console.log(updatedDetail)
        const response = await axios.put(`/api/v1/purchase-order/${requirementToEdit.id}/requirement/${requirementToEdit.index}`,  updatedDetail);
        toast.success(response.data.message)
        navigate(-1)
      } else {
        console.log(updatedFormData)
        const response = await axios.post('/api/v1/purchase-order/create', updatedFormData);
        toast.success(response.data.message)
        navigate(-1)
      }
    } catch (error) {
      console.error('Error submitting work order:', error.message);
      toast.error(error.message)
    }
  };

  return (
    <div className="container mx-auto mt-6 mb-24">
      <form className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Purchase Order</h2>

        <div className="mb-4">
          <label htmlFor="site" className="block text-sm font-semibold text-gray-600">
            Site
          </label>
          <select
            name="site"
            value={formData.site}
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => handleChange('site', e.target.value)}
          >
            <option>Site</option>
            {sites.map((site) => (
              <option key={site._id} value={site._id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="contractorName" className="block text-sm font-semibold text-gray-600">
            Supplier
          </label>
          <select
            name="contractor"
            value={formData.supplier}
            onChange={(e) => handleChange('supplier', e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option>Supplier</option>
            {suppliers?.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Work Details</h2>

          {formData.requirement.map((material, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 grid-flow-row-dense gap-4">

                <div className='col-span-2'>
                  <label
                    htmlFor={`work[${index}].rate`}
                    className="block text-sm font-semibold text-gray-600">
                    Material
                  </label>
                  <input
                    type="text"
                    // value={workItem.material}
                    onChange={(e) => handleWorkChange(index, 'material', e.target.value)}
                    placeholder="Material"
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`work[${index}].rate`}
                    className="block text-sm font-semibold text-gray-600">
                    Rate
                  </label>
                  <input
                    type="number"
                    // value={workItem.rate}
                    onChange={(e) => handleWorkChange(index, 'rate', e.target.value)}
                    placeholder="Rate"
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`work[${index}].quantity`}
                    className="block text-sm font-semibold text-gray-600">
                    Quantity
                  </label>
                  <input
                    type="number"
                    // value={workItem.quantity}
                    onChange={(e) => handleWorkChange(index, 'quantity', e.target.value)}
                    placeholder="Quantity"
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`work[${index}].unit`}
                    className="block text-sm font-semibold text-gray-600">
                    Unit
                  </label>
                  <select
                    // value={workItem.unit}
                    onChange={(e) => handleWorkChange(index, 'unit', e.target.value)}
                    className="border p-2 rounded w-full">
                    <option>Select a Unit</option>
                    {units.map((unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.requirement.length > 1 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemoveWork(index)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddWork}
            className="bg-blue-500 text-white p-2 rounded"
          >
            More Requirement
          </button>
        </div>

        <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
          Submit Purchase Order
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default CreatePurchaseOrder;


