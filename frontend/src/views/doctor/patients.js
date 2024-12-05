import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    nom: '',
    prenoms: '',
    dateNaissance: '',
    adresse: '',
    email: '',
    numeroTelephone: '',
    password: 'nopassword',
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/patients/');
        setPatients(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/patient/', newPatient);
      setPatients([...patients, response.data]);
      setShowCreateForm(false);
      setNewPatient({
        nom: '',
        prenoms: '',
        dateNaissance: '',
        adresse: '',
        email: '',
        numeroTelephone: '',
        password: 'nopassword',
      });
    } catch (err) {
      console.error('Erreur lors de la création du patient', err);
    }
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main className="bg-blueGray-800">
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-8/12 px-4" style={{ marginTop: '300px' }}>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 overflow-hidden">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold mb-4">Liste des Patients</h4>
                    <input
                      type="text"
                      placeholder="Rechercher par nom ou prénom"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="mb-4 px-4 py-2 border rounded w-full"
                    />
                    <button
                      onClick={() => setShowCreateForm(!showCreateForm)}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      {showCreateForm ? 'Annuler' : 'Créer un patient'}
                    </button>
                    {showCreateForm && (
                      <form onSubmit={handleCreatePatient} className="my-4">
                        <input
                          type="text"
                          name="nom"
                          placeholder="Nom"
                          value={newPatient.nom}
                          onChange={handleInputChange}
                          className="mb-2 px-4 py-2 border rounded w-full"
                        />
                        <input
                          type="text"
                          name="prenoms"
                          placeholder="Prénom"
                          value={newPatient.prenoms}
                          onChange={handleInputChange}
                          className="mb-2 px-4 py-2 border rounded w-full"
                        />
                        <input
                          type="date"
                          name="dateNaissance"
                          placeholder="Date de Naissance"
                          value={newPatient.dateNaissance}
                          onChange={handleInputChange}
                          className="mb-2 px-4 py-2 border rounded w-full"
                        />
                        <input
                          type="text"
                          name="adresse"
                          placeholder="Adresse"
                          value={newPatient.adresse}
                          onChange={handleInputChange}
                          className="mb-2 px-4 py-2 border rounded w-full"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={newPatient.email}
                          onChange={handleInputChange}
                          className="mb-2 px-4 py-2 border rounded w-full"
                        />
                        <input
                          type="tel"
                          name="numeroTelephone"
                          placeholder="Numéro de Téléphone"
                          value={newPatient.numeroTelephone}
                          onChange={handleInputChange}
                          className="mb-2 px-4 py-2 border rounded w-full"
                        />
                        
                        <button
                          type="submit"
                          className="bg-green-500 text-white active:bg-green-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                          Enregistrer
                        </button>
                      </form>
                    )}
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full text-left">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Prénom</th>
                            <th className="px-4 py-2">Date de Naissance</th>
                            <th className="px-4 py-2">Adresse</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Numéro de Téléphone</th>
                            <th className="px-4 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPatients.map((patient) => (
                            <tr key={patient.id}>
                              <td className="border px-4 py-2">{patient.nom}</td>
                              <td className="border px-4 py-2">{patient.prenoms}</td>
                              <td className="border px-4 py-2">{patient.dateNaissance}</td>
                              <td className="border px-4 py-2">{patient.adresse}</td>
                              <td className="border px-4 py-2">{patient.email}</td>
                              <td className="border px-4 py-2">{patient.numeroTelephone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PatientsList;
