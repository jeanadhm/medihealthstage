from rest_framework import serializers
from .models import CommonAnalysis, CholesterolAnalysis, IstAnalysis, DiabetesAnalysis

class CommonAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonAnalysis
        fields = '__all__'

class CholesterolAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CholesterolAnalysis
        fields = '__all__'

class IstAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = IstAnalysis
        fields = '__all__'

class DiabetesAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiabetesAnalysis
        fields = '__all__'
