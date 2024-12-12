import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';

function MyResults() {
  const [analyses, setAnalyses] = useState({
    common_analyses: [],
    cholesterol_analyses: [],
    ist_analyses: [],
    diabetes_analyses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchAnalyses = async () => {
      const patientId = localStorage.getItem('patientId');
      const accessToken = localStorage.getItem('accessToken');

      if (!patientId || !accessToken) {
        setError('Erreur : patient ou token non identifié.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/analyses/all/${patientId}/type/patient/`, {
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
          throw new Error('Impossible de charger vos analyses.');
        }

        const data = await response.json();
        setAnalyses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const renderAnalyses = (title, analysisList) => (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" sx={{ color: '#cbd5e1', marginBottom: 1 }}>
        {title}
      </Typography>
      {analysisList.length === 0 ? (
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
          Aucune analyse disponible.
        </Typography>
      ) : (
        <List>
          {analysisList.map((analysis, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: '1px solid #64748b',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <ListItemText
                primary={`Type : ${analysis.type || 'Non spécifié'}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                      Date : {analysis.date || 'Non spécifiée'}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ display: 'block', color: '#94a3b8' }}>
                      Résultat : {analysis.result || 'Non disponible'}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4, mt: 10 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: '#1e293b',
          color: '#cbd5e1',
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 2, color: '#cbd5e1' }}>
          Mes Analyses
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

        {!loading && !error && (
          <>
            {renderAnalyses('Analyses Générales', analyses.common_analyses)}
            {renderAnalyses('Analyses Cholestérol', analyses.cholesterol_analyses)}
            {renderAnalyses('Analyses IST', analyses.ist_analyses)}
            {renderAnalyses('Analyses Diabète', analyses.diabetes_analyses)}
          </>
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

export default MyResults;
