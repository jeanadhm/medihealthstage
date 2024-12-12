import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
} from "@mui/material";

const MedicalRecord = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "",
    details: "",
    date: "",
  });

  // Récupération des patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/patients/?doctorId=${doctorId}`
        );
        setPatients(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Récupérer les dossiers médicaux d'un patient
  const fetchMedicalRecords = async (patientId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/analyses/dossiermedical/list/${patientId}`
      );
      setMedicalRecords(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Sélectionner un patient
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    fetchMedicalRecords(patient.id);
  };

  // Gestion du formulaire d'ajout de dossier médical
  

  
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Dossiers Médicaux
      </Typography>

      {/* Liste des patients */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Patients
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.nom}</TableCell>
                  <TableCell>{patient.prenoms}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleSelectPatient(patient)}
                    >
                      Voir Dossier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Détails du dossier médical */}
      {selectedPatient && (
        <Box sx={{ marginY: 4 }}>
          <Typography variant="h5" gutterBottom>
            Dossier Médical de {selectedPatient.nom} {selectedPatient.prenoms}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Détails</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.details}</TableCell>
                    <TableCell>{record.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
        </Box>
      

      
        
      )}
    </Box>
  );
};

export default MedicalRecord;
