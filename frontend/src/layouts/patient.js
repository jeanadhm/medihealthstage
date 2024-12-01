import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import PatientSidebar from "components/Sidebar/PatientSidebar";

// views spécifiques au patient
import PatientRdv from "views/patient/rdvpatients";
import Chat from "views/patient/consultspatient";

// Réutilisation d'autres composants si nécessaire
import Settings from "views/admin/Settings.js";

export default function Patient() {
  return (
    <>
      <PatientSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            {/* Routes spécifiques au patient */}
            <Route path="rdv" element={<PatientRdv />} />
            <Route path="myconsultations" element={<Chat />} />
            <Route path="settings" element={<Settings />} />

            {/* Redirection par défaut pour les chemins invalides */}
            <Route path="*" element={<Navigate to="rdv" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
