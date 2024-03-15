import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { ContextProvider } from './contexts/ContextProvider.jsx'
import Layout from './Layout.jsx';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI;
axios.defaults.withCredentials = true;
// console.log(import.meta.env.VITE_SERVER_URI)
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
      <Provider store={store}>
        <ContextProvider>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Layout>
          <App />
          </Layout>
        </React.Suspense>
        </ContextProvider>
      </Provider>
  </>,
);
