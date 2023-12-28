import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const [role, setRole] = useState('');
  
  useEffect(() => {
  console.log('logged in')
  }, [])

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
    <NavLink to={'/register'} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 m-4">Register</NavLink>
    <NavLink to={'login'} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 m-4">Login</NavLink>
    </>
  )
}

export default Home