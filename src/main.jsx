import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

axios.defaults.baseURL = 'https://bhuvi-management-server-7nf0.onrender.com';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
