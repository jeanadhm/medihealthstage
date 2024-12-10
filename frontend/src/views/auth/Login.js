import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false); // Indique le chargement
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setNotification({ type: 'error', message: 'Tous les champs sont obligatoires' });
      return;
    }
  
    setLoading(true); // Active l'état de chargement
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      const { refresh, access, message, role, userId } = response.data;  // Inclure l'ID du docteur dans la réponse
  
      // Stockage des informations de connexion dans localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('userRole', role);
      localStorage.setItem('doctorId', userId);  // Enregistrez l'ID du docteur ici
  
      setNotification({ type: 'success', message });
  
      setTimeout(() => {
        if (role === 'patient') {
          navigate('/patient');
        } else if (role === 'doctor') {
          navigate('/doctor');
        } else {
          setNotification({ type: 'error', message: 'Rôle inconnu, contactez l\'administrateur.' });
        }
      }, 2000); // Simule une attente avant la redirection
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Email ou mot de passe incorrect', // Message d'erreur personnalisé
      });
    } finally {
      setLoading(false); // Désactive l'état de chargement
    }
  };
  

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={formContainerStyle}>
          <h2 style={titleStyle}>Connexion</h2>
          {notification && (
            <div
              style={{
                ...notificationStyle,
                backgroundColor: notification.type === 'success' ? '#48BB78' : '#F56565',
              }}
            >
              {notification.message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={fieldStyle}>
              <label htmlFor="email" style={labelStyle}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Entrez votre email"
              />
            </div>
            <div style={fieldStyle}>
              <label htmlFor="password" style={labelStyle}>Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Entrez votre mot de passe"
              />
            </div>
            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? 'Chargement...' : 'Se connecter'}
            </button>
          </form>
          <div style={footerLinkStyle}>
            <p>
              Vous n'avez pas de compte ?{' '}
              <a href="/inscription" style={linkStyle}>Créez-le ici</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Styles
const containerStyle = {
  marginTop: 30,
  backgroundColor: '#2d3748',
  minHeight: 'calc(100vh - 80px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  color: '#fff',
};

const formContainerStyle = {
  backgroundColor: '#edf2f7',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#2d3748',
};

const fieldStyle = {
  marginBottom: '1.5rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#4a5568',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  backgroundColor: '#f7fafc',
  color: '#2d3748', 
  fontSize: '1rem',
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#2d3748',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  opacity: '1',
};

const footerLinkStyle = {
  textAlign: 'center',
  marginTop: '1rem',
  color: '#2d3748'
};

const linkStyle = {
  color: '#2b6cb0',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const notificationStyle = {
  padding: '0.75rem',
  borderRadius: '4px',
  marginBottom: '1.5rem',
  textAlign: 'center',
  color: '#fff',
  fontWeight: 'bold',
};

export default Login;
