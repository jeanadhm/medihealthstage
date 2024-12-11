import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import DoctorSidebar from "components/Sidebar/DoctorSidebar";

// views
import PatientsList from "views/doctor/patients";
import AppointmentList from "views/doctor/rdvall";
import AnalysisForm from "views/doctor/analyses";
import AppointmentForm from "views/doctor/rdvdoctor";
import Chat from "views/doctor/consultations";
import Allanalyses from "views/doctor/allanalyses";
import ConsultationForm from "views/doctor/consults";
import UserProfileDoc from "views/doctor/profiledoc";
import MedicalRecord from "views/doctor/dossier";
import Settings from "views/doctor/settings";
import DoctorRequests from "views/doctor/demandepatient";


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
            <Route path="consultations" element={<Chat />} />
            <Route path="rdv" element={<AppointmentForm />} />
            <Route path="rdvs" element={<AppointmentList />} />
            <Route path="analyses/all" element={<Allanalyses />} />
            <Route path="consults" element={<ConsultationForm />} />
            <Route path="profiledoc" element={<UserProfileDoc />} />
            <Route path="dossier" element={<MedicalRecord />} />
            <Route path="settings" element={<Settings />} />
            <Route path="demandepatient" element={<DoctorRequests />} />
            
            
            {/* Redirection pour les chemins invalides */}
            <Route path="*" element={<Navigate to="patients" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
