import React, { useState } from "react";
import axios from "axios";

export default function Tables() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Initialiser le rôle à une chaîne vide par défaut
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [montant, setMontant] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleMontantChange = (event) => {
    setMontant(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/users", { 
      username, 
      password, 
      role,
      nom,
      prenom,
      montant
    })
      .then(response => {
        setMessage("Utilisateur créé avec succès !");
        setUsername("");
        setPassword("");
        setRole(""); // Réinitialiser le rôle à une chaîne vide après la création de l'utilisateur
        setNom("");
        setPrenom("");
        setMontant("");
      })
      .catch(error => {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        setMessage("Erreur lors de la création de l'utilisateur.");
      });
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Créer un nouvel utilisateur</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Nom d'utilisateur:</label>
          <input type="text" value={username} onChange={handleUsernameChange} style={inputStyle} />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Mot de passe:</label>
          <input type="password" value={password} onChange={handlePasswordChange} style={inputStyle} />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Rôle:</label>
          <select value={role} onChange={handleRoleChange} style={inputStyle}>
            <option>Choisissez un rôle</option> {/* Option vide par défaut */}
            <option value="client">Client</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Nom:</label>
          <input type="text" value={nom} onChange={handleNomChange} style={inputStyle} />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Prénom:</label>
          <input type="text" value={prenom} onChange={handlePrenomChange} style={inputStyle} />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Montant:</label>
          <input type="number" value={montant} onChange={handleMontantChange} style={inputStyle} />
        </div>
        <button type="submit" style={submitButtonStyle}>Créer</button>
      </form>
      <p style={{marginTop: "10px",
  color: message.includes("Erreur") ? "red" : "green",}}>{message}</p>
    </div>
  );
}

const containerStyle = {
  padding: "20px",
  marginTop: "100px",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  marginBottom: "20px",
  fontSize: "24px",
};

const formStyle = {
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
};

const inputContainerStyle = {
  marginBottom: "15px",
  display: "flex",
  alignItems: "center",
};

const labelStyle = {
  marginRight: "10px",
};

const inputStyle = {
  flex: "1",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const submitButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
