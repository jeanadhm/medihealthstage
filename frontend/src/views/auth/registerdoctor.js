// MedecinRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const MedecinRegister = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    anneeNaissance: '',
    numIdentification: '',
    hopital: '',
    telHopital: '',
    adresseHopital: '',
    documentsVerification: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Réinitialiser le formulaire après soumission réussie si nécessaire
      setFormData({
        nom: '',
        prenom: '',
        anneeNaissance: '',
        numIdentification: '',
        hopital: '',
        telHopital: '',
        adresseHopital: '',
        documentsVerification: '',
      });
    } catch (error) {
      // Gérer les erreurs de soumission du formulaire ici
      console.error('Error submitting medecin registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="prenom">Prénom:</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="anneeNaissance">Année de Création:</label>
        <input
          type="number"
          id="anneeNaissance"
          name="anneeNaissance"
          value={formData.anneeNaissance}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="numIdentification">Numéro d'identification de Médecin:</label>
        <input
          type="text"
          id="numIdentification"
          name="numIdentification"
          value={formData.numIdentification}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="hopital">Nom de l'Hôpital:</label>
        <input
          type="text"
          id="hopital"
          name="hopital"
          value={formData.hopital}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="telHopital">Numéro de Téléphone de l'Hôpital:</label>
        <input
          type="text"
          id="telHopital"
          name="telHopital"
          value={formData.telHopital}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="adresseHopital">Adresse de l'Hôpital:</label>
        <input
          type="text"
          id="adresseHopital"
          name="adresseHopital"
          value={formData.adresseHopital}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="documentsVerification">Documents de Vérification:</label>
        <input
          type="file"
          id="documentsVerification"
          name="documentsVerification"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Envoyer</button>
      <button type="button" onClick={() => setFormData({})}>Annuler</button>
    </form>
  );
};

export default MedecinRegister;
