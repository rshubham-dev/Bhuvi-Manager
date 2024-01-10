import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const CreateProjectSchedule = () => {
  const [formData, setFormData] = useState({
    site: '',
    projectScheduleId: '',
    projectDetail: [{
      workDetail: '',
      toStart: '',
    }]
  })
  const [workDetails, setWorkDetails] = useState([]);
  const [sites, setSite] = useState([]);

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
    fetchWork();
  }, []);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };


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
    console.log(formData)
    try {
      const response = await axios.post('/api/v1/project-schedule/create', formData);
      console.log('Project Schedule Created Successfully!');
      toast.success(response.data.message)
    } catch (error) {
      console.log('Error submitting work order:', error.message);
      toast.error(error.message)
    }
  };

  return (
    <section className="container mx-auto mt-6 mb-24">
      <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Project Schedule</h2>

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
          <label htmlFor="projectScheduleId" className="block text-sm font-medium text-gray-600">
            Schedule ID
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
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label
                    htmlFor={`work[${index}].workDetail`}
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Project Work Detail
                  </label>
                  <select
                    value={workItem.workDetail}
                    onChange={(e) => handleWorkChange(index, 'workDetail', e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option>
                      Select Work Detail
                    </option>
                    {workDetails.map((workDetail) => (
                      <option key={workDetail._id} value={workDetail._id}>
                        {workDetail.work}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={`work[${index}].toStart`} className="block text-sm font-semibold text-gray-600">
                    Starting Date
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
            Add Work Order
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

export default CreateProjectSchedule