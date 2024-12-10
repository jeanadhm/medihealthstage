import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography, Box } from '@mui/material';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fonction pour récupérer les rendez-vous du docteur connecté
  const fetchAppointments = async () => {
    try {
      const doctorId = localStorage.getItem('doctorId'); // Récupérer l'ID du docteur depuis le localStorage
      if (!doctorId) {
        console.error('Doctor ID is missing.');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/rdvs/?doctorId=${doctorId}`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/rdvs/${id}/status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        console.log('Statut mis à jour avec succès');
        fetchAppointments(); // Recharger les rendez-vous après mise à jour
      } else {
        console.error('Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la mise à jour du statut:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#607D8B'; // bluegray-500
      case 'attended':
        return '#37474F'; // bluegray-800
      case 'missed':
        return '#FF5252'; // Une couleur rouge pour contraster
      default:
        return '#B0BEC5'; // Gris clair pour les statuts inconnus
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 5, backgroundColor: '#ECEFF1' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#37474F' }}>
        Liste des rendez-vous
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Patient</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Heure</strong></TableCell>
            <TableCell><strong>Statut</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patient_name}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Box
                  component="span"
                  sx={{
                    color: getStatusColor(appointment.status),
                    fontWeight: 'bold',
                  }}
                >
                  {appointment.status === 'pending' && 'En attente'}
                  {appointment.status === 'attended' && 'Le patient est venu'}
                  {appointment.status === 'missed' && 'Le patient n\'est pas venu'}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#37474F',
                      color: '#FFFFFF',
                      '&:hover': { backgroundColor: '#263238' },
                    }}
                    onClick={() => handleStatusChange(appointment.id, 'attended')}
                  >
                    Venu
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#607D8B',
                      color: '#FFFFFF',
                      '&:hover': { backgroundColor: '#455A64' },
                    }}
                    onClick={() => handleStatusChange(appointment.id, 'missed')}
                  >
                    Non venu
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default AppointmentList;
