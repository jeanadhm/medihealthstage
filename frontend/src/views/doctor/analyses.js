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
    analysisType: '',
  });

  const [patients, setPatients] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Récupérer les patients pour le médecin courant
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const doctorId = localStorage.getItem('doctorId');
        if (doctorId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/patients/?doctorId=${doctorId}`);
          setPatients(response.data);
        } else {
          setError("Doctor ID is missing.");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des patients.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorId = localStorage.getItem('doctorId');  // Récupération de l'ID du médecin
    if (!doctorId) {
      setError("Doctor ID is missing.");
      return;
    }

    // Ajout de created_by dans les données envoyées (en s'assurant que c'est un entier)
    const dataWithDoctorId = { 
      ...formData, 
      created_by: parseInt(doctorId), // Assurez-vous que c'est un entier
    };

    // Déterminer l'URL de l'API en fonction du type d'analyse
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

    try {
      // Soumettre les données à l'API
      const response = await axios.post(apiUrl, dataWithDoctorId);
      setSuccessMessage(response.data.message || 'Analyse ajoutée avec succès !');

      // Réinitialiser le formulaire après soumission
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
    } catch (error) {
      setError("Erreur lors de la soumission de l'analyse.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Affichage du message de succès */}
      {successMessage && <div>{successMessage}</div>}
      {/* Affichage du message d'erreur */}
      {error && <div>{error}</div>}

      {/* Champ patient */}
      <div>
        <label htmlFor="patient">Patient</label>
        <select
          id="patient"
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
      </div>

      {/* Autres champs d'analyse */}
      <div>
        <label htmlFor="red_blood_cells">Globules rouges</label>
        <input
          type="number"
          id="red_blood_cells"
          name="red_blood_cells"
          value={formData.red_blood_cells}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="white_blood_cells">Globules blancs</label>
        <input
          type="number"
          id="white_blood_cells"
          name="white_blood_cells"
          value={formData.white_blood_cells}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="platelets">Plaquettes</label>
        <input
          type="number"
          id="platelets"
          name="platelets"
          value={formData.platelets}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="hemoglobin">Hémoglobine</label>
        <input
          type="number"
          id="hemoglobin"
          name="hemoglobin"
          value={formData.hemoglobin}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="hematocrit">Hématocrite</label>
        <input
          type="number"
          id="hematocrit"
          name="hematocrit"
          value={formData.hematocrit}
          onChange={handleChange}
          required
        />
      </div>

      {/* Champs pour cholestérol et diabète */}
      <div>
        <label htmlFor="chol_total">Cholestérol Total</label>
        <input
          type="number"
          id="chol_total"
          name="chol_total"
          value={formData.chol_total}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="chol_hdl">Cholestérol HDL</label>
        <input
          type="number"
          id="chol_hdl"
          name="chol_hdl"
          value={formData.chol_hdl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="chol_ldl">Cholestérol LDL</label>
        <input
          type="number"
          id="chol_ldl"
          name="chol_ldl"
          value={formData.chol_ldl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="chol_triglycerides">Triglycérides</label>
        <input
          type="number"
          id="chol_triglycerides"
          name="chol_triglycerides"
          value={formData.chol_triglycerides}
          onChange={handleChange}
        />
      </div>

      {/* Type d'analyse */}
      <div>
        <label htmlFor="analysisType">Type d'analyse</label>
        <select
          id="analysisType"
          name="analysisType"
          value={formData.analysisType}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner le type d'analyse</option>
          <option value="common">Analyse Commune</option>
          <option value="cholesterol">Cholestérol</option>
          <option value="ist">IST</option>
          <option value="diabetes">Diabète</option>
        </select>
      </div>

      {/* Date de l'analyse */}
      <div>
        <label htmlFor="date">Date de l'analyse</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Résultat positif */}
      <div>
        <label htmlFor="result_positive">Résultat positif</label>
        <input
          type="checkbox"
          id="result_positive"
          name="result_positive"
          checked={formData.result_positive}
          onChange={() => setFormData({ ...formData, result_positive: !formData.result_positive })}
        />
      </div>

      {/* Soumettre le formulaire */}
      <button type="submit" disabled={loading}>
        {loading ? 'En cours...' : 'Soumettre'}
      </button>
    </form>
  );
};

export default AnalysisForm;
