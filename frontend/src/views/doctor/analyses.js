import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalysisForm = () => {
  const [formData, setFormData] = useState({
    patient: '',
    red_blood_cells: '',
    white_blood_cells: '',
    platelets: '',
    hemoglobin: '',
    hematocrit: '',
    chol_total: '',
    chol_hdl: '',
    chol_ldl: '',
    chol_triglycerides: '',
    ist_vih: '',
    ist_syphilis: '',
    diabete_glucose: '',
    diabete_hba1c: '',
    date: '',
    result_positive: false,
    analysisType: ''
  });

  const [patients, setPatients] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const doctorId = parseInt(localStorage.getItem('doctorId'), 10);

// Vérifiez si la conversion a réussi
if (isNaN(doctorId)) {
  console.error('Doctor ID is not a valid number.');
} else {
  console.log('Doctor ID as integer:', doctorId);
}
        if (doctorId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/patients/?doctorId=${doctorId}`);
          setPatients(response.data);
        } else {
          setError("Doctor ID is missing.");
        }
      } catch (err) {
        setError(err.message || 'Failed to load patients.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Récupérer l'ID du docteur depuis localStorage et le convertir en entier
    const doctorId = parseInt(localStorage.getItem('doctorId'), 10);  // Conversion en entier
    const createdById = doctorId;  // L'ID de l'utilisateur créant l'analyse, supposé être le même que le docteur
  
    if (isNaN(doctorId)) {
      alert("Doctor ID is missing or invalid.");
      return;
    }
  
    const dataToSubmit = {
      ...formData,
      doctor: doctorId,  // Ajout de l'ID du docteur
      created_by: createdById  // Ajout de l'ID de l'utilisateur ayant créé l'analyse
    };
  
    console.log("Data being sent:", dataToSubmit);  // Ajout d'un log pour voir les données envoyées
  
    // Déterminer l'URL selon le type d'analyse
    let apiUrl = '';
    switch (formData.analysisType) {
      case 'common':
        apiUrl = 'http://127.0.0.1:8000/analyses/common/';
        break;
      case 'cholesterol':
        apiUrl = 'http://127.0.0.1:8000/analyses/cholesterol/';
        break;
      case 'ist':
        apiUrl = 'http://127.0.0.1:8000/analyses/ist/';
        break;
      case 'diabetes':
        apiUrl = 'http://127.0.0.1:8000/analyses/diabetes/';
        break;
      default:
        alert("Veuillez sélectionner un type d'analyse.");
        return;
    }
  
    // Envoyer les données au backend
    axios.post(apiUrl, dataToSubmit)
      .then(response => {
        setSuccessMessage(response.data.message || 'Analyse ajoutée avec succès !');
        setFormData({
          patient: '',
          red_blood_cells: '',
          white_blood_cells: '',
          platelets: '',
          hemoglobin: '',
          hematocrit: '',
          chol_total: '',
          chol_hdl: '',
          chol_ldl: '',
          chol_triglycerides: '',
          ist_vih: '',
          ist_syphilis: '',
          diabete_glucose: '',
          diabete_hba1c: '',
          date: '',
          result_positive: false,
          analysisType: ''
        });
      })
      .catch(error => {
        console.error('Erreur lors de la soumission du formulaire :', error);
      });
  };
  
  // Styles du formulaire
  const styles = {
    form: {
      backgroundColor: '#1e293b',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      color: '#f1f5f9',
      marginTop: '100px',
      height: 'auto',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    label: {
      display: 'block',
      marginBottom: '25px',
      fontWeight: '800',
      color: '#f1f5f9'
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      border: '1px solid #94a3b8',
      borderRadius: '4px',
      boxSizing: 'border-box',
      backgroundColor: '#FFF',
      color: 'black'
    },
    checkbox: {
      marginRight: '10px'
    },
    button: {
      backgroundColor: '#64748b',
      color: '#ffffff',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '800'
    },
    successMessage: {
      color: '#22c55e',
      fontWeight: '800',
      textAlign: 'center',
      margin: '20px 0'
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}
      <label style={styles.label}>
        Patient:
        <select name="patient" value={formData.patient} onChange={handleChange} style={styles.input}>
          <option value="">Sélectionner un patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.nom} {patient.prenom}
            </option>
          ))}
        </select>
      </label>
      <label style={styles.label}>
        Type d'analyse:
        <select name="analysisType" value={formData.analysisType} onChange={handleChange} style={styles.input}>
          <option value="">Sélectionner</option>
          <option value="common">Courant</option>
          <option value="cholesterol">Cholestérol</option>
          <option value="ist">IST</option>
          <option value="diabetes">Diabète</option>
        </select>
      </label>
      {/* Champs dynamiques basés sur le type d'analyse */}
      {formData.analysisType === 'common' && (
        <>
          <label style={styles.label}>
            Globules rouges:
            <input type="number" name="red_blood_cells" value={formData.red_blood_cells} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Globules blancs:
            <input type="number" name="white_blood_cells" value={formData.white_blood_cells} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Plaquettes:
            <input type="number" name="platelets" value={formData.platelets} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Hémoglobine:
            <input type="number" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Hématocrites:
            <input type="number" name="hematocrit" value={formData.hematocrit} onChange={handleChange} style={styles.input} />
          </label>
        </>
      )}
      {formData.analysisType === 'cholesterol' && (
        <>
          <label style={styles.label}>
            Cholestérol total:
            <input type="number" name="chol_total" value={formData.chol_total} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            HDL:
            <input type="number" name="chol_hdl" value={formData.chol_hdl} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            LDL:
            <input type="number" name="chol_ldl" value={formData.chol_ldl} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Triglycérides:
            <input type="number" name="chol_triglycerides" value={formData.chol_triglycerides} onChange={handleChange} style={styles.input} />
          </label>
        </>
      )}
      {formData.analysisType === 'ist' && (
        <>
          <label style={styles.label}>
            VIH:
            <input type="text" name="ist_vih" value={formData.ist_vih} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Syphilis:
            <input type="text" name="ist_syphilis" value={formData.ist_syphilis} onChange={handleChange} style={styles.input} />
          </label>
        </>
      )}
      {formData.analysisType === 'diabetes' && (
        <>
          <label style={styles.label}>
            Glucose:
            <input type="number" name="diabete_glucose" value={formData.diabete_glucose} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            HbA1c:
            <input type="number" name="diabete_hba1c" value={formData.diabete_hba1c} onChange={handleChange} style={styles.input} />
          </label>
        </>
      )}
      <label style={styles.label}>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} />
      </label>
      <label style={styles.label}>
        Résultat positif:
        <input type="checkbox" name="result_positive" checked={formData.result_positive} onChange={(e) => setFormData({ ...formData, result_positive: e.target.checked })} style={styles.checkbox} />
      </label>
      <button type="submit" style={styles.button}>Soumettre</button>
    </form>
  );
};

export default AnalysisForm;
