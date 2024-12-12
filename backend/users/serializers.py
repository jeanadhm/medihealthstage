# users/serializers.py
from rest_framework import serializers
from .models import Patient, Doctor, RendezVous,Appointment, Rdv, Consultation, CustomUser, Demandes, Message
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

class CustomUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField()
    class Meta:
        
        model = CustomUser
        fields = "__all__"
    read_only_fields = ['id','is_staff', 'is_active']
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = self.Meta.model(**validated_data)
        if password is not None : 
            user.set_password(password)
        user.save()
        return user
    

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        # Extraire les relations many-to-many si elles existent
        groups_data = validated_data.pop('groups', None)
        permissions_data = validated_data.pop('user_permissions', None)
        
        # Gestion du mot de passe
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)

        # Définir le mot de passe si fourni
        if password:
            user.set_password(password)
        user.save()

        # Gérer les groupes et permissions
        if groups_data:
            user.groups.set(groups_data)
        if permissions_data:
            user.user_permissions.set(permissions_data)

        return user

    

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

    def create(self, validated_data):
        groups_data = validated_data.pop('groups', None)
        permissions_data = validated_data.pop('user_permissions', None)
        password = validated_data.pop('password')
        
        # Création de l'utilisateur sans groupes ni permissions
        user = self.Meta.model(**validated_data)
        
        # Définir le mot de passe si fourni
        if password:
            user.set_password(password)
        user.save()
        
        # Ajouter les groupes si fournis
        if groups_data:
            user.groups.set(groups_data)
        
        # Ajouter les permissions utilisateur si fournies
        if permissions_data:
            user.user_permissions.set(permissions_data)
        
        return user


class RendezVousSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())  # Utilise l'ID du patient

    class Meta:
        model = RendezVous
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'date', 'time', 'instructions', 'patient_name']

    def get_patient_name(self, obj):
        return f"{obj.patient.prenoms} {obj.patient.nom}".strip()


class CreateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['patient_id', 'date', 'time', 'instructions']


class RdvSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())

    class Meta:
        model = Rdv
        fields = '__all__'

    def get_patient_name(self, obj):
        return f"{obj.patient.prenoms} {obj.patient.nom}"  # Remplacez par les champs réels du modèle Patient

class ConsultationSerializer(serializers.ModelSerializer):
    patient_full_name = serializers.ReadOnlyField(source="patient.full_name")

    class Meta:
        model = Consultation
        fields = '__all__'


class DemandesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demandes
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp', 'is_read']