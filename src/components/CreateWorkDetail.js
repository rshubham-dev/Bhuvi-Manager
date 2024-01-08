import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function WorkDetailsForm() {

  const [workDetail, setWorkDetail] = useState({
    title: '',
    description: [{
      work: '',
    }]
  });

  const navigate = useNavigate();

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
    console.log('Submitting form...', workDetail);
    try {
      const response = await axios.post('/api/v1/work-details/create', workDetail);
      console.log('Work details created:', response.data);
      navigate('/work-order');
    } catch (error) {
      console.log('Error creating work details:', error.message);
      toast.error(error.message)
    }
  };
  
  return (
    <section className="container mx-auto mt-6 mb-24">
      <form className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md' onSubmit={createWorkDetails}>

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
          {workDetail.description.map((works, index) => (
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

          <button
            type="button"
            onClick={moreWork}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Add More
          </button>
        </div>

        <button
          type="button"
          onClick={createWorkDetails}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Create Work Detail
        </button>

      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  );
}

export default WorkDetailsForm;