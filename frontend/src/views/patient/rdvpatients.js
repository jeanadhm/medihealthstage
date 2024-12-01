import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

function PatientRdv() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/patients/');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Erreur lors du chargement des patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleSubmit = () => {
    const appointmentData = {
      patientId: selectedPatient, // On utilise l'ID du patient ici
      date: selectedDate,
      time: selectedTime,
      instructions: instructions,
    };

    console.log('Données du rendez-vous:', appointmentData);
    // Tu peux envoyer ces données à ton backend via une requête POST
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
<br/>
<br/>

      <Paper elevation={3} sx={{ maxWidth: 500, margin: 'auto', padding: 4, mt: 5 }}>
        <Typography variant="h6" gutterBottom align="center">
          Prendre un rendez-vous chez le docteur
        </Typography>

        <TextField
          select
          fullWidth
          label="Sélectionner un docteur"
          value={selectedPatient}
          onChange={handlePatientChange}
          margin="normal"
          variant="outlined"
        >
          {patients.map((patient) => (
            <MenuItem 
              key={patient.id} 
              value={`${patient.prenom} ${patient.nom}`} // Affiche le nom complet dans la zone de sélection
            >
              {patient.prenom} {patient.nom}
            </MenuItem>
          ))}
        </TextField>
<br/>
<br/>
        <DatePicker
          label="Sélectionner une date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => <TextField fullWidth margin="normal" variant="outlined" {...params} />}
        />
<br/>
<br/>

        <TimePicker
          label="Sélectionner une heure"
          value={selectedTime}
          onChange={(newValue) => setSelectedTime(newValue)}
          renderInput={(params) => <TextField fullWidth margin="normal" variant="outlined" {...params} />}
        />
<br/>

        <TextField
          fullWidth
          label="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          Envoyer
        </Button>
      </Paper>
    </LocalizationProvider>
  );
}

export default PatientRdv;
