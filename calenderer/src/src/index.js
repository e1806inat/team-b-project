import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calender from './Calender';
import Games from './Games';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calender />
  </React.StrictMode>
);




reportWebVitals();
