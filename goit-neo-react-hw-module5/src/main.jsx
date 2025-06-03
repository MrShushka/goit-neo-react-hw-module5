import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App/App'; 
import { createRoot } from 'react-dom/client';
// import './index.css'; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
