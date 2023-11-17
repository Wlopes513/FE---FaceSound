import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import i18n from './i18n';
import reportWebVitals from './reportWebVitals';

import Home from './views/pages/home';
import Page404 from './views/pages/page404';
import Login from './views/pages/login';
import Dashboard from './views/pages/dashboard';
import People from './views/pages/people';
import User from './views/pages/user';

import './assets/sass/index.scss';
import { localGet } from './utils/session';

const root = ReactDOM.createRoot(document.getElementById("root"));

const alreadyLogged = localGet("isLogged");

if (!alreadyLogged && window.location.pathname !== "/login") {
    window.open("/login", "_self");
}

root.render(
  <I18nextProvider i18n={i18n}>
    <ToastContainer theme="dark" />
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/people" element={<People />} />
          <Route exact path="/user" element={<User />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </I18nextProvider>
);


reportWebVitals();
