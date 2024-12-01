// PatientRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const PatientRegister = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
    email: '',
    numeroTelephone: '',
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
        dateNaissance: '',
        adresse: '',
        email: '',
        numeroTelephone: '',
      });
    } catch (error) {
      // Gérer les erreurs de soumission du formulaire ici
      console.error('Error submitting patient registration:', error);
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
        <label htmlFor="dateNaissance">Date de Naissance:</label>
        <input
          type="date"
          id="dateNaissance"
          name="dateNaissance"
          value={formData.dateNaissance}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="adresse">Adresse:</label>
        <input
          type="text"
          id="adresse"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="numeroTelephone">Numéro de Téléphone:</label>
        <input
          type="tel"
          id="numeroTelephone"
          name="numeroTelephone"
          value={formData.numeroTelephone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Envoyer</button>
      <button type="button" onClick={() => setFormData({})}>Annuler</button>
    </form>
  );
};

export default PatientRegister;
