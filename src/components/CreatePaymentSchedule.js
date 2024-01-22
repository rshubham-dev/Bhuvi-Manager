import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
axios.defaults.withCredentials = true;
const CreatePaymentSchedule = () => {
  const [formData, setFormData] = useState({
    scheduleFor: '',
    contractor: '',
    supplier: '',
    site: '',
    client: '',
    paymentDetails: [{
      workDescription: '',
      rate: '',
      area: '',
      unit: '',
      amount: '',
      paymentDate: '',
    }],
  });
  const [paymentDetail, setPaymentDetail] = useState({
    workDescription: '',
    rate: '',
    area: '',
    unit: '',
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
  const [suppliers, setSupplier] = useState([]);
  const [sites, setSite] = useState([]);
  const [data, setData] = useState({
    site: '',
    contractor: '',
    supplier: '',
  });
  const [contractors, setContractor] = useState([]);
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM'];
  const schedule = ['Client', 'Contractor', 'Supplier'];
  const status = ['Started', 'Completed', 'Pending', 'Partaly Completed'];
  const { id, index } = useParams();
  console.log('id:', id)
  console.log('index:', index)

  useEffect(() => {

    const fetchSite = async () => {
      try {
        const response = await axios.get('/api/v1/site');
        setSite(response.data)
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
        rate: detail?.rate,
        area: detail?.area,
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
        contractor: payment.contractor?.name,
        supplier: payment.supplier?.name,
      });
      setFormData({
        scheduleFor: payment.scheduleFor,
        site: payment.site?.id,
        client: payment.client?.id,
        contractor: payment?.contractor?.id,
        supplier: payment?.supplier?.id,
        paymentDetails: [{
          workDescription: '',
          rate: '',
          area: '',
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
    setContractor(siteData[0]?.contractor || '');
    setSupplier(siteData[0]?.supplier || '');
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
          rate: '',
          area: '',
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
      paymentDetails: formData.paymentDetails.map((detail) => {
        const amount = parseFloat(detail.area) * parseFloat(detail.rate);
        return {
          ...detail,
          amount: isNaN(amount) ? '' : amount.toFixed(2),
        };
      }),
    };

    const amount = parseFloat(paymentDetail.area) * parseFloat(paymentDetail.rate);
    const updatedDetail = {
      ...paymentDetail,
      amount: isNaN(amount) ? '' : amount.toFixed(2),
    }

    try {
      if (scheduleIdToEdit) {
        const response = await axios.put(`/api/v1/payment-schedule/${scheduleIdToEdit}`, updatedFormData);
        if (response.data) {
          console.log('Project Schedule Edited Successfully!');
          toast.success(response.data.message);
          navigate(-1)
        }
      } else if (paymentToEdit.id && paymentToEdit.index) {
        const response = await axios.put(`/api/v1/payment-schedule/${paymentToEdit.id}/paymentDetails/${paymentToEdit.index}`, updatedDetail);
        console.log(response.data);
        toast.success(response.data.message);
        navigate(-1);
      } else {
        switch (formData.scheduleFor) {

          case 'Client':
            const Client = await axios.post('/api/v1/payment-schedule', {
              site: updatedFormData.site,
              scheduleFor: updatedFormData.scheduleFor,
              paymentDetails: updatedFormData.paymentDetails,
            });
            console.log(Client.data);
            toast.success(Client.data.message);
            navigate(-1);
            break;

          case 'Contractor':
            const Contractor = await axios.post('/api/v1/payment-schedule', {
              contractor: updatedFormData.contractor,
              site: updatedFormData.site,
              scheduleFor: updatedFormData.scheduleFor,
              paymentDetails: updatedFormData.paymentDetails,
            });
            console.log(Contractor.data);
            toast.success(Contractor.data.message);
            navigate(-1);
            break;

          case 'Supplier':
            const Supplier = await axios.post('/api/v1/payment-schedule', {
              site: updatedFormData.site,
              supplier: updatedFormData,
              scheduleFor: updatedFormData.scheduleFor,
              paymentDetails: updatedFormData.paymentDetails,
            });
            console.log(Supplier.data);
            toast.success(Supplier.data.message);
            navigate(-1);
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log('Error submitting payment schedule:', error.message);
      toast.error(error.message);
    }
  };

  const scheduleFor = (name) => {
    switch (name) {
      case 'Contractor':
        return (
          <>
            <label htmlFor="contractor" className="block text-sm font-medium text-gray-600">
              Choose Contractor
            </label>
            <select
              name="contractor"
              value={formData.contractor}
              onChange={(e) => handleChange('contractor', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{scheduleIdToEdit ? data.contractor : 'Contractor'}</option>
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
            <label htmlFor="contractor" className="block text-sm font-medium text-gray-600">
              Choose Supplier
            </label>
            <select
              name="supplier"
              value={formData.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{scheduleIdToEdit ? data.supplier : 'Supplier'}</option>
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
          </>
        );
        break;
      default: return (
        <p>Please Select, For Which the </p>
      );
        break;
    }
  };

  if (paymentToEdit.id && paymentToEdit.index) {
    return (
        <section className="container mx-auto mt-6 mb-20 flex justify-center item-center">
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
              <label htmlFor='rate' className="block text-sm font-semibold text-gray-600">
                Rate
              </label>
              <input
                type="number"
                name='rate'
                value={paymentDetail.rate}
                onChange={(e) => handleUpdate('rate', e.target.value)}
                placeholder="Rate"
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor='area' className="block text-sm font-semibold text-gray-600">
                Area
              </label>
              <input
                type="number"
                name='area'
                value={paymentDetail.area}
                onChange={(e) => handleUpdate('area', e.target.value)}
                placeholder="Area"
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor='unit' className="block text-sm font-semibold text-gray-600">
                Unit
              </label>
              <select
                name='unit'
                value={paymentDetail.unit}
                onChange={(e) => handleUpdate('unit', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>
                  {paymentDetail ? paymentDetail.unit :
                    'Unit'
                  }
                </option>
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
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
    )
  } else {
    return (
      <section className="container mx-auto mt-6 mb-24">
        <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Payment Schedule</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Payment Schedule for
            </label>
            <select
              name="scheduleFor"
              value={formData.scheduleFor}
              onChange={(e) => handleChange('scheduleFor', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{scheduleIdToEdit ? formData.scheduleFor : 'Schedule'}</option>
              {schedule.map((schedule, index) => (
                <option key={index} value={schedule}>
                  {schedule}
                </option>
              ))}
            </select>
          </div>

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
            {scheduleFor(formData.scheduleFor)}
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
                    <label htmlFor={`work[${index}].rate`} className="block text-sm font-semibold text-gray-600">
                      Rate
                    </label>
                    <input
                      type="number"
                      name={`work[${index}].rate`}
                      value={work.rate}
                      onChange={(e) => handleWorkChange(index, 'rate', e.target.value)}
                      placeholder="Rate"
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor={`work[${index}].area`} className="block text-sm font-semibold text-gray-600">
                      Area
                    </label>
                    <input
                      type="number"
                      name={`work[${index}].area`}
                      value={work.area}
                      onChange={(e) => handleWorkChange(index, 'area', e.target.value)}
                      placeholder="Area"
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
                      name={`work[${index}].unit`}
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
              Add Work Order
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
    )
  }
}

export default CreatePaymentSchedule