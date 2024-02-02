import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

const CreateProjectSchedule = () => {

  const [formData, setFormData] = useState({
    site: '',
    projectScheduleId: '',
    projectDetail: [{
      workDetail: '',
      toStart: '',
    }]
  });
  const [workDetails, setWorkDetails] = useState([]);
  const [data, setData] = useState('');
  const [sites, setSite] = useState([]);
  const [scheduleIdToEdit, setScheduleIdToEdit] = useState(null);
  const navigate = useNavigate();
  const [projectToEdit, setProjectToEdit] = useState({
    id: '',
    index: '',
  });
  const [projectDetail, setProjectDetail] = useState({
    workDetail: '',
    toStart: '',
    startedAt: '',
    difference: '',
    reason: '',
    status: '',
  });
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const status = ['Started', 'Completed', 'Pending', 'Partaly Completed'];
  const { index } = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (id && !index) {
      fetchProjectSchedule(id)
      setScheduleIdToEdit(id)
    } else if (id, index) {
      fetchProjectDetail(id, index )
      setProjectToEdit({
        id,
        index,
      })
    }
  }, [])

  const fetchProjectDetail = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/project-schedule/${id}/projectDetails`);
      const detail = response.data[index];
      console.log(detail)
      setProjectDetail({
        workDetail: detail.workDetail,
        toStart: detail.toStart,
        startedAt: detail.startedAt,
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
      const response = await axios.get(`/api/v1/project-schedule/${id}`);
      const project = response.data;
      console.log(project?.site.name)
      setData(project?.site.name);
      setFormData({
        site: project?.site.id,
        projectScheduleId: project?.projectScheduleId,
        projectDetail: [{
          workDetail: '',
          toStart: '',
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
    setProjectDetail({
      ...projectDetail,
      [field]: value
    })
  }

  const handleAddWork = () => {
    setFormData({
      ...formData,
      projectDetail: [
        ...formData.projectDetail,
        {
          workDetail: '',
          toStart: '',
        },
      ],
    });
  };

  const handleRemoveWork = (index) => {
    const updatedWork = [...formData.projectDetail];
    updatedWork.splice(index, 1);
    setFormData({
      ...formData,
      projectDetail: updatedWork,
    });
  };

  const handleWorkChange = (index, field, value) => {
    const updatedWork = [...formData.projectDetail];
    updatedWork[index][field] = value;
    setFormData({
      ...formData,
      projectDetail: updatedWork,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (scheduleIdToEdit) {
        console.log(formData)
        const response = await axios.put(`/api/v1/project-schedule/${scheduleIdToEdit}`, formData);
        if (response.data) {
          console.log('Project Schedule Edited Successfully!');
          toast.success(response.data.message);
          navigate(-1)
        }
      } else if(projectToEdit.id && projectToEdit.index){
        console.log(projectDetail)
        await axios.put(`/api/v1/project-schedule/${projectToEdit.id}/projectDetails/${projectToEdit.index}`, projectDetail);
        toast.success('Edited successfully');
        navigate(-1);
      } else {
        const response = await axios.post('/api/v1/project-schedule/create', formData);
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

  if(projectToEdit.index && projectToEdit.id){
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
                  {projectToEdit ? projectDetail.workDetail :
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
              <label htmlFor="userMail" className="block text-gray-700 text-sm font-bold mb-2">
                Starting Date: {projectDetail.toStart}
              </label>
              <input
                type="date"
                name="toStart"
                onChange={(e) => handleUpdate('toStart', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Actual Starting Date: {projectDetail.startedAt}
              </label>
              <input
                type="date"
                name="startedAt"
                onChange={(e) => handleUpdate('startedAt', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
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
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
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
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                onChange={(e) => handleUpdate('status', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>
                {projectToEdit ? projectDetail.status :
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
    <section className="container mx-auto mt-6 mb-24">
      <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Project Schedule</h2>

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
          <label htmlFor="projectScheduleId" className="block text-sm font-medium text-gray-600">
            Schedule Id: {formData.projectScheduleId}
          </label>
            <input
              type="text"
              name="projectScheduleId"
              value={formData.projectScheduleId}
              onChange={(e) => handleChange('projectScheduleId', e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Work Details</h2>
          {formData.projectDetail.map((workItem, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor={`work[${index}].workDetail`}
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Project Work Detail:
                  </label>
                  <select
                    value={workItem.workDetail}
                    onChange={(e) => handleWorkChange(index, 'workDetail', e.target.value)}
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
                  <label htmlFor={`work[${index}].toStart`} className="block text-sm font-semibold text-gray-600">
                    Starting Date:
                  </label>
                  <input
                    type="date"
                    value={workItem.toStart}
                    onChange={(e) => handleWorkChange(index, 'toStart', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {formData.projectDetail.length > 1 && (
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
            Create Project Schedule
          </button>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </section>
  )
  }
}

export default CreateProjectSchedule