import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

function WorkDetailsForm() {

  const [workDetail, setWorkDetail] = useState({
    title: '',
    description: [{
      work: '',
    }]
  });
  const { id, index } = useParams();
  const [workToEdit, setWorkToEdit] = useState({
    id: '',
    index: '',
  });
  const [workDetailsToEdit, setWorkDetailsToEdit] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (id && !index) {
      fetchWorkDetail(id);
      setWorkDetailsToEdit(id);
      console.log(id)
    } else if (id && index) {
      setWorkToEdit({ id, index })
      fetchDescription(id, index)
    }
  }, [])

  const fetchWorkDetail = async (id) => {
    try {
      const response = await axios.get(`/api/v1/work-details/${id}`);
      setWorkDetail({
        title: response.data?.title,
        description: [{
          work: '',
        }]
      });
    } catch (error) {
      toast.error(error.message)
    }
  };

  const fetchDescription = async (id, index) => {
    try {
      const response = await axios.get(`/api/v1/work-details/${id}`);
      setWorkDetail({
        title: response.data?.title,
        description: [{
          work: response.data?.description[index].work,
        }]
      });
      console.log(response.data?.description[index])
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handelChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'work') {
      setWorkDetail((prevWorkDetail) => {
        const newDescription = [...prevWorkDetail.description];
        newDescription[index] = {
          ...newDescription[index],
          [name]: value
        };
        return {
          ...prevWorkDetail,
          description: newDescription
        };
      });
    } else {
      // Update other fields outside the description array
      setWorkDetail({
        ...workDetail,
        [name]: value,
      });
    }
  };

  const moreWork = () => {
    setWorkDetail((workDetail) => ({
      ...workDetail,
      description: [
        ...workDetail.description,
        {
          work: '',
        },
      ],
    }));
  };

  const removeWork = (index) => {
    setWorkDetail((prevWorkDetail) => {
      const updatedDescription = [...prevWorkDetail.description];
      updatedDescription.splice(index, 1); // Remove the entry at the specified index
      return {
        ...prevWorkDetail,
        description: updatedDescription,
      };
    });
  };

  const createWorkDetails = async (e) => {
    e.preventDefault();
    try {
      if (workDetailsToEdit) {
        console.log(workDetailsToEdit)
        console.log(workDetail)
        const response = await axios.put(`/api/v1/work-details/${workDetailsToEdit}`, workDetail);
        toast.success(response.data.message)
        navigate(-1);
      } else if (workToEdit.id !== '' && workToEdit.index !== '') {
        const response = await axios.put(`/api/v1/work-details/${workToEdit.id}/${workToEdit.index}`, workDetail);
        toast.success(response.data.message)
        navigate(-1);
      } else {
        const response = await axios.post('/api/v1/work-details/create', workDetail);
        toast.success(response.data.message)
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title={`${id ? 'Update' : 'Create'} Work Details`} />
      <section className="container mx-auto mt-4 mb-16">
        <form className='max-w-md mx-auto ' onSubmit={createWorkDetails}>

          <div className="mb-4">
            <label htmlFor='title' className="block text-sm font-semibold text-gray-600">
              Work Title
            </label>
            <input
              type='text'
              name='title'
              value={workDetail.title}
              required
              onChange={handelChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Work Description</h2>
            {workDetail?.description?.map((works, index) => (
              <div className="mb-4" key={index}>
                <label htmlFor='description' className="block text-sm font-semibold text-gray-600">
                  Work
                </label>
                <div className="flex">
                  <input
                    type='text'
                    name='work'
                    value={works.work}
                    required
                    onChange={(e) => handelChange(e, index)}
                    className="border p-2 rounded w-full"
                  />

                  {workDetail.description.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWork(index)}
                      className="bg-red-500 text-white p-2 rounded ml-2"
                    >
                      Remove
                    </button>
                  )}

                </div>
              </div>
            ))}
            {id ? '' :
              <button
                type="button"
                onClick={moreWork}
                className="bg-blue-500 text-white p-2 rounded mt-4"
              >
                Add More
              </button>
            }
          </div>

          <button
            type="button"
            onClick={createWorkDetails}
            className="bg-green-500 text-white p-2 rounded mt-4"
          >
            {id ? 'Update' : 'Create'} Work Detail
          </button>

        </form>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  );
}

export default WorkDetailsForm;