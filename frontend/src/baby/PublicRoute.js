import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const userRole = localStorage.getItem("userRole");
    // Redirige selon le rôle de l'utilisateur connecté
    return <Navigate to={userRole === "doctor" ? "/doctor" : "/patient"} />;
  }

  return children; // Affiche la route publique si non connecté
};

export default PublicRoute;
