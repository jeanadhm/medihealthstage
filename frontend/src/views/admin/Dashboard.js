import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Récupérer la liste des clients depuis votre backend
    axios.get("http://localhost:5000/clients")
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des clients :", error);
      });
  }, []);

  return (
    <>
    <br /><br /><br /><br /><br />
      <h1>Liste des clients</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Nom</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Prénom</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Téléphone</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Pays</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Montant</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Devise</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} style={{ border: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.nom}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.prenom}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.email}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.telephone}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.pays}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.montantDemande}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.devise}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{client.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
