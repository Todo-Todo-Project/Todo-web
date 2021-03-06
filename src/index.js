import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import Register from './Components/Register';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<App />} />     
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
