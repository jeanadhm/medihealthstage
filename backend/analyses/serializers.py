from rest_framework import serializers
from .models import CommonAnalysis, CholesterolAnalysis, IstAnalysis, DiabetesAnalysis, DossierMedical, Consultation, Rdv
from users.models import Patient, Doctor
from django.db import models




class CommonAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient

    class Meta:
        model = CommonAnalysis
        fields = ['id', 'patient', 'date', 'red_blood_cells', 'white_blood_cells', 
                  'platelets', 'hemoglobin', 'hematocrit', 'patient_nom']

    def get_patient_nom(self, obj):
        """
        Récupère le nom complet du patient s'il existe, sinon retourne "N/A".
        """
        if obj.patient:
            return obj.patient.full_name
        return "N/A"


class CholesterolAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient

    class Meta:
        model = CholesterolAnalysis
        fields = ['id', 'patient', 'date', 'chol_total', 'chol_hdl', 'chol_ldl', 
                  'chol_triglycerides', 'result_positive', 'patient_nom']

    def get_patient_nom(self, obj):
        if obj.patient:
            return obj.patient.full_name
        return "N/A"


class IstAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient

    class Meta:
        model = IstAnalysis
        fields = ['id', 'patient', 'date', 'ist_vih', 'ist_syphilis', 'result_positive', 'patient_nom']

    def get_patient_nom(self, obj):
        if obj.patient:
            return obj.patient.full_name
        return "N/A"


class DiabetesAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient

    class Meta:
        model = DiabetesAnalysis
        fields = ['id', 'patient', 'date', 'diabete_glucose', 'diabete_hba1c', 
                  'result_positive', 'patient_nom']

    def get_patient_nom(self, obj):
        if obj.patient:
            return obj.patient.full_name
        return "N/A"


class DossierMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierMedical
        fields = ['id', 'patient', 'doctor', 'created_at', 'updated_at', 'common_analyses', 'cholesterol_analyses', 'ist_analyses', 'diabetes_analyses', 'consultations', 'rendezvous']
