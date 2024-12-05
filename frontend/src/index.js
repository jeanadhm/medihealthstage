import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedDoctor from "./baby/ProtectedDoctor";
import ProtectedPatient from "./baby/ProtectedPatient";
import PublicRoute from "./baby/PublicRoute";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Loginpatient from "views/auth/Loginpatient";
import Logindoctor from "views/auth/Logindoctor";
// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Doctor from "layouts/doctor";
import Patient from "layouts/patient";
import Login from "views/auth/Login";

// views without layouts
import Landing from "views/Landing.js";
import Index from "views/Index.js";
import About from "views/About";
import Contact from "views/Contact";
import Register from "views/auth/Register";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/about"
        element={
          <PublicRoute>
            <About />
          </PublicRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicRoute>
            <Contact />
          </PublicRoute>
        }
      />
      <Route
        path="/accueil"
        element={
          <PublicRoute>
            <Index />
          </PublicRoute>
        }
      />
      <Route
        path="/connexiondoc"
        element={
          <PublicRoute>
            <Logindoctor />
          </PublicRoute>
        }
      />
      <Route
        path="/connexionpat"
        element={
          <PublicRoute>
            <Loginpatient />
          </PublicRoute>
        }
      />
      <Route
        path="/inscription"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/connexion"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected routes for doctors */}
      <Route
        path="/doctor/*"
        element={
          <ProtectedDoctor>
            <Doctor />
          </ProtectedDoctor>
        }
      />

      {/* Protected routes for patients */}
      <Route
        path="/patient/*"
        element={
          <ProtectedPatient>
            <Patient />
          </ProtectedPatient>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
