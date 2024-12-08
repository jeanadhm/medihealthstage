import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfileDoc = () => {
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
    return (
      <div className="flex items-center justify-center h-screen bg-bluegray-800">
        <div className="text-red-500 text-center text-xl">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-bluegray-800">
        <div className="text-center text-bluegray-400 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bluegray-800" style={{marginTop: 100}}>
      <div className="w-full max-w-sm p-6 bg-bluegray-900 shadow-2xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-bluegray-200">
          Profil Utilisateur
        </h2>
        <div className="space-y-4">
          {/* Information de base */}
          <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
            <p className="text-lg text-bluegray-100">
              <strong className="text-bluegray-400">Nom complet :</strong>{" "}
              {user.full_name}
            </p>
          </div>
          <br/>
          <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
            <p className="text-lg text-bluegray-100">
              <strong className="text-bluegray-400">Email :</strong> {user.email}
            </p>
          </div>

          {/* Informations spécifiques au rôle */}
          {user.role === "patient" && (
            <>
              <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
                <p className="text-lg text-bluegray-100">
                  <strong className="text-bluegray-400">Numéro de téléphone :</strong>{" "}
                  {user.numeroTelephone}
                </p>
              </div>
              <br/>
              <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
                <p className="text-lg text-bluegray-100">
                  <strong className="text-bluegray-400">Adresse :</strong>{" "}
                  {user.adresse}
                </p>
              </div>
              <br/>
              <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
                <p className="text-lg text-bluegray-100">
                  <strong className="text-bluegray-400">Date de naissance :</strong>{" "}
                  {user.dateNaissance}
                </p>
              </div>
            </>
          )}
          {user.role === "doctor" && (
            <>
            <br/>
              <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
                <p className="text-lg text-bluegray-100">
                  <strong className="text-bluegray-400">Numéro d'identification :</strong>{" "}
                  {user.numIdentification}
                </p>
              </div>
              <br/>
              <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
                <p className="text-lg text-bluegray-100">
                  <strong className="text-bluegray-400">Hôpital :</strong> {user.hopital}
                </p>
              </div>
              <br/>
              <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
                <p className="text-lg text-bluegray-100">
                  <strong className="text-bluegray-400">Téléphone de l'hôpital :</strong>{" "}
                  {user.telHopital}
                </p>
              </div>
              <br/>
              <div className="bg-bluegray-800 shadow-md rounded-lg p-3 text-center">
                <p className="text-lg text-bluegray-100">
                  <strong className="text-bluegray-400">Adresse de l'hôpital :</strong>{" "}
                  {user.adresse}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileDoc;
