import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const AppointmentForm = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        if (doctorId) {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/patients/?doctorId=${doctorId}`
          );
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

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleSubmit = async () => {
    const formattedDate = selectedDate
      ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${selectedDate
          .getDate()
          .toString()
          .padStart(2, "0")}`
      : null;

    const formattedTime = selectedTime
      ? selectedTime.toISOString().split("T")[1].split(".")[0]
      : null;

    const appointmentData = {
      patient: selectedPatient,
      date: formattedDate,
      time: formattedTime,
      instructions: instructions,
      created_by: localStorage.getItem("doctorId"),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/rdvs/create/",
        appointmentData
      );

      if (response.status === 201) {
        console.log("Rendez-vous créé avec succès");
        setSelectedPatient("");
        setSelectedDate(null);
        setSelectedTime(null);
        setInstructions("");
      } else {
        console.error("Erreur lors de l'enregistrement du rendez-vous:", response);
      }
    } catch (error) {
      console.error("Erreur réseau lors de l'enregistrement du rendez-vous:", error);
    }
  };

  if (loading) {
    return <div>Loading patients...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 4,
          mt: 14,
          backgroundColor: "#1e293b", // bluegray-800 (fond foncé)
          color: "#e2e8f0", // bluegray-100 (texte clair)
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ color: "#e2e8f0", fontWeight: "800" }} // Texte clair pour le titre
        >
          Prendre un rendez-vous
        </Typography>

        <TextField
          select
          fullWidth
          label="Sélectionner un patient"
          value={selectedPatient}
          onChange={handlePatientChange}
          margin="normal"
          variant="outlined"
          sx={{
            backgroundColor: "#FFF",
            color: "#e2e8f0",
            borderColor: "#94a3b8",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#94a3b8",
              },
              "&:hover fieldset": {
                borderColor: "#64748b",
              },
            },
          }}
        >
          {patients.map((patient) => (
            <MenuItem key={patient.id} value={patient.id}>
              {patient.prenom} {patient.nom}
            </MenuItem>
          ))}
        </TextField>

        <DatePicker
          label="Sélectionner une date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => (
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                backgroundColor: "#FFF",
                color: "#FFF",
                borderColor: "#94a3b8",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#94a3b8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#64748b",
                  },
                },
              }}
              {...params}
            />
          )}
        />

        <TimePicker
          label="Sélectionner une heure"
          value={selectedTime}
          onChange={(newValue) => setSelectedTime(newValue)}
          renderInput={(params) => (
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                backgroundColor: "#FFF",
                color: "#FFF",
                borderColor: "#94a3b8",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#94a3b8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#64748b",
                  },
                },
              }}
              {...params}
            />
          )}
        />

        <TextField
          fullWidth
          label="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
          sx={{
            backgroundColor: "#FFF",
            color: "#e2e8f0",
            borderColor: "#94a3b8",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#94a3b8",
              },
              "&:hover fieldset": {
                borderColor: "#64748b",
              },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 3,
            backgroundColor: "#64748b",
            "&:hover": {
              backgroundColor: "#94a3b8",
            },
          }}
        >
          Envoyer
        </Button>
      </Paper>
    </LocalizationProvider>
  );
};

export default AppointmentForm;
