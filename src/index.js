import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Layout from './pages/Layout';
import { SpeedInsights } from "@vercel/speed-insights/next"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Layout/>
    <App />
    <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
);


