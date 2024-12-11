import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

function DoctorRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(`http://127.0.0.1:8000/api/demandes/${id}/status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut.');
      }

      setNotification({ open: true, message: 'Statut mis à jour avec succès.', severity: 'success' });

      // Mettre à jour la liste localement
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (err) {
      setNotification({ open: true, message: err.message, severity: 'error' });
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const doctorId = localStorage.getItem('doctorId');
      const accessToken = localStorage.getItem('accessToken');

      if (!doctorId || !accessToken) {
        setError('Erreur : docteur ou token non identifié.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/rdvs/doctor/all?doctorId=${doctorId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          setError('Session expirée. Veuillez vous reconnecter.');
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error('Impossible de charger les demandes.');
        }

        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

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
    <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4, mt: 10 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: '#ECEFF1', // Fond clair
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: '#37474F' }}>
          Liste des demandes des patients
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress color="inherit" />
          </Box>
        )}

        {!loading && error && (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        )}

        {!loading && !error && requests.length === 0 && (
          <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
            Aucune demande pour le moment.
          </Typography>
        )}

        {!loading && !error && requests.length > 0 && (
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
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.patient_name}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.time}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        color: getStatusColor(request.status),
                        fontWeight: 'bold',
                      }}
                    >
                      {request.status === 'En attente' && 'En attente'}
                      {request.status === 'Validé' && 'Validé'}
                      {request.status === 'Reporté' && 'Reporté'}
                      
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
                        onClick={() => handleStatusChange(request.id, 'Validé')}
                      >
                        Valider
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#607D8B',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#455A64' },
                        }}
                        onClick={() => handleStatusChange(request.id, 'Reporté')}
                      >
                        Reporter
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
  );
}

export default DoctorRequests;
