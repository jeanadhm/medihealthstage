import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import Carousel from 'views/carrousel';

const Register = () => {
  const [role, setRole] = useState('');
  const history = useNavigate ();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="pb-20 relative block bg-blueGray-800">
          <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-blueGray-800 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4"style={{marginTop:'300px'}}>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold mb-4">Qui êtes-vous ?</h4>
                    <div className="flex justify-center flex-wrap">
                      <RoleOption
                        role="patient"
                        label="Patient"
                        onSelect={handleRoleSelect}
                      />
                      <RoleOption
                        role="medecin"
                        label="Médecin"
                        onSelect={handleRoleSelect}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{ marginBottom: '3rem' }}>
          {role === 'patient' && <PatientForm />}
          {role === 'medecin' && <MedecinForm />}
        </div>
      </main>
      <Footer />
    </>
  );
};

const RoleOption = ({ role, label, onSelect }) => {
  return (
    <button
      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      onClick={() => onSelect(role)}
      style={{ minWidth: '150px', margin: '0.5rem' }}
    >
      {label}
    </button>
  );
};

const PatientForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
    email: '',
    numeroTelephone: '',
    password: '',
  });
  const history = useNavigate ();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/patient/', formData);
      alert('Patient enregistré avec succès');
      history.push('/some-route'); // Changez '/some-route' à la route désirée après l'enregistrement
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du patient', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      nom: '',
      prenom: '',
      dateNaissance: '',
      adresse: '',
      email: '',
      numeroTelephone: '',
      password :'',
    });
  };

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
      <br /><br /><br /><br /><br /><br /><br />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold">Formulaire Patient</h4>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="nom">Nom:</label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="prenom">Prénom:</label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="dateNaissance">Date de Naissance:</label>
                      <input
                        type="date"
                        id="dateNaissance"
                        name="dateNaissance"
                        value={formData.dateNaissance}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="adresse">Adresse:</label>
                      <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="numeroTelephone">Numéro de Téléphone:</label>
                      <input
                        type="tel"
                        id="numeroTelephone"
                        name="numeroTelephone"
                        value={formData.numeroTelephone}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="nom">Mot de passe:</label>
                      <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="submit"
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      style={{ margin: '0.5rem' }}
                    >
                      Envoyer
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-red-500 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      style={{ margin: '0.5rem' }}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MedecinForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    anneeNaissance: '',
    numIdentification: '',
    hopital: '',
    telHopital: '',
    adresseHopital: '',
    documentsVerification: '',
    password:'',
  });
  const history = useNavigate ();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "documentsVerification") {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });
    try {
      await axios.post('http://127.0.0.1:8000/api/register/doctor/', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Médecin enregistré avec succès');
      history.push('/some-route'); // Changez '/some-route' à la route désirée après l'enregistrement
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du médecin', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      nom: '',
      prenom: '',
      anneeNaissance: '',
      numIdentification: '',
      hopital: '',
      telHopital: '',
      adresseHopital: '',
      documentsVerification: '',
      password:'',
    });
  };

  return (
    <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
      <br /><br /><br /><br /><br /><br /><br />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold">Formulaire Médecin</h4>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="nom">Nom:</label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="prenom">Prénom:</label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="anneeNaissance">Année de Naissance:</label>
                      <input
                        type="date"
                        id="anneeNaissance"
                        name="anneeNaissance"
                        value={formData.anneeNaissance}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="numIdentification">Numéro d'identification de Médecin:</label>
                      <input
                        type="text"
                        id="numIdentification"
                        name="numIdentification"
                        value={formData.numIdentification}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="hopital">Nom de l'Hôpital:</label>
                      <input
                        type="text"
                        id="hopital"
                        name="hopital"
                        value={formData.hopital}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="telHopital">Numéro de Téléphone de l'Hôpital:</label>
                      <input
                        type="text"
                        id="telHopital"
                        name="telHopital"
                        value={formData.telHopital}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="adresseHopital">Adresse de l'Hôpital:</label>
                      <input
                        type="text"
                        id="adresseHopital"
                        name="adresseHopital"
                        value={formData.adresseHopital}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="documentsVerification">Documents de Vérification:</label>
                      <input
                        type="file"
                        id="documentsVerification"
                        name="documentsVerification"
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                    <div style={{ width: '48%' }}>
                      <label htmlFor="nom">Mot de passe:</label>
                      <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="submit"
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      style={{ margin: '0.5rem' }}
                    >
                      Envoyer
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-red-500 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      style={{ margin: '0.5rem' }}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
