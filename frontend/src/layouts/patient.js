import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import PatientSidebar from "components/Sidebar/PatientSidebar";

// views spécifiques au patient
import PatientRdv from "views/patient/rdvpatients";
import PatientChat from "views/patient/consultspatient";
import Hospitals from "views/patient/hospitals";
import UserProfile from "views/patient/profilepat";
import Myresults from "views/patient/results";
import MyRdvs from "views/patient/allrdvpatient";

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
            <Route path="myconsultations" element={<PatientChat />} />
            <Route path="settings" element={<Settings />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="myresults" element={<Myresults />} />
            <Route path="myrdvs" element={<MyRdvs />} />
          

            {/* Redirection par défaut pour les chemins invalides */}
            <Route path="*" element={<Navigate to="hospitals" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
