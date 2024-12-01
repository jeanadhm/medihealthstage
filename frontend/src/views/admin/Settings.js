import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    // Récupérer la liste des demandes depuis votre backend
    axios.get("http://localhost:5000/clients")
      .then(response => {
        setDemandes(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des demandes :", error);
      });
  }, []);

  const handleValider = (id) => {
    // Code pour valider la demande avec l'ID donné
  };

  const handleRefuser = (id) => {
    // Code pour refuser la demande avec l'ID donné
  };

  return (
    <>
      <style>
        {`
          .demandes-container {
            display: flex;
            flex-wrap: wrap;
          }

          .demande-card {
            width: calc(33.33% - 20px);
            margin: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .demande-content {
            padding: 15px;
          }

          .buttons-container {
            display: flex;
            justify-content: space-between;
            padding: 10px;
          }

          .valider-button, .refuser-button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .valider-button {
            background-color: #4caf50;
            color: white;
          }

          .refuser-button {
            background-color: #f44336;
            color: white;
          }

          .valider-button:hover, .refuser-button:hover {
            background-color: #2e7d32;
          }
        `}
      </style>
      <br /><br /><br /><br /><br />
      <h1>Liste des demandes</h1>
      <div className="demandes-container">
        {demandes.map((demande, index) => (
          <div key={demande.id} className="demande-card">
            <div className="demande-content">
              <p><strong>Nom et prénom:</strong> {demande.nom} {demande.prenom}</p>
              <p><strong>Email:</strong> {demande.email}</p>
              <p><strong>Montant:</strong> {demande.montantDemande} {demande.devise}</p>
              <p><strong>Pays:</strong> {demande.pays}</p>
              <p><strong>Téléphone:</strong> {demande.telephone}</p>
            </div>
            <div className="buttons-container">
              <button className="valider-button" onClick={() => handleValider(demande.id)}>Valider</button>
              <button className="refuser-button" onClick={() => handleRefuser(demande.id)}>Refuser</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
