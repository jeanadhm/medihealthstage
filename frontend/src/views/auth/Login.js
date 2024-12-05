import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [notification, setNotification] = useState(null);
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      const { refresh, access, message, role } = response.data;

      // Stocker les jetons dans le localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('userRole', role);


      setNotification({ type: 'success', message });

      // Rediriger selon le rôle retourné par le backend
      if (role === 'patient') {
        navigate('/patient');
      } else if (role === 'doctor') {
        navigate('/doctor');
      } else {
        setNotification({ type: 'error', message: 'Rôle inconnu, contactez l\'administrateur.' });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || "Erreur d'authentification",
      });
    }
  };

  return (
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
            />
          </div>
          <button type="submit" style={buttonStyle}>Se connecter</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  backgroundColor: '#2d3748',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  marginBottom: '1rem',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const fieldStyle = {
  marginBottom: '1rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#4a5568',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  backgroundColor: '#f7fafc',
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
};

const notificationStyle = {
  padding: '0.75rem',
  borderRadius: '4px',
  marginBottom: '1rem',
  textAlign: 'center',
  color: '#fff',
  fontWeight: 'bold',
};

export default Login;
