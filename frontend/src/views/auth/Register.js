import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const Register = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <>
      <Navbar transparent />
      <main style={{backgroundColor: '#2d3748'}}>
        <section style={{ backgroundColor: '#2d3748', paddingBottom: '5rem', marginTop:'4rem' }}>
          <div
            style={{
              bottom: 'auto',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '5rem',
              position: 'absolute',
              transform: 'translateZ(0)',
              pointerEvents: 'none',
            }}
          >
            
          </div>
        </section>
        <section style={{ backgroundColor: '#2d3748', padding: '6rem 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-12rem' }}>
              <div
                style={{
                  backgroundColor: '#edf2f7',
                  borderRadius: '8px',
                  padding: '2rem',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  maxWidth: '600px',
                }}
              >
                <h4 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                  Qui êtes-vous ?
                </h4>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <RoleOption role="patient" label="Patient" onSelect={handleRoleSelect} />
                  <RoleOption role="medecin" label="Médecin" onSelect={handleRoleSelect} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{ marginBottom: '3rem' }}>
          {role === 'patient' && <PatientForm navigate={navigate} />}
          {role === 'medecin' && <MedecinForm navigate={navigate} />}
        </div>
      </main>
      <Footer />
    </>
  );
};

const RoleOption = ({ role, label, onSelect }) => (
  <button
    style={{
      backgroundColor: '#2d3748',
      mt: 20,
      color: '#fff',
      padding: '0.75rem 1.5rem',
      borderRadius: '4px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      margin: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '150px',
    }}
    onClick={() => onSelect(role)}
  >
    {label}
  </button>
);

const Notification = ({ message, type }) => (
  <div
    style={{
      marginBottom: '1rem',
      padding: '1rem',
      borderRadius: '4px',
      color: type === 'success' ? '#155724' : '#721c24',
      backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
      border: type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
      textAlign: 'center',
    }}
  >
    {message}
  </div>
);

const PatientForm = ({ navigate }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    dateNaissance: '',
    adresse: '',
    email: '',
    numeroTelephone: '',
    password: '',
    role: 'patient',
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => !field)) {
      setNotification({ message: "Tous les champs sont obligatoires.", type: "error" });
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/users/patients/', formData);
      setNotification({ message: "Patient enregistré avec succès.", type: "success" });
      setTimeout(() => navigate('/connexion'), 2000);
    } catch (error) {
      setNotification({ message: `Erreur: ${JSON.stringify(error.response?.data)}`, type: "error" });
    }
  };

  const handleCancel = () => {
    setFormData({
      nom: '',
      prenoms: '',
      dateNaissance: '',
      adresse: '',
      email: '',
      numeroTelephone: '',
      password: '',
      role: 'patient',
    });
    setNotification(null);
  };

  return (
    <FormContainer title="Inscription Patient" onSubmit={handleSubmit}>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <Field name="nom" label="Nom" value={formData.nom} onChange={handleChange} />
      <Field name="prenoms" label="Prénom" value={formData.prenoms} onChange={handleChange} />
      <Field type="date" name="dateNaissance" label="Date de Naissance" value={formData.dateNaissance} onChange={handleChange} />
      <Field name="adresse" label="Adresse" value={formData.adresse} onChange={handleChange} />
      <Field type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
      <Field type="tel" name="numeroTelephone" label="Numéro de Téléphone" value={formData.numeroTelephone} onChange={handleChange} />
      <Field type="password" name="password" label="Mot de Passe" value={formData.password} onChange={handleChange} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" style={{ ...buttonStyle, backgroundColor: '#e53e3e' }} onClick={handleCancel}>Annuler</button>
        <button type="submit" style={buttonStyle}>Envoyer</button>
      </div>
    </FormContainer>
  );
};

const MedecinForm = ({ navigate }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    email: '',
    anneeNaissance: '',
    numIdentification: '',
    hopital: '',
    telHopital: '',
    adresseHopital: '',
    documentsVerification: null,
    password: '',
    role: 'doctor',
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documentsVerification") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).some((key) => !formData[key] && key !== "documentsVerification")) {

      setNotification({ message: "Tous les champs sont obligatoires.", type: "error" });
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      await axios.post('http://127.0.0.1:8000/api/users/doctors/', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNotification({ message: "Médecin enregistré avec succès.", type: "success" });
      setTimeout(() => navigate('/connexion'), 2000);
    } catch (error) {
      setNotification({ message: `Erreur: ${JSON.stringify(error.response?.data)}`, type: "error" });
    }
  };

  const handleCancel = () => {
    setFormData({
      nom: '',
      prenoms: '',
      email: '',
      anneeNaissance: '',
      numIdentification: '',
      hopital: '',
      telHopital: '',
      adresseHopital: '',
      documentsVerification: null,
      password: '',
      role: 'doctor',
    });
    setNotification(null);
  };

  return (
    <FormContainer title="Inscription Médecin" onSubmit={handleSubmit}>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <Field name="nom" label="Nom" value={formData.nom} onChange={handleChange} />
      <Field name="prenoms" label="Prénom" value={formData.prenoms} onChange={handleChange} />
      <Field type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
      <Field name="anneeNaissance" label="Année de Naissance" value={formData.anneeNaissance} onChange={handleChange} />
      <Field name="numIdentification" label="Numéro d'Identification" value={formData.numIdentification} onChange={handleChange} />
      <Field name="hopital" label="Hôpital" value={formData.hopital} onChange={handleChange} />
      <Field name="telHopital" label="Téléphone de l'Hôpital" value={formData.telHopital} onChange={handleChange} />
      <Field name="adresseHopital" label="Adresse de l'Hôpital" value={formData.adresseHopital} onChange={handleChange} />
      <Field type="file" name="documentsVerification" label="Documents de Vérification" onChange={handleChange} />
      <Field type="password" name="password" label="Mot de Passe" value={formData.password} onChange={handleChange} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button type="button" style={{ ...buttonStyle, backgroundColor: '#e53e3e' }} onClick={handleCancel}>Annuler</button>
      <button type="submit" style={buttonStyle}>Envoyer</button>
        
      </div>
    </FormContainer>
  );
};

const Field = ({ type = "text", name, label, value, onChange }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#edf2f7',
      }}
    />
  </div>
);

const FormContainer = ({ title, children, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '0 auto',
    }}
  >
    <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h2>
    {children}
  </form>
);

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  color: '#fff',
  backgroundColor: '#2d3748',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default Register;
