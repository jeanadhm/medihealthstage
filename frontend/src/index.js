import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Loginpatient from "views/auth/Loginpatient";
import Logindoctor from "views/auth/Logindoctor";
// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Doctor from "layouts/doctor";
import Patient from "layouts/patient";

// views without layouts
import Landing from "views/Landing.js";
import PatientsList from "views/doctor/patients";
import Index from "views/Index.js";
import About from "views/About";
import Contact from "views/Contact";
import Register from "views/auth/Register";
import AnalysisForm from "views/doctor/analyses";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* Add routes with layouts */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/doctor/*" element={<Doctor />} />
      <Route path="/patient/*" element={<Patient />} />

      {/* Add routes without layouts */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/accueil" element={<Index />} />
      <Route path="/connexiondoc" element={<Logindoctor />} />
      <Route path="/connexionpat" element={<Loginpatient />} />
      <Route path="/inscription" element={<Register />} />

      {/* Redirect the first page */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
