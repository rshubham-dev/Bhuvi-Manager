import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



const WorkOrderForm = () => {
  const [formData, setFormData] = useState({
    workOrderName: '',
    workOrderNo: '',
    contractorName: '',
    siteName: '',
    work: [
      {
        workDetail: '', // Now it's a dropdown, so it stores the _id of the selected Work-Detail
        rate: '',
        area: '',
        unit: '',
        amount: '',
        startdate: '',
        duration:'',
      },
    ],
  });

  const [workDetails, setWorkDetails] = useState([]);
  const [workName, setWorkName] = useState([]);
  const [sites, setSite] = useState([]);
  const [contractors, setContractor] = useState([]);

  useEffect(() => {
    // Fetch Work-Detail options from your backend and set the state
    const fetchWorkDetails = async () => {
      try {
        const response = await axios.get('/api/v1/work-details')
        console.log(response.data)
          let works = [];
          for (let i = 0; i < response.data.length; i++) {
            works = works.concat(response.data[i].description);
          }
          setWorkDetails(works)
          console.log('work', workDetails)
      } catch (error) {
        console.error('Error fetching work details:', error.message);
        toast.error(error.message)
      }
    };
    const fetchSite = async()=>{
      try {
        const response = await axios.get('/api/v1/site');
        console.log('sites:', response.data)
        setSite(response.data)
      } catch (error) {
        toast.error(error.message)
      }
  
    }
    const fetchContractor = async () =>{
      try {
      const contractorsData = await axios.get('/api/v1/contractor');
      setContractor(contractorsData.data);
    } catch (error) {
      toast.error(error.message)
    }
  }

    fetchSite();
    fetchContractor();
    fetchWorkDetails();
  }, []); // Run only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddWork = () => {
    setFormData((prevData) => ({
      ...prevData,
      work: [
        ...prevData.work,
        {
          workDetail: '', 
          rate: '',
          area: '',
          unit: '',
          amount: '',
          startdate: '',
          duration:'',
        },
      ],
    }));
  };
  const handleRemoveWork = (index) => {
    setFormData((prevData) => {
      const updatedWork = [...prevData.work];
      updatedWork.splice(index, 1);
      return {
        ...prevData,
        work: updatedWork,
      };
    });
  };

  const handleWorkChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedWork = [...prevData.work];
      updatedWork[index][field] = value;
      return {
        ...prevData,
        work: updatedWork,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      // Make a POST request to your backend to save the work order
      await axios.post('/api/v1/work-order/create', formData);
      console.log('Work order submitted successfully!');
    } catch (error) {
      console.error('Error submitting work order:', error.message);
      toast.error(error.message)
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="workOrderName" className="block text-sm font-semibold text-gray-600">
            Work Order Name
          </label>
          <input
            type="text"
            id="workOrderName"
            name="workOrderName"
            value={formData.workOrderName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workOrderNo" className="block text-sm font-semibold text-gray-600">
            Work Order No
          </label>
          <input
            type="text"
            id="workOrderNo"
            name="workOrderNo"
            value={formData.workOrderNo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contractorName" className="block text-sm font-semibold text-gray-600">
            Contractor Name
          </label>
          <select
            type="text"
            id="contractorName"
            name="contractorName"
            value={formData.contractorName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value=''>Client</option>
            {contractors?.map((contractor)=> (
              <option key={contractor._id} value={contractor._id}>
                {contractor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="siteName" className="block text-sm font-semibold text-gray-600">
            Site Name
          </label>
          <select
            name="siteName"
            required
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleAddWork}
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
                    id={`work[${index}].workDetail`}
                    name={`work[${index}].workDetail`}
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
                    name={`work[${index}].rate`}
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
                    name={`work[${index}].area`}
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
                  <input
                    type="text"
                    name={`work[${index}].unit`}
                    value={workItem.unit}
                    onChange={(e) => handleWorkChange(index, 'unit', e.target.value)}
                    placeholder="Unit"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
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
                </div>
                <div>
                  <label htmlFor={`work[${index}].amount`} className="block text-sm font-semibold text-gray-600">
                    Starting Date
                  </label>
                  <input
                    type="date"
                    name={`work[${index}].startdate`}
                    value={workItem.startdate}
                    onChange={(e) => handleWorkChange(index, 'amount', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label htmlFor={`work[${index}].amount`} className="block text-sm font-semibold text-gray-600">
                    Project Duration
                  </label>
                  <input
                    type="date"
                    name={`work[${index}].duration`}
                    value={workItem.duration}
                    onChange={(e) => handleWorkChange(index, 'amount', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                {formData.work.length > 1 && (
                  <div className="flex">
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
            Add Work
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
