import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Paper, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

function PatientRdv() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [instructions, setInstructions] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  // Charger la liste des docteurs au montage du composant
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/doctors/');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des docteurs.');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Erreur lors du chargement des docteurs:', error);
        setNotification({ open: true, message: 'Impossible de charger les docteurs.', severity: 'error' });
      }
    };

    fetchDoctors();
  }, []);

  // Fonction pour obtenir un nouvel access token en utilisant le refresh token
  const getAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token manquant.');
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Impossible de rafraîchir le token.');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      return data.access;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setNotification({ open: true, message: 'Tous les champs sont obligatoires.', severity: 'warning' });
      return;
    }

    const patientId = localStorage.getItem('patientId');
    let accessToken = localStorage.getItem('accessToken');

    if (!patientId || !accessToken) {
      setNotification({ open: true, message: 'Erreur : patient ou token non identifié.', severity: 'error' });
      return;
    }

    const appointmentData = {
      doctor: parseInt(selectedDoctor, 10),
      patient: parseInt(patientId, 10),
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime.toISOString().split('T')[1].slice(0, 5),
      instructions: instructions,
    };

    try {
      let response = await fetch('http://127.0.0.1:8000/api/demandes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.status === 401) {
        // Le token a expiré, essayez de le rafraîchir
        accessToken = await getAccessToken();

        // Réessayez la requête avec le nouveau token
        response = await fetch('http://127.0.0.1:8000/api/demandes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(appointmentData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de l\'envoi de la demande.');
      }

      setNotification({ open: true, message: 'Demande envoyée avec succès.', severity: 'success' });
      setSelectedDoctor('');
      setSelectedDate(null);
      setSelectedTime(null);
      setInstructions('');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setNotification({ open: true, message: error.message || 'Échec de l\'envoi de la demande.', severity: 'error' });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 500, margin: 'auto', padding: 4, mt: 15 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h6" gutterBottom align="center">
            Prendre un rendez-vous chez le docteur
          </Typography>

          {/* Liste déroulante des docteurs */}
          <TextField
            select
            fullWidth
            label="Sélectionner un docteur"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            margin="normal"
            variant="outlined"
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.prenoms} {doctor.nom}
              </MenuItem>
            ))}
          </TextField>

          {/* Sélection de la date */}
          <DatePicker
            label="Sélectionner une date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField fullWidth margin="normal" variant="outlined" {...params} />}
          />

          {/* Sélection de l'heure */}
          <TimePicker
            label="Sélectionner une heure"
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
            renderInput={(params) => <TextField fullWidth margin="normal" variant="outlined" {...params} />}
          />

          {/* Instructions */}
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

          {/* Bouton de soumission */}
          <Button variant="contained" color="#2f4858" fullWidth onClick={handleSubmit} sx={{ mt: 3 }}>
            Envoyer
          </Button>
        </Paper>

        {/* Notifications */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert
            onClose={() => setNotification({ ...notification, open: false })}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}

export default PatientRdv;
