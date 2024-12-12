import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, CircularProgress, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse } from '@mui/material';

function AllAnalyses() {
  const [analyses, setAnalyses] = useState(null);
  const [filteredAnalyses, setFilteredAnalyses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  const doctorId = localStorage.getItem('doctorId');

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/analyses/all/${doctorId}/type/doctor`);
        setAnalyses(response.data);
        setFilteredAnalyses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur de chargement des données");
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [doctorId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterAnalyses = () => {
    if (searchTerm) {
      const filteredData = {
        common_analyses: analyses.common_analyses.filter((analysis) =>
          analysis.patient_nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          analysis.patient_prenoms?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        cholesterol_analyses: analyses.cholesterol_analyses.filter((analysis) =>
          analysis.patient_nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          analysis.patient_prenoms?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        ist_analyses: analyses.ist_analyses.filter((analysis) =>
          analysis.patient_nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          analysis.patient_prenoms?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        diabetes_analyses: analyses.diabetes_analyses.filter((analysis) =>
          analysis.patient_nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          analysis.patient_prenoms?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      };
      setFilteredAnalyses(filteredData);
    } else {
      setFilteredAnalyses(analyses);
    }
  };

  useEffect(() => {
    filterAnalyses();
  }, [searchTerm]);

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 2, mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Analyses Médicales
      </Typography>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} sm={10} md={8}>
          <TextField
            label="Rechercher par patient (Nom ou Prénom)"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {Object.entries(filteredAnalyses || {}).map(([key, analysesList]) => (
          <Grid item xs={12} key={key}>
            <Typography variant="h6" gutterBottom>
              {key.replace("_", " ").toUpperCase()}
            </Typography>
            {analysesList.length ? (
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
                    {analysesList.map((item) => (
                      <React.Fragment key={item.id}>
                        <TableRow hover onClick={() => handleRowClick(item.id)}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{key.replace("_", " ")}</TableCell>
                          <TableCell>
                            {item.patient_nom} {item.patient_prenoms}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                            <Collapse in={expandedRow === item.id} timeout="auto" unmountOnExit>
                              <Box sx={{ padding: 2 }}>
                                <Typography variant="h6">Détails</Typography>
                                {Object.entries(item).map(([detailKey, detailValue]) => (
                                  <Typography key={detailKey}>
                                    {detailKey}: {detailValue}
                                  </Typography>
                                ))}
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
              <Typography>Aucune analyse trouvée.</Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AllAnalyses;
