import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;


const WorkOrderForm = () => {
  const [formData, setFormData] = useState({
    workOrderName: '',
    workOrderNo: '',
    contractor: '',
    site: '',
    startdate: '',
    duration: '',
    work: [
      {
        workDetail: '',
        rate: '',
        area: '',
        unit: '',
        amount: '',
      },
    ],
  });

  const [workData, setWorkData] = useState({
    workDetail: '',
    rate: '',
    area: '',
    unit: '',
    amount: '',
    status: '',
  });

  const [data, setData] = useState({
    site: '',
    contractor: '',
    workName: '',
  });

  const [workDetails, setWorkDetails] = useState([]);
  const [workName, setWorkName] = useState([]);
  const [sites, setSite] = useState([]);
  const [workToEdit, setWorkToEdit] = useState({
    id: '',
    index: '',
  });
  const [workOrderToEdit, setWorkOrderToEdit] = useState(null);
  const [contractors, setContractor] = useState([]);
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM'];
  const status = ['Started', 'Completed', 'Pending', 'Partaly Completed'];
  const navigate = useNavigate();
  const { id } = useParams();
  const { index } = useParams();

  useEffect(() => {
    if (id && index) {
      setWorkToEdit({ id, index })
      fetchWork(id, index);
    } else if (id && !index) {
      setWorkOrderToEdit(id)
      fetchWork(id)
    }
  }, [id, index]);

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        const response = await axios.get('/api/v1/work-details')
        setWorkName(response.data);
      } catch (error) {
        console.error('Error fetching work details:', error.message);
        toast.error(error.message)
      }
    };

    const fetchSite = async () => {
      try {
        const response = await axios.get('/api/v1/site');
        setSite(response.data)
      } catch (error) {
        toast.error(error.message)
      }
    };

    const fetchContractor = async () => {
      try {
        const contractorData = await axios.get('/api/v1/contractor');
        setContractor(contractorData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchWorkDetails();
    fetchSite();
    fetchContractor()
  }, [])

  const fetchWork = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/work-order/${id}`);
      if (id && index) {
        const work = response.data.work[index];
        setWorkData({
          workDetail: work.workDetail,
          rate: work.rate,
          area: work.area,
          unit: work.unit,
          amount: work.amount,
          status: work.status,
        });
        const workname = await axios.get('/api/v1/work-details')
        const workDetail = workname?.data.filter((work) => work.title === response?.data.workOrderName)
        console.log(workDetail)
        setWorkDetails(workDetail[0].description)
      }
      else if (id && !index) {
        const workname = await axios.get('/api/v1/work-details');
        const workdetail = workname?.data.filter((work) => work.title === response?.data.workOrderName);
        console.log(workdetail[0]._id)
        setWorkDetails(workdetail[0].description);
        const workId = workdetail[0]._id;
        setData({
          site: response?.data.site.name,
          contractor: response?.data.contractor.name,
          workName: response?.data.workOrderName,
        })
        setFormData({
          workOrderName: workId,
          workOrderNo: response?.data.workOrderNo,
          contractor: response?.data.contractor._id,
          site: response?.data.site._id,
          startdate: response?.data.startdate,
          duration: response?.data.duration,
          work: [
            {
              workDetail: '',
              rate: '',
              area: '',
              unit: '',
              amount: '',
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching site details:', error);
    }
  };

  useEffect(() => {
      const fetchWork = async () => {
        try {
          const id = formData.workOrderName;
          if (id) {
            const workData = await axios.get(`/api/v1/work-details/${id}`);
            console.log(workData)
            setWorkDetails(workData.data.description);
          } else {
            setWorkDetails([]); // If there's no ID, clear the workDetails
          }
        } catch (error) {
          console.error('Error fetching work details:', error.message);
          toast.error(error.message);
        }
      };
      fetchWork();
    }, [formData.workOrderName]);
    
    const handleChange = (field, value) => {
      setFormData({
        ...formData,
        [field]: value,
      });
    };

  const handleAddWork = () => {
    setFormData({
      ...formData,
      work: [
        ...formData.work,
        {
          workDetail: '',
          rate: '',
          area: '',
          unit: '',
          amount: '',
        },
      ],
    });
  };

  const handleRemoveWork = (index) => {
    const updatedWork = [...formData.work];
    updatedWork.splice(index, 1);
    setFormData({
      ...formData,
      work: updatedWork,
    });
  };

  const handleWorkChange = (index, field, value) => {
    const updatedWork = [...formData.work];
    updatedWork[index][field] = value;
    setFormData({
      ...formData,
      work: updatedWork,
    });
  };

  const handleUpdate = (field, value) => {
    setWorkData({
      ...workData,
      [field]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      work: formData.work.map((detail) => {
        const amount = parseFloat(detail.area) * parseFloat(detail.rate);
        return {
          ...detail,
          amount: isNaN(amount) ? '' : amount.toFixed(2),
        };
      }),
    };
    setFormData(updatedFormData)

    const amount = parseFloat(workData.area) * parseFloat(workData.rate);
    const updatedDetail = {
      ...workData,
      amount: isNaN(amount) ? '' : amount.toFixed(2),
    }
    
    try {
      if (workOrderToEdit) {
        console.log(updatedFormData)
        const response = await axios.put(`/api/v1/work-order/${workOrderToEdit}`, updatedFormData);
        toast.success(response.data.message)
        navigate(-1)
      }
      else if (workToEdit.id !== '' && workToEdit.index !== '') {
        const response = await axios.put(`/api/v1/work-order/${workToEdit.id}/work/${workToEdit.index}`, updatedDetail);
        toast.success(response.data.message)
        navigate(-1)
      }
      else {
        console.log(updatedFormData)
        const response = await axios.post('/api/v1/work-order/create', updatedFormData);
          toast.success(response.data.message)
          navigate(-1)
      }
    } catch (error) {
      console.error('Error submitting work order:', error.message);
      toast.error(error.message)
    }
  };


  if (workToEdit.id !== '' && workToEdit.index !== '') {
    return (
      <main>
        <section className="flex items-center justify-center max-h-screen mb-24 mt-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Work:
              </label>
              <select
                onChange={(e) => handleUpdate('workDetail', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>
                  {workData ? workData.workDetail : 'Select Work Detail:'}
                </option>
                {workDetails.map((workDetail) => (
                  <option key={workDetail._id} value={workDetail.work}>
                    {workDetail.work}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="userMail" className="block text-gray-700 text-sm font-bold mb-2">
                Area:
              </label>
              <input
                type="number"
                value={workData.area}
                name="area"
                onChange={(e) => handleUpdate('area', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rate" className="block text-gray-700 text-sm font-bold mb-2">
                Rate:
              </label>
              <input
                type="number"
                value={workData.rate}
                name="rate"
                onChange={(e) => handleUpdate('rate', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="unit" className="block text-gray-700 text-sm font-bold mb-2">
                Unit:
              </label>
              <select
                type="text"
                name="unit"
                value={workData.unit}
                onChange={(e) => handleUpdate('unit', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>{workToEdit ? workData.unit : 'Select a Unit'}</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                name="unit"
                value={workData.unit}
                onChange={(e) => handleUpdate('unit', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              /> */}
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                amount
              </label>
              <input
                type="text"
                value={workData.amount}
                onChange={(e) => handleUpdate('amount', e.target.value)}
                name="amount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                onChange={(e) => handleUpdate('status', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>
                  {workToEdit ? workData.status :
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
      </main>
    )
  } else {
    return (
      <div className="container mx-auto mt-6 mb-24">
        <form className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Work Order</h2>

          <div className="mb-4">
            <label htmlFor="workOrderName" className="block text-sm font-semibold text-gray-600">
              Work Order Name
            </label>
            <select
              id="workOrderName"
              value={formData.workOrderName}
              onChange={(e) => handleChange('workOrderName', e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value=''>{workOrderToEdit ? data.workName : 'Work Order Name'}</option>
              {workName.map((name) => (
                <option key={name._id} value={name._id}>
                  {name.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="workOrderNo" className="block text-sm font-semibold text-gray-600">
              Work Order No
            </label>
            <input
              type="text"
              id="workOrderNo"
              value={formData.workOrderNo}
              onChange={(e) => handleChange('workOrderNo', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

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
              <option>{workOrderToEdit ? data.site : 'Site'}</option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="contractorName" className="block text-sm font-semibold text-gray-600">
              Contractor
            </label>
            <select
              type="text"
              id="contractor"
              name="contractor"
              value={formData.contractor}
              onChange={(e) => handleChange('contractor', e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option>{workOrderToEdit ? data.contractor : "Contractor"}</option>
              {contractors?.map((contractor) => (
                <option key={contractor._id} value={contractor._id}>
                  {contractor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor={'startdate'} className="block text-sm font-semibold text-gray-600">
              Starting Date: {formData.startdate}
            </label>
            <input
              type="date"
              value={formData.startdate}
              onChange={(e) => handleChange('startdate', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor={'duration'} className="block text-sm font-semibold text-gray-600">
              Project Duration: {formData.duration}
            </label>
            <input
              type='date'
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Work Details</h2>

            {formData.work.map((workItem, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="grid grid-cols-2 grid-flow-row-dense gap-4">

                  <div className='col-span-2'>
                    <label
                      htmlFor={`work[${index}].workDetail`}
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Work Detail
                    </label>
                    <select
                      value={workItem.workDetail}
                      onChange={(e) => handleWorkChange(index, 'workDetail', e.target.value)}
                      className="border p-2 rounded w-full"
                    >
                      <option value=''>
                        Select Work Detail
                      </option>
                      {workDetails && workDetails?.map((workDetail) => (
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
                      value={workItem.rate}
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
                      value={workItem.area}
                      onChange={(e) => handleWorkChange(index, 'area', e.target.value)}
                      placeholder="Area"
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor={`work[${index}].unit`} className="block text-sm font-semibold text-gray-600">
                      Unit
                    </label>
                    <select
                      value={workItem.unit}
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

                  {formData.work.length > 1 && (
                    <div>
                      <button
                        type="button"
                        onClick={() => handleRemoveWork(index)}
                        className="bg-red-500 text-white p-2 mt-5 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))}

            {workOrderToEdit ? '' :
              <button
                type="button"
                onClick={handleAddWork}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Work Order
              </button>
            }
          </div>

          <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
            Submit Work Order
          </button>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    );
  }
};

export default WorkOrderForm;
