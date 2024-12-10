import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

const ConsultationForm = ({ doctorId }) => { // Passez l'ID du médecin comme prop ou récupérez-le d'une autre manière
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [consultationDate, setConsultationDate] = useState(null);
  const [error, setError] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [constants, setConstants] = useState({
    temperature: "",
    bloodPressure: "",
    pulse: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = localStorage.getItem('doctorId');
        if (doctorId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/patients/?doctorId=${doctorId}`);
          setPatients(response.data);
        } else {
          setError("Doctor ID is missing.");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatients();
  }, []);

  const handleConstantsChange = (e) => {
    const { name, value } = e.target;
    setConstants((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setSelectedPatient("");
    setConsultationDate(null);
    setSymptoms("");
    setConstants({ temperature: "", bloodPressure: "", pulse: "" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formattedDate = consultationDate
      ? consultationDate.toISOString().split("T")[0]
      : null;

    const consultationData = {
      patient: selectedPatient,
      date: formattedDate,
      symptoms,
      temperature: constants.temperature,
      blood_pressure: constants.bloodPressure,
      pulse: constants.pulse,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/consultations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consultationData),
      });
      const responseData = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("Consultation enregistrée avec succès !");
        resetForm();
      } else {
        console.error("Erreur lors de l'enregistrement :", responseData);
        alert("Une erreur est survenue lors de l'enregistrement.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Erreur réseau :", error);
      alert("Impossible de communiquer avec le serveur.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 6,
          mt: 12,
          backgroundColor: "#cbd5e1", // blue-gray-500
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: "#334155" }} // blue-gray-800
        >
          Consultation Patient
        </Typography>

        <TextField
          select
          fullWidth
          label="Sélectionner un patient"
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          margin="normal"
          variant="outlined"
        >
          {patients.map((patient) => (
            <MenuItem key={patient.id} value={patient.id}>
              {patient.prenoms} {patient.nom}
            </MenuItem>
          ))}
        </TextField>

        <DatePicker
          label="Date de la consultation"
          value={consultationDate}
          onChange={(newValue) => setConsultationDate(newValue)}
          renderInput={(params) => (
            <TextField fullWidth margin="normal" variant="outlined" {...params} />
          )}
        />

        <TextField
          label="Symptômes"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          multiline
          rows={3}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Typography
          variant="h6"
          gutterBottom
          sx={{ mt: 2, color: "#334155" }} // blue-gray-800
        >
          Constantes Vitales
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Température (°C)"
              name="temperature"
              value={constants.temperature}
              onChange={handleConstantsChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Tension (mmHg)"
              name="bloodPressure"
              value={constants.bloodPressure}
              onChange={handleConstantsChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Pouls (bpm)"
              name="pulse"
              value={constants.pulse}
              onChange={handleConstantsChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={resetForm}
              sx={{ color: "#334155", borderColor: "#334155" }} // blue-gray-800
            >
              Annuler
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              sx={{ backgroundColor: "#334155", "&:hover": { backgroundColor: "#1e293b" } }} // blue-gray-800
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default ConsultationForm;
