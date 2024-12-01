import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "components/Navbars/ConNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Profile() {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    // Récupérer les données de demande depuis l'API
    axios.get("http://localhost:5000/clients")
      .then(response => {
        setDemandes(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des demandes :", error);
      });
  }, []);

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div className="container mx-auto px-4 h-full">
            <div className="h-full flex justify-center items-center">
              <div className="text-center">
                <h2 className="text-4xl font-semibold leading-normal mt-0 mb-2 text-blueGray-800">
                  Demandes
                </h2>
                {demandes.map(demande => (
                  <div key={demande.id} className="mb-8">
                    <h3 className="text-xl font-semibold">{demande.nom} {demande.prenom}</h3>
                    <p className="text-lg text-blueGray-500">Email: {demande.email}</p>
                    <p className="text-lg text-blueGray-500">Téléphone: {demande.telephone}</p>
                    <p className="text-lg text-blueGray-500">Montant de la demande: {demande.montantDemande}</p>
                    <p className="text-lg text-blueGray-500">Pays: {demande.pays}</p>
                    <p className="text-lg text-blueGray-500">Devise: {demande.devise}</p>
                    <p className="text-lg text-blueGray-500">Statut: {demande.statut}</p>
                    {/* Ajoutez d'autres propriétés de demande ici */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
