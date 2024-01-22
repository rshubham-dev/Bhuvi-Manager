import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;

const CreateBill = () => {
  const [sites, setSite] = useState([]);
  const [data, setData] = useState({
    site: '',
    contractor: '',
    client: '',
    supplier: '',
  });
  const [bill, setBill] = useState({
    site: '',
    billFor: '',
    contractor: '',
    client: '',
    supplier: '',
    createdBy: '',
    billOf: '',
    dateOfPayment: '',
    paymentStatus: '',
    reason: '',
    paidAmount: '',
    dueAmount: '',
  });
  const [suppliers, setSupplier] = useState([]);
  const [client, setClient] = useState({});
  const [contractors, setContractor] = useState([]);
  const billFor = ['Client', 'Contractor', 'Supplier', 'Material'];
  const status = ['Due', 'Paid', 'Pending'];
  const { user } = useSelector((state) => state.auth)
  const [billToEdit, setBillToEdit] = useState(null);
  const [billWork, setBillWork] = useState([]);
  const [materials, setMaterial] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getsites = async () => {
      try {
        const sitesData = await axios.get('/api/v1/site');
        setSite(sitesData.data);
      } catch (error) {
        toast.error(error.message)
      }
    };
    getsites();
    if (id) {
      setBillToEdit(id)
      fetchBill(id)
    }
  }, [])

  useEffect(() => {
    const siteId = bill.site;
    let siteData = [];
    if (siteId) {
      siteData = sites.filter((site) => site._id === siteId);
    }
    console.log(siteData)
    setContractor(siteData[0]?.contractor || '');
    setClient(siteData[0]?.client || '');
    setSupplier(siteData[0]?.supplier || '');
    getpaymentSchedule(siteId, bill.billFor);
  }, [bill.site]);
  bill.client = client.name;

  const getpaymentSchedule = async (siteId, billFor) => {
    try {
      console.log(siteId)
      const response = await axios.get(`/api/v1/payment-schedule/site/${siteId}`);
      const paymentSchedules = response.data.filter((detail) => detail.scheduleFor === billFor);
      const paymentWorks = paymentSchedules.map((paymentSchedule) => paymentSchedule.paymentDetails)
      setBillWork(paymentWorks)
      console.log(paymentSchedules)
      console.log(paymentWorks)
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getMaterialOrder = async () => {
      try {
        const response = await axios.get(`/api/v1/purchase-order/${bill.site}/${bill.supplier}`);
        const purchase = response.data;
        setMaterial(...purchase.map((purchase) => purchase.requirement))
        console.log('material:', purchase)
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    getMaterialOrder()
  }, [bill.supplier])

  console.log(materials)

  const fetchBill = async (id) => {
    try {
      const billData = await axios.get(`/api/v1/bill/${id}`);
      console.log(billData.data)
      setData({
        site: billData.data.site?.name,
        contractor: billData.data.contractor?.name,
        client: billData.data.client?.name,
        supplier: billData.data.supplier?.name,
      })

      setBill({
        site: billData.data?.site._id,
        contractor: billData.data.contractor?._id,
        client: billData.data.client?._id,
        supplier: billData.data.supplier?._id,
        billOf: billData.data.billOf.workDescription,
        billFor: billData.data.billFor,
        createdBy: billData.data.createdBy?._id,
        dateOfPayment: billData.data?.dateOfPayment,
        paymentStatus: billData.data?.paymentStatus,
        reason: billData.data?.reason,
        paidAmount: billData.data?.paidAmount,
        dueAmount: billData.data?.dueAmount,
      })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const handleChange = (field, data) => {
    setBill({
      ...bill,
      [field]: data,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (billToEdit) {
        console.log(bill)
        const updateBill = await axios.put(`/api/v1/bill/${billToEdit}`, {
          site: bill.site,
          billFor: bill.billFor,
          contractor: bill.contractor,
          client: client._id,
          supplier: bill.supplier,
          createdBy: user._id,
          billOf: bill.billOf,
          dateOfPayment: bill.dateOfPayment,
          paymentStatus: bill.paymentStatus,
          reason: bill.reason,
          paidAmount: bill.paidAmount,
          dueAmount: bill.dueAmount,
        });
        if (updateBill) {
          console.log(updateBill.data)
          toast.success(updateBill.data.message);
          navigate(-1)
        }
      } else {
        const response = await axios.post('/api/v1/bill/create', {
          site: bill.site,
          billFor: bill.billFor,
          contractor: bill.contractor,
          client: client._id,
          supplier: bill.supplier,
          createdBy: user._id,
          billOf: bill.billOf,
        });
        console.log(response.data)
        toast.success(response.data.message);
        navigate(-1)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const BillFor = (name) => {
    switch (name) {
      case 'Contractor':
        return (
          <>
            <label htmlFor="contractor" className="block text-sm font-medium text-gray-600 mb-2">
              Choose Contractor
            </label>
            <select
              name="contractor"
              value={bill.contractor}
              onChange={(e) => handleChange('contractor', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{billToEdit ? data.contractor : 'Contractor'}</option>
              {contractors && contractors?.map((contractor) => (
                <option key={contractor?._id} value={contractor?._id}>
                  {contractor?.name}
                </option>
              ))}
            </select>
          </>
        );
        break;
      case 'Supplier':
        return (
          <>
            <label htmlFor="contractor" className="block text-sm font-medium text-gray-600 mb-2">
              Choose Supplier
            </label>
            <select
              name="supplier"
              value={bill.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{billToEdit ? data.supplier : 'Supplier'}</option>
              {suppliers && suppliers?.map((supplier) => (
                <option key={supplier?._id} value={supplier?._id}>
                  {supplier?.name}
                </option>
              ))}
            </select>
          </>
        );
        break;
      case 'Client':
        return (
          <>
            <label htmlFor="client" className="block text-sm font-medium text-gray-600 mb-2">
              Client
            </label>
            <input
              name="client"
              value={bill.client || ''}
              readOnly
              onChange={(e) => handleChange('client', e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </>
        );
        break;
      case 'Material':
        return (
          <>
            <label htmlFor="contractor" className="block text-sm font-medium text-gray-600 mb-2">
              Choose Supplier
            </label>
            <select
              name="supplier"
              value={bill.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{billToEdit ? data.supplier : 'Supplier'}</option>
              {suppliers && suppliers?.map((supplier) => (
                <option key={supplier?._id} value={supplier?._id}>
                  {supplier?.name}
                </option>
              ))}
            </select>
          </>
        );
        break;
      default: return (
        <p>Please Select, For Whom You Wan't to Make Bill </p>
      );
        break;
    }
  };

  const Update = () => {
    return (
      <>
        <div className="mb-4">
          <label htmlFor='dateOfPayment' className="block text-sm font-semibold text-gray-600 mb-2">
            Date of Payment
          </label>
          <input
            type="date"
            name='dateOfPayment'
            value={bill.dateOfPayment}
            onChange={(e) => handleChange('dateOfPayment', e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor='paidAmount' className="block text-sm font-semibold text-gray-600 mb-2">
            Paid Amount
          </label>
          <input
            type="number"
            name='paidAmount'
            value={bill.paidAmount}
            onChange={(e) => handleChange('paidAmount', e.target.value)}
            placeholder="Paid Amount"
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor='dueAmount' className="block text-sm font-semibold text-gray-600 mb-2">
            Due Amount
          </label>
          <input
            type="number"
            name='dueAmount'
            value={bill.dueAmount}
            onChange={(e) => handleChange('dueAmount', e.target.value)}
            placeholder="Due Amount"
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentStatus" className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            value={bill.paymentStatus}
            onChange={(e) => handleChange('paymentStatus', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>
              {billToEdit ? bill.paymentStatus :
                'Status'
              }
            </option>
            {status.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </>
    )
  }

  return (
    <main>
      <section className='container mx-auto mt-6 mb-24'>
        <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-4 text-center">Bill</h1>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
              Bill for
            </label>
            <select
              name="scheduleFor"
              value={bill.billFor}
              onChange={(e) => handleChange('billFor', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{billToEdit ? bill.billFor : 'Bill for'}</option>
              {billFor.map((bill, index) => (
                <option key={index} value={bill}>
                  {bill}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor='site' className="block text-sm font-medium text-gray-600 mb-2">Site</label>
            <select
              name='site'
              value={bill.site}
              required
              onChange={(e) => handleChange('site', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{billToEdit ? data.site : 'Site'}</option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            {BillFor(bill.billFor)}
          </div>

          {bill.billFor === 'Material' ?
            <div className="mb-4">
              <label
                htmlFor='material'
                className="block text-sm font-medium text-gray-600 mb-2">
                Ordered Material
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleChange('billOf', e.target.value)}>
                <option>{billToEdit ? bill.billOf : 'Select Ordered Material'}</option>
                {materials.map((requirement, index) => (
                  <option key={index} value={requirement.material}>
                    {requirement.material}
                  </option>
                ))}
              </select>
            </div>
            :
            <div className="mb-4">
              <label
                htmlFor='work'
                className="block text-sm font-medium text-gray-600 mb-2">
                Work
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleChange('billOf', e.target.value)}>
                <option>{billToEdit ? bill.billOf : 'Work'}</option>
                {billWork.map((work, index) => (
                  <option key={index} value={work.workDescription}>
                    {work.workDescription}
                  </option>
                ))}
              </select>
            </div>
          }

          {billToEdit ? <Update /> : ''}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Create Bill
            </button>
          </div>

        </form>
      </section>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </main>
  )
}

export default CreateBill