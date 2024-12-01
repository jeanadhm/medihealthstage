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

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/patients/')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patients!', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/analyses/save_analysis/', formData)
      .then(response => {
        setSuccessMessage(response.data.message);
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
        console.error(error);
      });
  };

  const styles = {
    form: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      margin: '100px auto',
      fontFamily: 'Arial, sans-serif'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    checkbox: {
      marginRight: '10px'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    successMessage: {
      color: 'green',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '20px 0'
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
      <label style={styles.label}>
        Patient:
        <select name="patient" value={formData.patient} onChange={handleChange} style={styles.input}>
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.nom} {patient.prenom}
            </option>
          ))}
        </select>
      </label>
      <label style={styles.label}>
        Type analyse:
        <select name="analysisType" value={formData.analysisType} onChange={handleChange} style={styles.input}>
          <option value="">Select</option>
          <option value="common">Courant</option>
          <option value="cholesterol">Cholesterol</option>
          <option value="ist">IST</option>
          <option value="diabetes">Diabetes</option>
        </select>
      </label>
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
            Hemoglobines:
            <input type="number" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Hematocrites:
            <input type="number" name="hematocrit" value={formData.hematocrit} onChange={handleChange} style={styles.input} />
          </label>
        </>
      )}
      {formData.analysisType === 'cholesterol' && (
        <>
          <label style={styles.label}>
            Total Cholesterol:
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
            Triglycerides:
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
        Result Positive:
        <input type="checkbox" name="result_positive" checked={formData.result_positive} onChange={(e) => setFormData({ ...formData, result_positive: e.target.checked })} style={styles.checkbox} />
      </label>
      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

export default AnalysisForm;
