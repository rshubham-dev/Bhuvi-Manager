import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;



const WorkOrderForm = () => {
  const [formData, setFormData] = useState({
    workOrderName: '',
    workOrderNo: '',
    contractor: '',
    site: '',
    work: [
      {
        workDetail: '', // Now it's a dropdown, so it stores the _id of the selected Work-Detail
        rate: '',
        area: '',
        unit: '',
        amount: '',
        startdate: '',
        duration: '',
      },
    ],
  });

  const [workDetails, setWorkDetails] = useState([]);
  const [workName, setWorkName] = useState([]);
  const [sites, setSite] = useState([]);
  const [contractors, setContractor] = useState([]);
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM'];

  useEffect(() => {
    // Fetch Work-Detail options from your backend and set the state
    const fetchWorkDetails = async () => {
      try {
        const response = await axios.get('/api/v1/work-details')
        console.log(response.data)
        setWorkDetails(response.data);
        let works = [];
        for (let i = 0; i < response.data.length; i++) {
          works = works.concat(response.data[i].description);
        }
        setWorkName(works);
        console.log('work', workDetails)
      } catch (error) {
        console.error('Error fetching work details:', error.message);
        toast.error(error.message)
      }
    };

    const fetchSite = async () => {
      try {
        const response = await axios.get('/api/v1/site');
        console.log('sites:', response.data)
        setSite(response.data)
      } catch (error) {
        toast.error(error.message)
      }
    };

    const fetchContractor = async () => {
      try {
        const contractorData = await axios.get('/api/v1/contractor');
        console.log(contractorData.data)
        setContractor(contractorData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchWorkDetails();
    fetchSite();
    fetchContractor();
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
      work: [
        ...formData.work,
        {
          workDetail: '',
          rate: '',
          area: '',
          unit: '',
          amount: '',
          startdate: '',
          duration: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      await axios.post('/api/v1/work-order/create', formData);
      console.log('Work order submitted successfully!');
    } catch (error) {
      console.error('Error submitting work order:', error.message);
      toast.error(error.message)
    }
  };

  return (
    <div className="container mx-auto mt-6 mb-24">
      <form className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>

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
            <option value=''>Work Order Name</option>
            {workDetails.map((workDetail) => (
              <option key={workDetail._id} value={workDetail._id}>
                {workDetail.title}
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
            <option>Contractor</option>
            {contractors?.map((contractor) => (
              <option key={contractor._id} value={contractor._id}>
                {contractor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="site" className="block text-sm font-semibold text-gray-600">
            Site
          </label>
          <select
            name="site"
            value={formData.site}
            required
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


        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Work Details</h2>
          {formData.work.map((workItem, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4">

                <div>
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
                    <option disabled>
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

                {/* <div>
                  <label htmlFor={`work[${index}].amount`} className="block text-sm font-semibold text-gray-600">
                    Amount
                  </label>
                  <input
                    type="number"
                    name={`work[${index}].amount`}
                    value={workItem.amount}
                    onChange={(e) => handleWorkChange(index, 'amount', e.target.value)}
                    placeholder="Amount"
                    className="border p-2 rounded w-full"
                  />
                </div> */}

                <div>
                  <label htmlFor={`work[${index}].startdate`} className="block text-sm font-semibold text-gray-600">
                    Starting Date
                  </label>
                  <input
                    type="date"
                    value={workItem.startdate}
                    onChange={(e) => handleWorkChange(index, 'startdate', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label htmlFor={`work[${index}].duration`} className="block text-sm font-semibold text-gray-600">
                    Project Duration
                  </label>
                  <input
                    type='date'
                    value={workItem.duration}
                    onChange={(e) => handleWorkChange(index, 'duration', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {formData.work.length > 1 && (
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

        <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
          Submit Work Order
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default WorkOrderForm;
