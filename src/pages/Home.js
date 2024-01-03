import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard'
import { Cookies } from 'react-cookie';
const Home = () => {
  const { isLoggedIn } = useSelector((state) => {
    return state.auth
  });

const cookies = new Cookies();
const token = cookies.get('accessToken');
console.log(token)

  return (
    <>
      {isLoggedIn && token ?
        <Dashboard />
        :
        <section className="max-w-md mx-auto mt-10 flex justify-center align-center flex-col">
          <h1 className="text-2xl text-center font-semibold mb-4">Bhuvi Consultants</h1>
          <div className='flex justify-between gap-8'>
            <NavLink to={'/register'} className="w-full bg-blue-500 text-center text-white p-2 rounded-md hover:bg-blue-600">Register</NavLink>
            <NavLink to={'login'} className="w-full bg-blue-500 text-center text-white p-2 rounded-md hover:bg-blue-600">Login</NavLink>
          </div>
        </section>
      }
    </>
  )
}

export default Home