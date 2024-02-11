import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const CreateQualitySchedule = () => {

  const [formData, setFormData] = useState({
    site: '',
    qualityScheduleId: '',
    workDetails: [{
        work: '',
        checkingDate: '',
    }]
  });
  const [workDetails, setWorkDetails] = useState([]);
  const [data, setData] = useState('');
  const [sites, setSite] = useState([]);
  const [scheduleIdToEdit, setScheduleIdToEdit] = useState(null);
  const navigate = useNavigate();
  const [workToEdit, setWorkToEdit] = useState({
    id: '',
    index: '',
  });
  const [workDetail, setWorkDetail] = useState({
    work: '',
    checkingDate: '',
    checkedAt: '',
    difference: '',
    reason: '',
    status: '',
  })
  const status = ['Started', 'Completed', 'Pending', 'Partaly Completed'];
  const { index } = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (id && !index) {
      fetchProjectSchedule(id)
      setScheduleIdToEdit(id)
    } else if (id, index) {
      fetchProjectDetail(id, index )
      setWorkToEdit({
        id,
        index,
      })
    }
  }, [])

  const fetchProjectDetail = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/quality-schedule/${id}/workDetails`);
      const detail = response.data[index];
      console.log(detail)
      setWorkDetail({
        work: detail.work,
        checkingDate: detail.checkingDate,
        checkedAt: detail.checkedAt,
        difference: detail.difference,
        reason: detail.reason,
        status: detail.status,
      });
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const fetchProjectSchedule = async (id) => {
    try {
      const response = await axios.get(`/api/v1/quality-schedule/${id}`);
      const project = response.data;
      console.log(project?.site.name)
      setData(project?.site.name);
      setFormData({
        site: project?.site.id,
        qualityScheduleId: project?.qualityScheduleId,
        workDetails: [{
          work: '',
          checkingDate: '',
        }]
      });
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const response = await axios.get('/api/v1/site');
        setSite(response.data)
      } catch (error) {
        toast.error(error.message)
      }
    };

    const fetchWork = async () => {
      try {
        const title = 'Project Schedule';
        const workData = await axios.post('/api/v1/work-details/name', {
          title
        });
        setWorkDetails(workData.data.description);
      } catch (error) {
        console.log('Error fetching work details:', error.message);
        toast.error(error.message);
      }
    };

    fetchSite();
    fetchWork();
  }, []);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleUpdate = (field, value) => {
    setWorkDetail({
      ...workDetail,
      [field]: value
    })
  }

  const handleAddWork = () => {
    setFormData({
      ...formData,
      workDetails: [
        ...formData.workDetails,
        {
          work: '',
          checkingDate: '',
        },
      ],
    });
  };

  const handleRemoveWork = (index) => {
    const updatedWork = [...formData.workDetails];
    updatedWork.splice(index, 1);
    setFormData({
      ...formData,
      workDetails: updatedWork,
    });
  };

  const handleWorkChange = (index, field, value) => {
    const updatedWork = [...formData.workDetails];
    updatedWork[index][field] = value;
    setFormData({
      ...formData,
      workDetails: updatedWork,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (scheduleIdToEdit) {
        console.log(formData)
        const response = await axios.put(`/api/v1/quality-schedule/${scheduleIdToEdit}`, formData);
        if (response.data) {
          console.log('Project Schedule Edited Successfully!');
          toast.success(response.data.message);
          navigate(-1)
        }
      } else if(workToEdit.id && workToEdit.index){
        console.log(workToEdit)
        await axios.put(`/api/v1/quality-schedule/${workToEdit.id}/workDetails/${workToEdit.index}`, workDetail);
        toast.success('Edited successfully');
        navigate(-1);
      } else {
        const response = await axios.post('/api/v1/quality-schedule/create', formData);
        if (response.data) {
          console.log('Project Schedule Created Successfully!');
          toast.success(response.data.message);
          navigate(-1)
        }
      }
    } catch (error) {
      console.log('Error submitting work order:', error.message);
      toast.error(error.message)
    }
  };

  if(workToEdit.index && workToEdit.id){
    return (
      <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Dashboard" />
        <section className="flex items-center justify-center max-h-screen mb-24 mt-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
  
            <div className="mb-4">
              <label htmlFor="work" className="block text-gray-700 text-sm font-bold mb-2">
                Work:
              </label>
              <select
                onChange={(e) => handleUpdate('work', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>
                  {workToEdit ? workDetail.work :
                  'Select Work Detail:'
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
              <label htmlFor="checkingDate" className="block text-gray-700 text-sm font-bold mb-2">
                Checking Date: {workDetail.checkingDate}
              </label>
              <input
                type="date"
                name="checkingDate"
                onChange={(e) => handleUpdate('checkingDate', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="checkedAt" className="block text-gray-700 text-sm font-bold mb-2">
                Actual Checked At: {workDetail.checkedAt}
              </label>
              <input
                type="date"
                name="checkedAt"
                onChange={(e) => handleUpdate('checkedAt', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="difference" className="block text-gray-700 text-sm font-bold mb-2">
                Difference: 
              </label>
              <input
                type="text"
                name="difference"
                onChange={(e) => handleUpdate('difference', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
                Reason
              </label>
              <input
                type="text"
                onChange={(e) => handleUpdate('reason', e.target.value)}
                name="reason"
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
                {workToEdit ? workDetail.status :
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Quality Schedule</h2>

        <div className="mb-4">
          <label htmlFor="site" className="block text-sm font-semibold text-gray-600">
            Site:
          </label>
            <select
              name="site"
              value={formData.site}
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => handleChange('site', e.target.value)}
            >
              <option>
                {scheduleIdToEdit ? data :
                'Site'
                }
                </option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
                </option>
              ))}
            </select>
        </div>

        <div className="mb-4">
          <label htmlFor="qualityScheduleId" className="block text-sm font-medium text-gray-600">
            Schedule Id: {formData.qualityScheduleId}
          </label>
            <input
              type="text"
              name="qualityScheduleId"
              value={formData.qualityScheduleId}
              onChange={(e) => handleChange('qualityScheduleId', e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Work Details</h2>
          {formData.workDetails.map((workItem, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <div className="grid grid-cols-1 gap-4">

                <div>
                  <label
                    htmlFor={`work[${index}].work`}
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Work to Check:
                  </label>
                  <select
                    value={workItem.work}
                    onChange={(e) => handleWorkChange(index, 'work', e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option>
                      Select Work Detail:
                    </option>
                    {workDetails.map((workDetail) => (
                      <option key={workDetail._id} value={workDetail.work}>
                        {workDetail.work}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={`work[${index}].checkingDate`} className="block text-sm font-semibold text-gray-600">
                    Starting Date:
                  </label>
                  <input
                    type="date"
                    value={workItem.checkingDate}
                    onChange={(e) => handleWorkChange(index, 'checkingDate', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {formData.workDetails.length > 1 && (
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
            More Work
          </button>
        </div>

        <div className="text-center">
          <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
            Create Quality Check Schedule
          </button>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </section>
    </div>
  )
  }
}

export default CreateQualitySchedule