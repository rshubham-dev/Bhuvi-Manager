import React, { useState, useEffect } from 'react';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const CreatePurchaseOrder = () => {
  const [formData, setFormData] = useState({
    supplier: '',
    site: '',
    purchaseOrderNo: '',
    createdBy: '',
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
    slip: '',
  });
  const [data, setData] = useState({
    supplier: '',
    site: '',
    createdBy: '',
  });
  const [materials, setMaterial] = useState([]);
  const [sites, setSite] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const status = ['Delivered', 'Pending', 'Returned'];
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM', 'BAG', 'KG', 'TONES', 'LITERS'];
  const [requirementToEdit, setRequirementToEdit] = useState({
    id: '',
    index: '',
  });
  const [purchaseOrderToEdit, setPurchaseOrderToEdit] = useState(null);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
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
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge') {
          const existingSites = user?.site;
          let Sites = [];
          for (let site of response.data) {
            if (existingSites.includes(site._id)) {
              Sites.push(site);
            }
          }
          setSite(Sites)
        } else {
          setSite(response.data)
        }
      } catch (error) {
        console.error(error.message)
      }
    };

    const fetchSupplier = async () => {
      try {
        const supplierData = await axios.get('/api/v1/Supplier');
        setSupplier(supplierData.data);
      } catch (error) {
        console.error(error.message)
      }
    }

    const fetchMaterial = async () => {
      try {
        const title = 'Purchase Order';
        const data = await axios.post('/api/v1/work-details/name', {
          title
        });
        // console.log(data.data)
        let material = [];
        for (let i = 0; i < data.data.description.length; i++) {
          material = material.concat(data.data.description[i]);
        }
        console.log(material)
        setMaterial(material)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchSite();
    fetchSupplier();
    fetchMaterial();
  }, []);

  const fetchPurchaseOrder = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/purchase-order/${id}`);
      if (id && index) {
        const require = response.data.requirement[index];
        console.log(require)
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
          createdBy: response.data?.createdBy?._id,
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
      requirement: formData?.requirement?.map((detail) => {
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
        const response = await axios.put(`/api/v1/purchase-order/${purchaseOrderToEdit}`, formData);
        toast.success(response.data.message)
        navigate(-1)
      } else if (requirementToEdit.id && requirementToEdit.index) {
        console.log(updatedDetail)
        const response = await axios.put(`/api/v1/purchase-order/${requirementToEdit.id}/requirement/${requirementToEdit.index}`, updatedDetail);
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

  if (requirementToEdit.id && requirementToEdit.index) {
    return (
      <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
        <Header category="Page" title="Dashboard" />
        <section className="flex items-center justify-center max-h-screen mb-16 mt-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-2 w-full max-w-md">

            <div className='mb-4'>
              <label
                htmlFor='material'
                className="block text-sm font-semibold text-gray-600 mb-1">
                Material
              </label>
              <input
                type="text"
                value={requirement.material}
                onChange={(e) => handleUpdate('material', e.target.value)}
                placeholder="Material"
                className="border p-2 rounded w-full"
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='rate'
                className="block text-sm font-semibold text-gray-600 mb-1">
                Rate
              </label>
              <input
                type="number"
                value={requirement.rate}
                onChange={(e) => handleUpdate('rate', e.target.value)}
                placeholder="Rate"
                className="border p-2 rounded w-full"
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='quantity'
                className="block text-sm font-semibold text-gray-600 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={requirement.quantity}
                onChange={(e) => handleUpdate('quantity', e.target.value)}
                placeholder="Quantity"
                className="border p-2 rounded w-full"
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='unit'
                className="block text-sm font-semibold text-gray-600 mb-1">
                Unit
              </label>
              <select
                value={requirement.unit}
                onChange={(e) => handleUpdate('unit', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>{requirementToEdit ? requirement.unit : 'Select a Unit'}</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='status'
                className="block text-sm font-semibold text-gray-600 mb-1">
                Status
              </label>
              <select
                value={requirement.status}
                onChange={(e) => handleUpdate('status', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>{requirementToEdit ? requirement.status : 'Status'}</option>
                {status.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className='mb-4'>
              <label
                htmlFor='slip'
                className="block text-sm font-semibold text-gray-600 mb-1">
                Slip
              </label>
              <input
                type="file"
                onChange={(e) => handleUpdate('slip', e.target.files[0])}
                className="border p-2 rounded w-full"
              />
            </div> */}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Requirement
            </button>

          </form>
        </section>
      </div>
    )
  } else {
    return (
      <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
        <Header category="Page" title="Create Purchase Order" />
        <div className="container mx-auto mt-4 mb-16">
          <form className="max-w-xl mx-auto " onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="site" className="block text-sm font-semibold text-gray-600">
                Site
              </label>
              <select
                name="site"
                value={formData.site}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleChange('site', e.target.value)}>
                <option>{purchaseOrderToEdit ? data?.site : 'Site'}</option>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>{purchaseOrderToEdit ? data?.supplier : 'Supplier'}</option>
                {suppliers?.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            {purchaseOrderToEdit ? '' :
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Work Details</h2>

                {formData.requirement.map((item, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <div className="grid grid-cols-2 grid-flow-row-dense gap-4">

                      <div className='col-span-2'>
                        <label
                          htmlFor={`work[${index}].material`}
                          className="block text-sm font-semibold text-gray-600">
                          Material
                        </label>
                        <select
                          value={item.material}
                          onChange={(e) => handleWorkChange(index, 'material', e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                          <option value="">Material</option>
                          {materials.map((material, index) => (
                            <option key={index} value={material.work}>{material.work}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={`work[${index}].rate`}
                          className="block text-sm font-semibold text-gray-600">
                          Rate
                        </label>
                        <input
                          type="number"
                          value={item.rate}
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
                          value={item.quantity}
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
                          value={item.unit}
                          onChange={(e) => handleWorkChange(index, 'unit', e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
            }
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">
              {purchaseOrderToEdit ? 'Update' : 'Create Purchase Order'}
            </button>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    );
  }
}

export default CreatePurchaseOrder;


