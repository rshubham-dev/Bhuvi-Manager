import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
axios.defaults.withCredentials = true;
const CreatePaymentSchedule = () => {
  const [formData, setFormData] = useState({
    site: '',
    client: '',
    paymentDetails: [{
      workDescription: '',
      amount: '',
      paymentDate: '',
    }],
  });
  const [paymentDetail, setPaymentDetail] = useState({
    workDescription: '',
    amount: '',
    paymentDate: '',
    status: '',
    paid: '',
    due: '',
  });
  const [scheduleIdToEdit, setScheduleIdToEdit] = useState(null);
  const navigate = useNavigate();
  const [paymentToEdit, setPaymentToEdit] = useState({
    id: '',
    index: '',
  });
  const [client, setClient] = useState([]);
  const [workDetails, setWorkDetails] = useState([]);
  const [sites, setSite] = useState([]);
  const [data, setData] = useState({
    site: '',
  });
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const status = ['Started', 'Completed', 'Pending', 'Partaly Completed'];
  const { id, index } = useParams();
  console.log('id:', id)
  console.log('index:', index)

  useEffect(() => {

    const fetchSite = async () => {
      try {
        const response = await axios.get('/api/v1/site');
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge') {
          const existingSites = user?.site;
          let Sites;
          for(let existSite of existingSites) {
            Sites = response.data?.filter((site) => site?._id.includes(existSite))
          }
          setSite(Sites)
        } else {
          setSite(response.data)
        }
      } catch (error) {
        toast.error(error.message)
      }
    };

    const fetchWorkDetails = async () => {
      try {
        const title = 'Payment Schedule';
        const workData = await axios.post('/api/v1/work-details/name', {
          title
        });
        let works = [];
        for (let i = 0; i < workData.data.description.length; i++) {
          works = works.concat(workData.data.description[i]);
        }
        setWorkDetails(works);
      } catch (error) {
        console.log('Error fetching work details:', error.message);
        toast.error(error.message);
      }
    };

    fetchSite();
    fetchWorkDetails();

    if (id && !index) {
      fetchPaymentSchedule(id)
      setScheduleIdToEdit(id)
    } else if (id && index) {
      fetchPaymentDetail(id, index)
      setPaymentToEdit({
        id,
        index,
      })
    }
  }, []);

  const fetchPaymentDetail = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/payment-schedule/${id}/paymentDetails`);
      const detail = response.data[index];
      console.log(detail)
      setPaymentDetail({
        workDescription: detail?.workDescription,
        unit: detail?.unit,
        amount: detail?.amount,
        paymentDate: detail?.paymentDate,
        status: detail?.status,
      });
    } catch (error) {
      console.log('Error fetching Payment Detail:', error);
    }
  };

  const fetchPaymentSchedule = async (id) => {
    try {
      const response = await axios.get(`/api/v1/payment-schedule/${id}`);
      const payment = response.data;
      console.log(payment)
      setData({
        site: payment.site?.name,
        client: payment.client?.name,
      });
      setFormData({
        site: payment.site?.id,
        client: payment.client?.id,
        paymentDetails: [{
          workDescription: '',
          unit: '',
          amount: '',
          paymentDate: '',
        }],
      });
    } catch (error) {
      console.log('Error fetching Payment Schedule:', error);
    }
  };

  const handleChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  useEffect(() => {
    const siteId = formData.site;
    let siteData = [];
    if (siteId) {
      siteData = sites.filter((site) => site._id === siteId);
    }
    setClient(siteData[0]?.client || '');
  }, [formData.site]);
  formData.client = client.name;

  const handleAddWork = () => {
    setFormData((prevData) => ({
      ...prevData,
      paymentDetails: [
        ...prevData.paymentDetails,
        {
          workDescription: '',
          unit: '',
          paymentDate: '',
          billNo: '',
          amount: '',
        },
      ],
    }));
  };

  const handleRemoveWork = (index) => {
    setFormData((prevData) => {
      const updatedWork = [...prevData.paymentDetails];
      updatedWork.splice(index, 1);
      return {
        ...prevData,
        paymentDetails: updatedWork,
      };
    });
  };

  const handleWorkChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedWork = [...prevData.paymentDetails];
      updatedWork[index][field] = value;
      return {
        ...prevData,
        paymentDetails: updatedWork,
      };
    });
  };

  const handleUpdate = (field, value) => {
    setPaymentDetail({
      ...paymentDetail,
      [field]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      client: client._id,
    };


    try {
      if (scheduleIdToEdit) {
        const response = await axios.put(`/api/v1/payment-schedule/${scheduleIdToEdit}`, updatedFormData);
        if (response.data) {
          console.log('Project Schedule Edited Successfully!');
          toast.success(response.data.message);
          navigate(-1)
        }
      } else if (paymentToEdit.id && paymentToEdit.index) {
        const response = await axios.put(`/api/v1/payment-schedule/${paymentToEdit.id}/paymentDetails/${paymentToEdit.index}`, paymentDetail);
        console.log(response.data);
        toast.success(response.data.message);
        navigate(-1);
      } else {
        const response = await axios.post('/api/v1/payment-schedule', updatedFormData);
        console.log(response.data);
        toast.success(response.data.message);
        navigate(-1);
      }
    } catch (error) {
      console.log('Error submitting payment schedule:', error.message);
      toast.error(error.message);
    }
  };


  if (paymentToEdit.id && paymentToEdit.index) {
    return (
      <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Dashboard" />
      <section className="container mx-auto mt-4 mb-16 flex justify-center item-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-full max-w-md">

          <div className='mb-4'>
            <label
              htmlFor='workDescription'
              className="block text-sm font-semibold text-gray-600"
            >
              Work Detail
            </label>
            <select
              value={paymentDetail.workDescription}
              onChange={(e) => handleUpdate('workDescription', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>
                {paymentDetail ? paymentDetail.workDescription :
                  'Work Detail'
                }
              </option>
              {workDetails.map((workDetail) => (
                <option key={workDetail._id} value={workDetail.work}>
                  {workDetail.work}
                </option>
              ))}

            </select>
          </div>

          <div className="mb-4">
            <label htmlFor='amount' className="block text-sm font-semibold text-gray-600">
              Amount
            </label>
            <input
              type="number"
              name='amount'
              value={paymentDetail.amount}
              onChange={(e) => handleUpdate('amount', e.target.value)}
              placeholder="Amount"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor='paymentDate' className="block text-sm font-semibold text-gray-600">
              Date of Payment
            </label>
            <input
              type="date"
              name='paymentDate'
              value={paymentDetail.paymentDate}
              onChange={(e) => handleUpdate('paymentDate', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor='paid' className="block text-sm font-semibold text-gray-600">
              Paid
            </label>
            <input
              type="number"
              name='paid'
              value={paymentDetail.paid}
              onChange={(e) => handleUpdate('paid', e.target.value)}
              placeholder="Paid Amount"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor='due' className="block text-sm font-semibold text-gray-600">
              Due
            </label>
            <input
              type="number"
              name='due'
              value={paymentDetail.due}
              onChange={(e) => handleUpdate('due', e.target.value)}
              placeholder="Due Amount"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              value={paymentDetail.status}
              onChange={(e) => handleUpdate('status', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>
                {paymentDetail ? paymentDetail.status :
                  'Status'
                }
              </option>
              {status.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
      </div>
    )
  } else {
    return (
      <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Dashboard" />
      <section className="container mx-auto mt-4 mb-16">
        <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Payment Schedule</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Select a Site
            </label>
            <select
              name="site"
              value={formData.site}
              onChange={(e) => handleChange('site', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{scheduleIdToEdit ? data.site : 'Site'}</option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Client
            </label>
            <input
              name="client"
              value={formData.client || ''}
              readOnly
              onChange={(e) => handleChange('client', e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Work Details</h2>
            {formData.paymentDetails.map((work, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <div className="grid grid-cols-2 grid-flow-row-dense gap-4">

                  <div className='col-span-2'>
                    <label
                      htmlFor={`work[${index}].workDescription`}
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Work Detail
                    </label>
                    <select
                      value={work.workDescription}
                      onChange={(e) => handleWorkChange(index, 'workDescription', e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value=''>
                        Select Work Detail
                      </option>
                      {workDetails.map((workDetail) => (
                        <option key={workDetail._id} value={workDetail.work}>
                          {workDetail.work}
                        </option>
                      ))}

                    </select>
                  </div>

                  <div>
                    <label htmlFor={`work[${index}].amount`} className="block text-sm font-semibold text-gray-600">
                      Amount
                    </label>
                    <input
                      type="number"
                      name={`work[${index}].amount`}
                      value={work.amount}
                      onChange={(e) => handleWorkChange(index, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor={`work[${index}].paymentDate`} className="block text-sm font-semibold text-gray-600">
                      Date of Payment
                    </label>
                    <input
                      type="date"
                      name={`work[${index}].paymentDate`}
                      value={work.paymentDate}
                      onChange={(e) => handleWorkChange(index, 'paymentDate', e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  {formData.paymentDetails.length > 1 && (
                    <div className='mt-5'>
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
              More Work
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Create Project Schedule
            </button>
          </div>

        </form>
      </section>
      </div>
    )
  }
}

export default CreatePaymentSchedule