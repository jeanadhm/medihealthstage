import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';

function AllAnalyses() {
  const [analyses, setAnalyses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/analyses/analyses/all/');
        setAnalyses(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erreur de chargement des données</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Analyse Médicales
      </Typography>

      <Grid container spacing={3}>
        {/* Common Analyses */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses Communes
          </Typography>
          {analyses.common_analyses.length ? (
            analyses.common_analyses.map((analysis) => (
              <Card key={analysis.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">Date: {analysis.date}</Typography>
                  <Typography>Red Blood Cells: {analysis.red_blood_cells}</Typography>
                  <Typography>White Blood Cells: {analysis.white_blood_cells}</Typography>
                  <Typography>Platelets: {analysis.platelets}</Typography>
                  <Typography>Hemoglobin: {analysis.hemoglobin}</Typography>
                  <Typography>Hematocrit: {analysis.hematocrit}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Aucune analyse commune trouvée.</Typography>
          )}
        </Grid>

        {/* Cholesterol Analyses */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses Cholestérol
          </Typography>
          {analyses.cholesterol_analyses.length ? (
            analyses.cholesterol_analyses.map((analysis) => (
              <Card key={analysis.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">Date: {analysis.date}</Typography>
                  <Typography>Total Cholesterol: {analysis.chol_total}</Typography>
                  <Typography>HDL: {analysis.chol_hdl}</Typography>
                  <Typography>LDL: {analysis.chol_ldl}</Typography>
                  <Typography>Triglycerides: {analysis.chol_triglycerides}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Aucune analyse cholestérol trouvée.</Typography>
          )}
        </Grid>

        {/* IST Analyses */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses IST
          </Typography>
          {analyses.ist_analyses.length ? (
            analyses.ist_analyses.map((analysis) => (
              <Card key={analysis.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">Date: {analysis.date}</Typography>
                  <Typography>VIH: {analysis.ist_vih}</Typography>
                  <Typography>Syphilis: {analysis.ist_syphilis}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Aucune analyse IST trouvée.</Typography>
          )}
        </Grid>

        {/* Diabetes Analyses */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses Diabète
          </Typography>
          {analyses.diabetes_analyses.length ? (
            analyses.diabetes_analyses.map((analysis) => (
              <Card key={analysis.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">Date: {analysis.date}</Typography>
                  <Typography>Glucose: {analysis.diabete_glucose}</Typography>
                  <Typography>HbA1c: {analysis.diabete_hba1c}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Aucune analyse diabète trouvée.</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllAnalyses;
