import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './app/store';

axios.defaults.baseURL = 'https://bhuvi-management-server-7nf0.onrender.com';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
        <Layout />
        <App />
    </Provider>
  </BrowserRouter>
);
