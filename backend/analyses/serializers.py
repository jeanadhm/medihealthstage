from rest_framework import serializers
from .models import CommonAnalysis, CholesterolAnalysis, IstAnalysis, DiabetesAnalysis


class CommonAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()

    class Meta:
        model = CommonAnalysis
        fields = ['id', 'date', 'red_blood_cells', 'white_blood_cells', 'platelets', 
                  'hemoglobin', 'hematocrit', 'patient_nom']

    def get_patient_nom(self, obj):
        """
        Récupère le nom complet du patient s'il existe, sinon retourne "N/A".
        """
        if obj.patient:
            return obj.patient.full_name  # Utilisation de la propriété full_name du patient
        return "N/A"


class CholesterolAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()

    class Meta:
        model = CholesterolAnalysis
        fields = ['id', 'date', 'chol_total', 'chol_hdl', 'chol_ldl', 
                  'chol_triglycerides', 'result_positive', 'patient_nom']

    def get_patient_nom(self, obj):
        """
        Récupère le nom complet du patient s'il existe, sinon retourne "N/A".
        """
        if obj.patient:
            return obj.patient.full_name  # Utilisation de la propriété full_name
        return "N/A"


class IstAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()

    class Meta:
        model = IstAnalysis
        fields = ['id', 'date', 'ist_vih', 'ist_syphilis', 'result_positive', 'patient_nom']

    def get_patient_nom(self, obj):
        """
        Récupère le nom complet du patient s'il existe, sinon retourne "N/A".
        """
        if obj.patient:
            return obj.patient.full_name  # Utilisation de la propriété full_name
        return "N/A"


class DiabetesAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()

    class Meta:
        model = DiabetesAnalysis
        fields = ['id', 'date', 'diabete_glucose', 'diabete_hba1c', 'result_positive', 'patient_nom']

    def get_patient_nom(self, obj):
        """
        Récupère le nom complet du patient s'il existe, sinon retourne "N/A".
        """
        if obj.patient:
            return obj.patient.full_name  # Utilisation de la propriété full_name
        return "N/A"
