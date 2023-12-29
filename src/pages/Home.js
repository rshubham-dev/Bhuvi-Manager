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
    <section className="max-w-md mx-auto mt-8 p-8 flex justify-center align-center flex-col">
      <h1 className="text-2xl text-center font-semibold mb-4">Bhuvi Consultants</h1>
      <div className='flex'>
    <NavLink to={'/register'} className="w-full bg-blue-500 text-center text-white p-2 rounded-md hover:bg-blue-600">Register</NavLink>
    <NavLink to={'login'} className="w-full bg-blue-500 text-center text-white p-2 rounded-md hover:bg-blue-600">Login</NavLink>
      </div>
    </section>
    </>
  )
}

export default Home