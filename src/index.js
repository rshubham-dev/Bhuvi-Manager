import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Layout from './pages/Layout';
import axios from 'axios';

axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Layout/>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


