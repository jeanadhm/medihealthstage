import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

function AppointmentForm() {
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

  const handleSubmit = async () => {
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : null; // YYYY-MM-DD
    const formattedTime = selectedTime ? selectedTime.toISOString().split('T')[1].split('.')[0] : null; // HH:MM:SS
  
    const appointmentData = {
      patientId: selectedPatient,
      date: formattedDate,
      time: formattedTime,
      instructions: instructions,
    };
  
    console.log('Données du rendez-vous à envoyer:', appointmentData);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/api/rdv/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      const responseData = await response.json();
      console.log('Réponse de l\'API:', responseData);
      if (response.ok) {
        console.log('Rendez-vous enregistré avec succès');
        // Vider les champs
        setSelectedPatient('');
        setSelectedDate(null);
        setSelectedTime(null);
        setInstructions('');
      } else {
        console.error('Erreur lors de l\'enregistrement du rendez-vous:', responseData);
      }
    } catch (error) {
      console.error('Erreur réseau lors de l\'enregistrement du rendez-vous:', error);
    }
  };
  
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
<br/>
<br/>

      <Paper elevation={3} sx={{ maxWidth: 500, margin: 'auto', padding: 4, mt: 5 }}>
        <Typography variant="h6" gutterBottom align="center">
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

export default AppointmentForm;
