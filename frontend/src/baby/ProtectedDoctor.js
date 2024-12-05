import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedDoctor = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  if (!accessToken) {
    // Redirige vers la page de connexion si non connecté
    return <Navigate to="/connexion" />;
  }

  if (userRole !== "doctor") {
    // Redirige si l'utilisateur n'est pas un docteur
    return <Navigate to="/patient" />;
  }

  return children;
};

export default ProtectedDoctor;
