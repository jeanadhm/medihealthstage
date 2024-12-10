import React, { useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/hospitals/doctors/?q=${query}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error("Erreur lors de la recherche.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 1000,
        margin: "auto",
        padding: 4,
        mt: 12,
        backgroundColor: "#e3f2fd",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ color: "#1e88e5" }}
      >
        Rechercher un Hôpital
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher par nom ou adresse"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <List>
        {results.map((hospital, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={hospital.hopital || "Nom non disponible"}
              secondary={`Adresse: ${hospital.adresse || "Non spécifiée"} | Téléphone: ${hospital.telHopital || "Non disponible"}`}
            />
          </ListItem>
        ))}
        {results.length === 0 && searchQuery.trim() !== "" && (
          <Typography variant="body1" align="center">
            Aucun hôpital trouvé.
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default Hospitals;
