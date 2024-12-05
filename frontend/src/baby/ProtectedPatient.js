import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedPatient = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  if (!accessToken) {
    // Redirige vers la page de connexion si non connecté
    return <Navigate to="/connexion" />;
  }

  if (userRole !== "patient") {
    // Redirige si l'utilisateur n'est pas un patient
    return <Navigate to="/doctor" />;
  }

  return children;
};

export default ProtectedPatient;
