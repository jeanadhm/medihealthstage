import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, CircularProgress, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Button } from '@mui/material';

function AllAnalyses() {
  const [analyses, setAnalyses] = useState(null);
  const [filteredAnalyses, setFilteredAnalyses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null); // To track which row is expanded

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/analyses/all/');
        setAnalyses(response.data);
        setFilteredAnalyses(response.data); // Initialisation de filteredAnalyses
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterAnalyses = () => {
    if (searchTerm) {
      const filteredData = {
        common_analyses: analyses.common_analyses.filter(analysis =>
          (analysis.patient_nom ? analysis.patient_nom.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
          (analysis.patient_prenom ? analysis.patient_prenom.toLowerCase() : '').includes(searchTerm.toLowerCase())
        ),
        cholesterol_analyses: analyses.cholesterol_analyses.filter(analysis =>
          (analysis.patient_nom ? analysis.patient_nom.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
          (analysis.patient_prenom ? analysis.patient_prenom.toLowerCase() : '').includes(searchTerm.toLowerCase())
        ),
        ist_analyses: analyses.ist_analyses.filter(analysis =>
          (analysis.patient_nom ? analysis.patient_nom.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
          (analysis.patient_prenom ? analysis.patient_prenom.toLowerCase() : '').includes(searchTerm.toLowerCase())
        ),
        diabetes_analyses: analyses.diabetes_analyses.filter(analysis =>
          (analysis.patient_nom ? analysis.patient_nom.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
          (analysis.patient_prenom ? analysis.patient_prenom.toLowerCase() : '').includes(searchTerm.toLowerCase())
        ),
      };
      setFilteredAnalyses(filteredData);
    } else {
      setFilteredAnalyses(analyses); // Réinitialiser au cas où la recherche est vide
    }
  };

  useEffect(() => {
    filterAnalyses(); // Refiltrer chaque fois que le terme de recherche change
  }, [searchTerm]);

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id); // Toggle the expanded row
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erreur de chargement des données</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Analyses Médicales
      </Typography>

      {/* Champ de recherche */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Rechercher par patient (Nom ou Prénom)"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>

      {/* Affichage des tableaux pour chaque type d'analyse */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        
        {/* Tableau des Analyses Communes */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses Communes
          </Typography>
          {filteredAnalyses?.common_analyses.length ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type d'Analyse</TableCell>
                    <TableCell>Nom du Patient</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAnalyses.common_analyses.map((analysis) => (
                    <React.Fragment key={analysis.id}>
                      <TableRow
                        hover
                        onClick={() => handleRowClick(analysis.id)} // Trigger expand on row click
                      >
                        <TableCell>{analysis.date}</TableCell>
                        <TableCell>Analyse Commune</TableCell>
                        <TableCell>{analysis.patient_nom} {analysis.patient_prenom}</TableCell>
                      </TableRow>

                      {/* Détails affichés lors du clic sur la ligne */}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                          <Collapse in={expandedRow === analysis.id} timeout="auto" unmountOnExit>
                            <Box sx={{ padding: 2 }}>
                              <Typography variant="h6">Détails de l'Analyse Commune</Typography>
                              <Typography>Red Blood Cells: {analysis.red_blood_cells}</Typography>
                              <Typography>White Blood Cells: {analysis.white_blood_cells}</Typography>
                              <Typography>Platelets: {analysis.platelets}</Typography>
                              <Typography>Hemoglobin: {analysis.hemoglobin}</Typography>
                              <Typography>Hematocrit: {analysis.hematocrit}</Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>Aucune analyse commune trouvée.</Typography>
          )}
        </Grid>

        {/* Tableau des Analyses Cholestérol */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses Cholestérol
          </Typography>
          {filteredAnalyses?.cholesterol_analyses.length ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type d'Analyse</TableCell>
                    <TableCell>Nom du Patient</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAnalyses.cholesterol_analyses.map((analysis) => (
                    <React.Fragment key={analysis.id}>
                      <TableRow
                        hover
                        onClick={() => handleRowClick(analysis.id)} // Trigger expand on row click
                      >
                        <TableCell>{analysis.date}</TableCell>
                        <TableCell>Analyse Cholestérol</TableCell>
                        <TableCell>{analysis.patient_nom} {analysis.patient_prenom}</TableCell>
                      </TableRow>

                      {/* Détails affichés lors du clic sur la ligne */}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                          <Collapse in={expandedRow === analysis.id} timeout="auto" unmountOnExit>
                            <Box sx={{ padding: 2 }}>
                              <Typography variant="h6">Détails de l'Analyse Cholestérol</Typography>
                              <Typography>Total Cholesterol: {analysis.chol_total}</Typography>
                              <Typography>HDL: {analysis.chol_hdl}</Typography>
                              <Typography>LDL: {analysis.chol_ldl}</Typography>
                              <Typography>Triglycerides: {analysis.chol_triglycerides}</Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>Aucune analyse cholestérol trouvée.</Typography>
          )}
        </Grid>

        {/* Tableau des Analyses IST */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses IST
          </Typography>
          {filteredAnalyses?.ist_analyses.length ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type d'Analyse</TableCell>
                    <TableCell>Nom du Patient</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAnalyses.ist_analyses.map((analysis) => (
                    <React.Fragment key={analysis.id}>
                      <TableRow
                        hover
                        onClick={() => handleRowClick(analysis.id)} // Trigger expand on row click
                      >
                        <TableCell>{analysis.date}</TableCell>
                        <TableCell>Analyse IST</TableCell>
                        <TableCell>{analysis.patient_nom} {analysis.patient_prenom}</TableCell>
                      </TableRow>

                      {/* Détails affichés lors du clic sur la ligne */}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                          <Collapse in={expandedRow === analysis.id} timeout="auto" unmountOnExit>
                            <Box sx={{ padding: 2 }}>
                              <Typography variant="h6">Détails de l'Analyse IST</Typography>
                              <Typography>HIV Test: {analysis.hiv_test}</Typography>
                              <Typography>Syphilis Test: {analysis.syphilis_test}</Typography>
                              <Typography>Chlamydia Test: {analysis.chlamydia_test}</Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>Aucune analyse IST trouvée.</Typography>
          )}
        </Grid>

        {/* Tableau des Analyses Diabète */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Analyses Diabète
          </Typography>
          {filteredAnalyses?.diabetes_analyses.length ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type d'Analyse</TableCell>
                    <TableCell>Nom du Patient</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAnalyses.diabetes_analyses.map((analysis) => (
                    <React.Fragment key={analysis.id}>
                      <TableRow
                        hover
                        onClick={() => handleRowClick(analysis.id)} // Trigger expand on row click
                      >
                        <TableCell>{analysis.date}</TableCell>
                        <TableCell>Analyse Diabète</TableCell>
                        <TableCell>{analysis.patient_nom} {analysis.patient_prenom}</TableCell>
                      </TableRow>

                      {/* Détails affichés lors du clic sur la ligne */}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                          <Collapse in={expandedRow === analysis.id} timeout="auto" unmountOnExit>
                            <Box sx={{ padding: 2 }}>
                              <Typography variant="h6">Détails de l'Analyse Diabète</Typography>
                              <Typography>Glycémie: {analysis.glycemia}</Typography>
                              <Typography>Insulin: {analysis.insulin}</Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>Aucune analyse diabète trouvée.</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllAnalyses;
