import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError("Une erreur s'est produite lors du chargement des données.");
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-3 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Profil utilisateur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p><strong>Nom complet :</strong> {user.full_name}</p>
            <p><strong>Email :</strong> {user.email}</p>
          </div>
          {user.role === "patient" && (
            <div>
              <p><strong>Numéro de téléphone :</strong> {user.numeroTelephone}</p>
              <p><strong>Adresse :</strong> {user.adresse}</p>
              <p><strong>Date de naissance :</strong> {user.dateNaissance}</p>
            </div>
          )}

          {user.role === "doctor" && (
            <div>
              <p><strong>Numéro d'identification :</strong> {user.numIdentification}</p>
              <p><strong>Hôpital :</strong> {user.hopital}</p>
              <p><strong>Téléphone de l'hôpital :</strong> {user.telHopital}</p>
              <p><strong>Adresse de l'hôpital :</strong> {user.adresseHopital}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
