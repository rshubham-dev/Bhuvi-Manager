import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const CreateExtraWork = () => {
  const [formData, setFormData] = useState({
    extraFor: '',
    contractor: '',
    client: '',
    site: '',
    WorkDetail: [
      {
        work: '',
        rate: '',
        area: '',
        unit: '',
        amount: '',
      },
    ],
  });
  const extraFor = ['Client', 'Contractor'];
  const [sites, setSite] = useState([]);
  const [client, setClient] = useState({});
  const [contractors, setContractor] = useState([]);
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM'];
  const [workToEdit, setWorkToEdit] = useState(null);
  const [workData, setWorkData] = useState({
    work: '',
    rate: '',
    area: '',
    unit: '',
    amount: '',
  });
  const [detailToEdit, setDetailToEdit] = useState({
    id: '',
    index: '',
  });
  const [data, setData] = useState({
    site: '',
    contractor: '',
    client: '',
  });
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id, index } = useParams();

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const siteData = await axios.get('/api/v1/site');
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge') {
          const existingSites = user?.site;
          let Sites;
          for(let existSite of existingSites) {
            Sites = siteData.data?.filter((site) => site?._id.includes(existSite))
          }
          setSite(Sites)
        } else {
          setSite(siteData.data)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchSite();

    if (id && index) {
      setDetailToEdit({ id, index })
      fetchWorkDetail(id, index)
    } else if (id && !index) {
      fetchExtraWork(id)
      setWorkToEdit(id)
    }
  }, []);

  useEffect(() => {
    const siteId = formData.site;
    let siteData = [];
    if (siteId) {
      siteData = sites.filter((site) => site._id === siteId);
    }

    setContractor(siteData[0]?.contractor || '');
    setClient(siteData[0]?.client || '');
  }, [formData.site]);
  formData.client = client.name;

  const fetchExtraWork = async (id) => {
    try {
      const response = await axios.get(`/api/v1/extra-work/${id}`);
      console.log(response.data)
      setData({
        client: response.data.client?.name,
        contractor: response.data.contractor?.name,
        site: response.data.site?.name,
      })
      setFormData({
        extraFor: response.data.extraFor,
        contractor: response.data.contractor?._id,
        client: response.data.client?.name,
        site: response.data.site?._id,
        WorkDetail: [
          {
            work: '',
            rate: '',
            area: '',
            unit: '',
            amount: '',
          },
        ],
      })
    } catch (error) {
      console.error('Error getting extra work:', error.message);
      toast.error(error.message)
    }
  }
  
  const fetchWorkDetail = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/extra-work/${id}/work`);
      const detail = response.data[index]
      console.log(response.data[index])
      setWorkData({
        work: detail?.work,
        rate: detail?.rate,
        area: detail?.area,
        unit: detail?.unit,
        amount: detail?.amount,
      })
    } catch (error) {
      console.error('Error getting work details:', error.message);
      toast.error(error.message)
    }
  }

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleAddWork = () => {
    setFormData({
      ...formData,
      WorkDetail: [
        ...formData.WorkDetail,
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

  const handleUpdate = (field, value) => {
    setWorkData({
      ...workData,
      [field]: value,
    });
  };

  const handleRemoveWork = (index) => {
    const updatedWork = [...formData.WorkDetail];
    updatedWork.splice(index, 1);
    setFormData({
      ...formData,
      WorkDetail: updatedWork,
    });
  };

  const handleWorkChange = (index, field, value) => {
    const updatedWork = [...formData.WorkDetail];
    updatedWork[index][field] = value;
    setFormData({
      ...formData,
      WorkDetail: updatedWork,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      WorkDetail: formData.WorkDetail.map((detail) => {
        const amount = parseFloat(detail.area) * parseFloat(detail.rate);
        return {
          ...detail,
          amount: isNaN(amount) ? '' : amount.toFixed(1),
        };
      }),
    };

    const amount = parseFloat(workData.area) * parseFloat(workData.rate);
    const updatedDetail = {
      ...workData,
      amount: isNaN(amount) ? '' : amount.toFixed(1),
    }

    try {
      if (workToEdit) {
        console.log(updatedFormData)
        const response = await axios.put(`/api/v1/extra-work/${workToEdit}`, updatedFormData);
        toast.success(response.data.message)
        navigate(-1)
      } else if (detailToEdit.id !== '' && detailToEdit.index !== '') {
        const response = await axios.put(`/api/v1/extra-work/${detailToEdit.id}/work/${detailToEdit.index}`, updatedDetail);
        toast.success(response.data.message)
        navigate(-1)
      } else {
        console.log('updatedFormData:', updatedFormData)
        const response = await axios.post('/api/v1/extra-work/create', updatedFormData);
        console.log(response.data);
        toast.success(response.data.message)
        navigate(-1)
      }
    } catch (error) {
      console.error('Error submitting extra work:', error.message);
      toast.error(error.message)
    }
  };

  const ExtraWorkFor = (name) => {
    switch (name) {
      case 'Contractor':
        return (
          <>
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
              <option>{workToEdit ? data.contractor : 'Contractor'}</option>
              {contractors && contractors?.map((contractor) => (
                <option key={contractor._id} value={contractor._id}>
                  {contractor.name}
                </option>
              ))}
            </select>
          </>
        );
        break;
      case 'Client':
        return (
          <>
            <label htmlFor="client" className="block text-sm font-medium text-gray-600 mb-2">
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
        <p>Please Select, For Whom You Wan't to Make Bill </p>
      );
        break;
    }
  };

  if (detailToEdit.id !== '' && detailToEdit.index !== '') {
    return (
      <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Update Extra Work Details" />
        <section className="flex items-center justify-center h-full mb-16 mt-4">
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 w-full max-w-md">

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Work:
              </label>
              <input
                value={workData.work}
                placeholder='Enter Work'
                onChange={(e) => handleUpdate('workDetail', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                Quantity:
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
                <option>{workData ? workData.unit : 'Select a Unit'}</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
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
      <Header category="Page" title="Create Extra Work" />
      <div className="container mx-auto mt-4 mb-16">
        <form className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Extra Work</h2>

          <div className="mb-4">
            <label htmlFor="extraFor" className="block text-sm font-medium text-gray-600 mb-2">
              Extra Work for
            </label>
            <select
              name="extraFor"
              value={formData.extraFor}
              onChange={(e) => handleChange('extraFor', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>{workToEdit ? formData.extraFor : 'Extra Work for'}</option>
              {extraFor.map((extra, index) => (
                <option key={index} value={extra}>
                  {extra}
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
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => handleChange('site', e.target.value)}
            >
              <option>{workToEdit ? data.site : 'Site'}</option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            {ExtraWorkFor(formData.extraFor)}
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Work Details</h2>

            {formData.WorkDetail.map((workItem, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label
                      htmlFor={`work[${index}].workDetail`}
                      className="block text-sm font-semibold text-gray-600">
                      Work Detail
                    </label>
                    <input
                      value={workItem.work}
                      placeholder='Enter Work'
                      onChange={(e) => handleWorkChange(index, 'work', e.target.value)}
                      className="border p-2 rounded w-full" />
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
                      Quantity
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

                  {formData.WorkDetail.length > 1 && (
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

            {workToEdit ? '' :
              <button
                type="button"
                onClick={handleAddWork}
                className="bg-blue-500 text-white p-2 rounded"
              >
                More Work
              </button>
            }
          </div>

          <div className='text-center'>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
              Create Extra Work
            </button>
          </div>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      </div>
    );
  }
}

export default CreateExtraWork