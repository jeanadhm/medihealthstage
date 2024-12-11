import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, List, ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';

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

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4, mt: 10 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: '#1e293b', // bluegray-800
          color: '#cbd5e1', // bluegray-500
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 2, color: '#cbd5e1' }}>
          Demandes des Patients
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
          <List>
            {requests.map((request) => (
              <ListItem
                key={request.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottom: '1px solid #64748b', // Ligne de séparation bluegray-500
                  '&:last-child': { borderBottom: 'none' },
                  marginBottom: 2,
                }}
              >
                <ListItemText
                  primary={`Patient : ${request.patient_name}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                        Date : {request.date}
                      </Typography>
                      <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                        Heure : {request.time}
                      </Typography>
                      <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                        Statut : {request.status}
                      </Typography>
                      {request.instructions && (
                        <Typography component="span" variant="body2" sx={{ display: 'block', color: '#cbd5e1' }}>
                          Instructions : {request.instructions}
                        </Typography>
                      )}
                    </>
                  }
                />

                <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleStatusChange(request.id, 'Validé')}
                  >
                    Valider
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleStatusChange(request.id, 'Reporté')}
                  >
                    Reporter
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
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
