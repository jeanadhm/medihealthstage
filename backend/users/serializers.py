# users/serializers.py
from rest_framework import serializers
from .models import Patient, Doctor, RendezVous,Appointment, Rdv, Consultation
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

class PatientSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = ['id', 'nom', 'prenom', 'full_name', 'email', 'dateNaissance', 'adresse', 'numeroTelephone']

    def get_full_name(self, obj):
        return f"{obj.nom} {obj.prenom}"

    def create(self, validated_data):
        # Hacher le mot de passe avant de créer l'objet Patient
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)



class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'  # Ou spécifiez explicitement les champs à inclure

    def create(self, validated_data):
        # Hacher le mot de passe avant la création
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)

class PatientLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError("Email et mot de passe sont obligatoires.")

        try:
            # Récupérer le patient via l'email
            patient = Patient.objects.get(email=email)
        except Patient.DoesNotExist:
            raise serializers.ValidationError("Aucun utilisateur avec cet email.")

        # Vérifier le mot de passe
        if not check_password(password, patient.password):
            raise serializers.ValidationError("Mot de passe incorrect.")

        # Ajouter le patient à validated_data
        data['patient'] = patient
        return data


class DoctorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class RendezVousSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Utilise l'ID du patient

    class Meta:
        model = RendezVous
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'date', 'time', 'instructions']

class CreateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['patient', 'date', 'time', 'instructions']


class RdvSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Rdv
        fields = ['id', 'patient_name', 'date', 'time', 'instructions', 'status']

    def get_patient_name(self, obj):
        return f"{obj.patient.prenom} {obj.patient.nom}"  # Remplacez par les champs réels du modèle Patient

class ConsultationSerializer(serializers.ModelSerializer):
    patient_full_name = serializers.ReadOnlyField(source="patient.full_name")

    class Meta:
        model = Consultation
        fields = ['id', 'patient', 'patient_full_name', 'date', 'symptoms', 'temperature', 'blood_pressure', 'pulse']

