import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const CreateExtraWork = () => {
    const [formData, setFormData] = useState({
        contractor: '',
        client:'',
        site: '',
        extraWorkDetail: [
          {
            work: '',
            rate: '',
            area: '',
            unit: '',
            amount: '',
          },
        ],
      });
    
      const [sites, setSite] = useState([]);
      const [contractors, setContractor] = useState([]);
      const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM'];
    
      useEffect(() => {
    
        const fetchSite = async () => {
            try {
              const siteData = await axios.get('/api/v1/site');
              console.log(siteData.data)
              setSite(siteData.data);
            } catch (error) {
              toast.error(error.message)
            }
          }
    
        const fetchContractor = async () => {
          try {
            const contractorData = await axios.get('/api/v1/contractor');
            setContractor(contractorData.data);
          } catch (error) {
            toast.error(error.message)
          }
        }
        
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
          extraWorkDetail: [
            ...formData.extraWorkDetail,
            {
                work: '',
              rate: '',
              area: '',
              unit: '',
              amount: '',
            },
          ],
        });
      };
    
      const handleRemoveWork = (index) => {
        const updatedWork = [...formData.extraWorkDetail];
        updatedWork.splice(index, 1);
        setFormData({
          ...formData,
          extraWorkDetail: updatedWork,
        });
      };
    
      const handleWorkChange = (index, field, value) => {
        const updatedWork = [...formData.extraWorkDetail];
        updatedWork[index][field] = value;
        setFormData({
          ...formData,
          extraWorkDetail: updatedWork,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
          ...formData,
          extraWorkDetail: formData.extraWorkDetail.map((detail) => {
            const amount = parseFloat(detail.area) * parseFloat(detail.rate);
            return {
              ...detail,
              amount: isNaN(amount) ? '' : amount.toFixed(2),
            };
          }),
        };
        setFormData(updatedFormData);
    
        try {
          console.log(formData)
          const response = await axios.post('/api/v1/extra-work/create', formData);
          toast.success(response.data.message)
        } catch (error) {
          console.error('Error submitting work order:', error.message);
          toast.error(error.message)
        }
      };
    
      return (
        <div className="container mx-auto mt-6 mb-24">
          <form className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Extra Work</h2>
    
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
    
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Work Details</h2>
              
              {formData.extraWorkDetail.map((workItem, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <div className="grid grid-cols-2 gap-4">
    
                    <div>
                      <label
                        htmlFor={`work[${index}].workDetail`}
                        className="block text-sm font-semibold text-gray-600"
                      >
                        Work Detail
                      </label>
                      <input
                        value={workItem.work}
                        placeholder='Enter Work'
                        onChange={(e) => handleWorkChange(index, 'work', e.target.value)}
                        className="border p-2 rounded w-full"/>
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
    
                    {formData.extraWorkDetail.length > 1 && (
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

            <div className='text-center'>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
              Create Extra Work
            </button>
            </div>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      );
}

export default CreateExtraWork