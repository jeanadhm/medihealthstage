from rest_framework import serializers
from .models import CommonAnalysis, CholesterolAnalysis, IstAnalysis, DiabetesAnalysis, DossierMedical, Consultation, Rdv
from users.models import Patient, Doctor
from django.db import models




class CommonAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur connecté
    created_by = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur qui crée l'analyse

    class Meta:
        model = CommonAnalysis
        fields = ['id', 'patient', 'date', 'red_blood_cells', 'white_blood_cells', 
                  'platelets', 'hemoglobin', 'hematocrit', 'patient_nom', 'doctor', 'created_by']

    def create(self, validated_data):
        # Récupérer l'ID du docteur depuis le frontend (si envoyé)
        doctor_id = validated_data.get('doctor')
        created_by_id = validated_data.get('created_by')

        # Vérifier si ces champs existent dans les données
        if doctor_id is None:
            raise serializers.ValidationError("Doctor is required")
        
        if created_by_id is None:
            raise serializers.ValidationError("Created_by is required")

        # Créer l'instance CommonAnalysis avec les données validées
        common_analysis = CommonAnalysis.objects.create(**validated_data)
        return common_analysis

    def get_patient_nom(self, obj):
        return f"{obj.patient.nom} {obj.patient.prenoms}" if obj.patient else None


class CholesterolAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur connecté
    created_by = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur qui crée l'analyse

    class Meta:
        model = CholesterolAnalysis
        fields = ['id', 'patient', 'date', 'chol_total', 'chol_hdl', 'chol_ldl', 
                  'chol_triglycerides', 'result_positive', 'patient_nom', 'doctor', 'created_by']

    def create(self, validated_data):
        doctor_id = validated_data.get('doctor')
        created_by_id = validated_data.get('created_by')

        if doctor_id is None:
            raise serializers.ValidationError("Doctor is required")
        
        if created_by_id is None:
            raise serializers.ValidationError("Created_by is required")

        cholesterol_analysis = CholesterolAnalysis.objects.create(**validated_data)
        return cholesterol_analysis

    def get_patient_nom(self, obj):
        return f"{obj.patient.nom} {obj.patient.prenoms}" if obj.patient else None


class IstAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur connecté
    created_by = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur qui crée l'analyse

    class Meta:
        model = IstAnalysis
        fields = ['id', 'patient', 'date', 'ist_vih', 'ist_syphilis', 'result_positive', 'patient_nom', 'doctor', 'created_by']

    def create(self, validated_data):
        doctor_id = validated_data.get('doctor')
        created_by_id = validated_data.get('created_by')

        if doctor_id is None:
            raise serializers.ValidationError("Doctor is required")
        
        if created_by_id is None:
            raise serializers.ValidationError("Created_by is required")

        ist_analysis = IstAnalysis.objects.create(**validated_data)
        return ist_analysis

    def get_patient_nom(self, obj):
        return f"{obj.patient.nom} {obj.patient.prenoms}" if obj.patient else None


class DiabetesAnalysisSerializer(serializers.ModelSerializer):
    patient_nom = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Champ pour choisir le patient
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur connecté
    created_by = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), required=False)  # Docteur qui crée l'analyse

    class Meta:
        model = DiabetesAnalysis
        fields = ['id', 'patient', 'date', 'diabete_glucose', 'diabete_hba1c', 
                  'result_positive', 'patient_nom', 'doctor', 'created_by']

    def create(self, validated_data):
        doctor_id = validated_data.get('doctor')
        created_by_id = validated_data.get('created_by')

        if doctor_id is None:
            raise serializers.ValidationError("Doctor is required")
        
        if created_by_id is None:
            raise serializers.ValidationError("Created_by is required")

        diabetes_analysis = DiabetesAnalysis.objects.create(**validated_data)
        return diabetes_analysis

    def get_patient_nom(self, obj):
        return f"{obj.patient.nom} {obj.patient.prenoms}" if obj.patient else None


class DossierMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierMedical
        fields = ['id', 'patient', 'doctor', 'created_at', 'updated_at', 'common_analyses', 'cholesterol_analyses', 'ist_analyses', 'diabetes_analyses', 'consultations', 'rendezvous']
