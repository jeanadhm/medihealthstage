import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';

function MyRdvs() {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchRdvs = async () => {
      const patientId = localStorage.getItem('patientId');
      const accessToken = localStorage.getItem('accessToken');

      if (!patientId || !accessToken) {
        setError('Erreur : patient ou token non identifié.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/rdvs/patient/all?patientId=${patientId}`, {
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
          throw new Error('Impossible de charger vos rendez-vous.');
        }

        const data = await response.json();
        setRdvs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRdvs();
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
          Mes Rendez-vous
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

        {!loading && !error && rdvs.length === 0 && (
          <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
            Aucun rendez-vous pour le moment.
          </Typography>
        )}

        {!loading && !error && rdvs.length > 0 && (
          <List>
            {rdvs.map((rdv) => (
              <ListItem
                key={rdv.id}
                sx={{
                  borderBottom: '1px solid #64748b', // Ligne de séparation bluegray-500
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <ListItemText
                  primary={`Docteur : ${rdv.doctor_name}`}  
                  secondary={
                    <>
                      <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                        Date : {rdv.date}
                      </Typography>
                      <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                        Heure : {rdv.time}
                      </Typography>
                      <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                        Statut : {rdv.status}
                      </Typography>
                      {rdv.instructions && (
                        <Typography component="span" variant="body2" sx={{ display: 'block', color: '#cbd5e1' }}>
                          Instructions : {rdv.instructions}
                        </Typography>
                      )}
                    </>
                  }
                />
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

export default MyRdvs;
