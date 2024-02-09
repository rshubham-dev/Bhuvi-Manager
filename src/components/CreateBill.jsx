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
    supplier: '',
  });
  const [bill, setBill] = useState({
    site: '',
    billFor: '',
    contractor: '',
    supplier: '',
    createdBy: '',
    billOf: '',
    billNo: '',
    toPay: '',
    amount: '',
    unit: '',
    dateOfPayment: '',
    paymentStatus: '',
    reason: '',
    paidAmount: '',
    dueAmount: '',
  });
  const [suppliers, setSupplier] = useState([]);
  const [contractors, setContractor] = useState([]);
  const billFor = ['Contractor', 'Supplier'];
  const status = ['Due', 'Paid', 'Pending'];
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [billToEdit, setBillToEdit] = useState(null);
  const [billWork, setBillWork] = useState([]);
  const [materials, setMaterial] = useState([]);
  const [paymentDetail, setPaymentDetail] = useState({});
  const units = ['%', '₹']
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getsites = async () => {
      try {
        const sitesData = await axios.get('/api/v1/site');
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge') {
          const existingSites = user?.site;
          let Sites;
          for(let existSite of existingSites) {
            Sites = sitesData.data?.filter((site) => site?._id.includes(existSite))
          }
          setSite(Sites)
        } else {
          setSite(sitesData.data)
        }
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
    setSupplier(siteData[0]?.supplier || '');
  }, [bill.site]);

  useEffect(() => {
    const getWorkOrder = async () => {
      try {
        const response = await axios.get(`/api/v1/work-order/${bill.site}/${bill.contractor}`);
        // console.log(response.data.map((workOrder) => workOrder.work?.filter((work) => work?.due !== 0 && work?.status !== 'Pending')))
        setBillWork(...response.data.map((workOrder) => workOrder.work?.filter((work) => work?.due !== 0 && work?.status === 'Pending')))
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
    getWorkOrder();
  }, [bill.contractor])
   console.log('work:', billWork)

  useEffect(() => {
    const getMaterialOrder = async () => {
      try {
        const response = await axios.get(`/api/v1/purchase-order/${bill.site}/${bill.supplier}`);
        console.log(response.data);
        setBillWork(...response.data.map((purchase) => purchase?.requirement.filter((require) => require)))
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    getMaterialOrder()
  }, [bill.supplier])
  console.log('materials:', materials)

  useEffect(() => {
    if (bill.billFor === 'Contractor') {
      console.log(billWork.filter((work) => work?.workDetail === bill.billOf)[0])
      setPaymentDetail(billWork.filter((work) => work?.workDetail === bill.billOf)[0])
    } else if (bill.billFor === 'Supplier') {
      setPaymentDetail(billWork.filter((work) => work?.material=== bill.billOf)[0])
    }
  }, [bill.billOf])
  // console.log(paymentDetail)

  const fetchBill = async (id) => {
    try {
      const billData = await axios.get(`/api/v1/bill/${id}`);
      // console.log(billData.data)
      setData({
        site: billData.data.site?.name,
        contractor: billData.data.contractor?.name,
        supplier: billData.data.supplier?.name,
      })

      setBill({
        site: billData.data?.site._id,
        contractor: billData.data.contractor?._id,
        supplier: billData.data.supplier?._id,
        billOf: billData.data?.billOf.workDetail,
        billFor: billData.data.billFor,
        toPay: billData.data.toPay,
        billNo: billData.data.billNo,
        amount: billData.data?.amount,
        createdBy: billData.data?.createdBy?._id,
        dateOfPayment: billData.data?.dateOfPayment,
        paymentStatus: billData.data?.paymentStatus,
        reason: billData.data?.reason,
        paidAmount: billData.data?.paidAmount,
        dueAmount: billData.data?.dueAmount,
      })
      // console.log(billData.data?.billOf)
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
        // console.log(bill)
        const paid = parseFloat(bill.paidAmount);
        const updateBill = await axios.put(`/api/v1/bill/${billToEdit}`, {
          site: bill.site,
          billFor: bill.billFor,
          contractor: bill.contractor,
          supplier: bill.supplier,
          createdBy: user._id,
          billOf: bill.billOf,
          billNo: bill.billNo,
          toPay: bill.toPay,
          dateOfPayment: bill.dateOfPayment,
          paymentStatus: bill.paymentStatus,
          reason: bill.reason,
          paidAmount: paid,
          dueAmount: bill.dueAmount,
        });
        if (updateBill) {
          console.log(updateBill.data)
          toast.success(updateBill.data.message);
          navigate(-1)
        }
      } else {
        console.log(bill)
        const response = await axios.post('/api/v1/bill/create', {
          site: bill.site,
          billFor: bill.billFor,
          contractor: bill.contractor,
          supplier: bill.supplier,
          // createdBy: user._id,
          billNo: bill.billNo,
          billOf: bill.billOf,
          toPay: bill.toPay,
        });
        console.log(response.data?.ContractorBill)
        toast.success(response.data.message);
        navigate(-1)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const BillFor = (name) => {
    switch (name) {
      case 'Contractor':
        return (
          <>
            <div className="mb-4">
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
            </div>
            <div className="mb-4">
              <label
                htmlFor='work'
                className="block text-sm font-medium text-gray-600 mb-2">
                Work
              </label>
              <select
                value={bill.billOf}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleChange('billOf', e.target.value)}>
                <option>{billToEdit ? bill?.billOf : 'Work'}</option>
                {billWork?.map((work, index) => (
                  <option key={index} value={work.workDetail}>
                    {work.workDetail}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
        break;
      case 'Supplier':
        return (
          <>
            <div className="mb-4">
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
            </div>
            <div className="mb-4">
              <label
                htmlFor='material'
                className="block text-sm font-medium text-gray-600 mb-2">
                Ordered Material
              </label>
              <select
                value={bill.billOf}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleChange('billOf', e.target.value)}>
                <option>{billToEdit ? bill?.billOf : 'Select Material'}</option>
                {materials?.map((requirement, index) => (
                  <option key={index} value={requirement.material}>
                    {requirement.material}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
        break;
      default: return (
        <p className='mb-2'>Please Select, For Whom You Wan't to Make Bill </p>
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
            type="text"
            id='paidAmount'
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
            id='dueAmount'
            name='dueAmount'
            value={bill.dueAmount}
            readOnly
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
            id='paymentStatus'
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
              <option>{billToEdit ? bill?.billFor : 'Bill for'}</option>
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

          <div>
            {BillFor(bill.billFor)}
          </div>

          <div className="mb-4">
            <label htmlFor='toPay' className="block text-sm font-medium text-gray-600 mb-2">To Pay</label>
            <input
            type='text'
              name='toPay'
              id='toPay'
              value={bill.toPay}
              onChange={(e) => handleChange('toPay', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {billToEdit ? <Update /> : ''}

          <div className="mb-4">
            <h2 className="block text-lg font-semibold text-gray-600 mb-4 mt-2">Detail</h2>
            <p className="text-md font-medium text-gray-600 my-1">Rate: {paymentDetail?.rate}{'/' + paymentDetail?.unit}</p><hr />
            <p className="text-md font-medium text-gray-600 my-1">Quantity: {paymentDetail?.area}</p><hr />
            <p className="text-md font-medium text-gray-600 my-1">Total Amount: ₹ {paymentDetail?.amount}</p><hr />
            <p className="text-md font-medium text-gray-600 my-1">Work Status: {paymentDetail?.status}</p><hr />
            <p className="text-md font-medium text-gray-600 my-1">Amount Paid: {paymentDetail?.paid}</p><hr />
            <p className="text-md font-medium text-gray-600 my-1">Amount Due: {paymentDetail?.due}</p><hr />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {billToEdit ? 'Update Bill' : 'Create Bill'}
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