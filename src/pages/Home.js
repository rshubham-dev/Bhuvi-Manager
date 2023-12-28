import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import { useNavigate } from 'react-router-dom';

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
    <Login/>
    </>
  )
}

export default Home