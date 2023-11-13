import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';
import reportWebVitals from './reportWebVitals';

import Home from './views/pages/home';
import Page404 from './views/pages/page404';
import Login from './views/pages/login';
import Dashboard from './views/pages/dashboard';

import './assets/sass/index.scss';
import People from './views/pages/people';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/people" element={<People />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </I18nextProvider>
);


reportWebVitals();
