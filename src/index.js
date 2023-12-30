import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import axios from 'axios';
import { UserContextProvider } from './context/AuthContext';

axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <React.Suspense fallback={<div>Loading...</div>}>
        <UserContextProvider>
          <Layout />
          <App />
        </UserContextProvider>
      </React.Suspense>
    </React.StrictMode>
  </BrowserRouter>
);
