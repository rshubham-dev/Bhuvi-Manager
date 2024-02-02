import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const GoForward = () => {
  const navigate = useNavigate();
  const goForward = () => {
    navigate(1);
  };

  return (
    <div>
      <button onClick={goForward}>
        <FaArrowAltCircleRight className='text-2xl text-blue-500'/>
      </button>
    </div>
  );
};

const GoBackward = () => {
  const navigate = useNavigate();
  const goBackward = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={goBackward}>
        <FaArrowAltCircleLeft className='text-2xl text-blue-500' />
      </button>
    </div>
  );
};

export { GoBackward, GoForward };
