import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les résultats des analyses du patient connecté
  useEffect(() => {
    const fetchResults = async () => {
      const patientId = localStorage.getItem("patientId");
      if (!patientId) {
        setError("ID du patient non trouvé dans le localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/analyses/all/?patient_id=${patientId}`
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          const errorData = await response.json();
          setError(errorData.detail || "Erreur lors de la récupération des analyses.");
        }
      } catch (err) {
        setError("Erreur réseau. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        mt: 12,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ color: "#1e88e5" }}
      >
        Mes Résultats d'Analyses
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      ) : results.length === 0 ? (
        <Typography variant="body1" align="center">
          Aucun résultat d'analyse trouvé.
        </Typography>
      ) : (
        <List>
          {results.map((result) => (
            <ListItem key={result.id} divider>
              <ListItemText
                primary={result.title || "Analyse sans titre"}
                secondary={`Date: ${new Date(result.date).toLocaleDateString()} - Résultat: ${result.result}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default MyResults;