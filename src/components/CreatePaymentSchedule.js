import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const CreatePaymentSchedule = () => {
  const [formData, setFormData] = useState({
    workOrderName: '',
    client: '',
    contractor: '',
    site: '',
    paymentDetails: [
      {
        workDescription: '', // Now it's a dropdown, so it stores the _id of the selected Work-Detail
        rate: '',
        area: '',
        unit: '',
        amount: '',
        paymentDate: '',
        billNo: '',
        billCleared: '',
        amountPaid: '',
        amountdue: '',
        status: '',
      },
    ],
  });

  const [workDetails, setWorkDetails] = useState([]);
  // const [clients, setClient] = useState([]);
  const [sites, setSite] = useState([]);
  // const [contractors, setContractor] = useState([]);
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM'];

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

    const fetchSite = async () => {
      try {
        const response = await axios.get('/api/v1/site');
        console.log('sites:', response.data)
        setSite(response.data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchSite();
    fetchWorkDetails();
  }, []);

  const handleAddWork = () => {
    setFormData((prevData) => ({
      ...prevData,
      paymentDetails: [
        ...prevData.paymentDetails,
        {
          workDetail: '',
          rate: '',
          area: '',
          unit: '',
          paymentDate: '',
          billNo: '',
          amount: '',
          billCleared: '',
          amountPaid: '',
          amountdue: '',
          status: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedFormData = {
      ...formData,
      paymentDetails: formData.paymentDetails.map((detail) => {
        const amount = parseFloat(detail.area) * parseFloat(detail.rate);
        return {
          ...detail,
          amount: isNaN(amount) ? '' : amount.toFixed(2),
        };
      }),
    };
    setFormData(updatedFormData);
    
    try {
      console.log(updatedFormData);
      const response = await axios.post('/api/v1/')
    } catch (error) {
      console.error('Error submitting work order:', error.message);
      toast.error(error.message);
    }
  };
  


  return (
    <section className="container mx-auto mt-6 mb-24">
      <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Payment Schedule</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Select a Site
          </label>
          <select
            name="site"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option>Site</option>
            {sites.map((site) => {
              <option key={site._id} value={site._id}>
                {site.name}
              </option>
            })}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="client" className="block text-sm font-medium text-gray-600">
            Choose Client
          </label>
          <select name="client" required className="mt-1 p-2 w-full border rounded-md">
            <option>Client</option>
            {sites.map((site) => (
              <option key={site._id} value={site._id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="contractor" className="block text-sm font-medium text-gray-600">
            Choose Contractor
          </label>
          <select name="contractor" required className="mt-1 p-2 w-full border rounded-md">
            <option>Contractor</option>
            {sites.map((site) => {
              <option key={site._id} value={site._id}>
                {site.name}
              </option>
            })}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="projectScheduleId" className="block text-sm font-medium text-gray-600">
            Schedule ID
          </label>
          <input
            type="text"
            name="projectScheduleId"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Work Details</h2>
          {formData.paymentDetails.map((work, index) => (
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
                    value={work.workDetail}
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
                  <label htmlFor={`work[${index}].unit`} className="block text-sm font-semibold text-gray-600">
                    Unit
                  </label>
                  <select
                    name={`work[${index}].unit`}
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
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Project Schedule
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePaymentSchedule