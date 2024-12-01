import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import DoctorSidebar from "components/Sidebar/DoctorSidebar";

// views
import PatientsList from "views/doctor/patients";
import AnalysisForm from "views/doctor/analyses";
import AppointmentForm from "views/doctor/rdvdoctor";
import DoctorChat from "views/doctor/consultations";
import Allanalyses from "views/doctor/allanalyses";

export default function Doctor() {
  return (
    <>
      <DoctorSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            {/* Chemins relatifs pour les sous-routes */}
            <Route path="patients" element={<PatientsList />} />
            <Route path="analyses" element={<AnalysisForm />} />
            <Route path="consultations" element={<DoctorChat />} />
            <Route path="rdv" element={<AppointmentForm />} />
            <Route path="analyses/all" element={<Allanalyses />} />
            
            {/* Redirection pour les chemins invalides */}
            <Route path="*" element={<Navigate to="patients" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
