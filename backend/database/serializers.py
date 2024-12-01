from rest_framework import serializers
from .models import Doctor, Patient, DossierMedical, CholesterolAnalyse, DiabeteAnalyse, IstAnalyse, AnalyseCourant

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class DossierMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierMedical
        fields = '__all__'

class CholesterolAnalyseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CholesterolAnalyse
        fields = '__all__'

class DiabeteAnalyseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiabeteAnalyse
        fields = '__all__'

class IstAnalyseSerializer(serializers.ModelSerializer):
    class Meta:
        model = IstAnalyse
        fields = '__all__'

class AnalyseCourantSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyseCourant
        fields = '__all__'
