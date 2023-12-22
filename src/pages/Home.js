import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const [role, setRole] = useState('');
  
  const handleChange = (data)=>{
    setRole(data.target.value);
  };
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    switch (role) {
      case 'Admin':
        navigate('/admin')
        break;
        case 'Ceo':
          navigate('/ceo')
          break;
          case 'Client':
            navigate('/client')
            break;
            case 'Employee':
              navigate('/employee')
              break;
      default:
        navigate('*')
        break;
    }
    console.log(role)
  }
  
  return (
    <>
    {/* <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
    onSubmit={handleSubmit}
    > 
    <label className="block mb-2">
          Role:
          <input
            type="text"
            name="role"
            value={role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
    </form> */}
    <Login/>
    </>
  )
}

export default Home