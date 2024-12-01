import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function LoginDoctor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState(null); // Pour stocker les résultats de test
  const [responseDetails, setResponseDetails] = useState(""); // Réponse brute du backend
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseDetails("");

    try {
      const requestData = { email, password };
      setTestData(requestData); // Stocker les données envoyées pour test

      // Requête vers le backend
      const response = await axios.post("http://127.0.0.1:8000/api/doctors/login/", requestData);

      // Sauvegarder le token JWT reçu
      const token = response.data.token; // Le backend retourne un JWT
      localStorage.setItem("auth_token", token);

      // Afficher les détails pour test
      setResponseDetails(JSON.stringify(response.data, null, 2));

      // Rediriger après connexion réussie
      navigate("/doctor");
    } catch (error) {
      if (error.response) {
        // Gestion des erreurs du backend
        setResponseDetails(JSON.stringify(error.response.data, null, 2));
        setError(error.response.data.detail || "Adresse e-mail ou mot de passe incorrect.");
      } else {
        // Gestion des erreurs réseau ou inconnues
        setResponseDetails("Erreur réseau ou serveur.");
        setError("Une erreur est survenue, veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="pb-20 relative block bg-blueGray-800">
          {/* Background */}
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4" style={{ marginTop: "300px" }}>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3 mt-8">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Adresse e-mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Adresse e-mail"
                          required
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="password"
                        >
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Mot de passe"
                          required
                        />
                      </div>
                      {error && <p className="text-red-500">{error}</p>}
                      {loading && <p className="text-blue-500">Chargement...</p>}
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setEmail("");
                            setPassword("");
                            setError("");
                            setTestData(null);
                            setResponseDetails("");
                          }}
                        >
                          Annuler
                        </button>
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          disabled={loading}
                        >
                          Connexion
                        </button>
                      </div>
                      <div className="text-center mt-4">
                        <p className="text-blueGray-600">
                          Vous n'êtes pas inscrit ?{" "}
                          <Link
                            to="/inscription"
                            className="text-blue-500 hover:text-blue-800"
                          >
                            Inscrivez-vous ici
                          </Link>
                        </p>
                      </div>
                    </form>
                    {/* Section de test */}
                    <div className="mt-6 p-4 bg-white rounded shadow">
                      <h3 className="text-blueGray-800 text-lg font-bold mb-3">Données de test</h3>
                      {testData && (
                        <pre className="text-sm text-blueGray-600 bg-blueGray-100 p-3 rounded">
                          <strong>Données envoyées :</strong>
                          {JSON.stringify(testData, null, 2)}
                        </pre>
                      )}
                      {responseDetails && (
                        <pre className="text-sm text-blueGray-600 bg-blueGray-100 p-3 rounded">
                          <strong>Réponse du serveur :</strong>
                          {responseDetails}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
