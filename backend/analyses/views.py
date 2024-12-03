from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.http import require_POST
from django.conf import settings
from .models import CommonAnalysis, CholesterolAnalysis, IstAnalysis, DiabetesAnalysis, Dossier
from .serializers import CommonAnalysisSerializer, CholesterolAnalysisSerializer, IstAnalysisSerializer, DiabetesAnalysisSerializer
from users.models import Patient
# Vues pour les analyses courantes
class CommonAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = CommonAnalysis.objects.all()
    serializer_class = CommonAnalysisSerializer

class CommonAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CommonAnalysis.objects.all()
    serializer_class = CommonAnalysisSerializer

# Vues pour les analyses de cholestérol
class CholesterolAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = CholesterolAnalysis.objects.all()
    serializer_class = CholesterolAnalysisSerializer

class CholesterolAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CholesterolAnalysis.objects.all()
    serializer_class = CholesterolAnalysisSerializer

# Vues pour les analyses IST
class IstAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = IstAnalysis.objects.all()
    serializer_class = IstAnalysisSerializer

class IstAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = IstAnalysis.objects.all()
    serializer_class = IstAnalysisSerializer

# Vues pour les analyses de diabète
class DiabetesAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = DiabetesAnalysis.objects.all()
    serializer_class = DiabetesAnalysisSerializer

class DiabetesAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DiabetesAnalysis.objects.all()
    serializer_class = DiabetesAnalysisSerializer


def save_pdf(patient_name, analysis_data, analysis_type):
    directory = os.path.join(settings.MEDIA_ROOT, 'medical_records', patient_name)
    os.makedirs(directory, exist_ok=True)
    file_path = os.path.join(directory, f"{analysis_type}_{analysis_data['date']}.pdf")
    
    c = canvas.Canvas(file_path, pagesize=letter)
    c.drawString(100, 750, f"Patient: {patient_name}")
    c.drawString(100, 730, f"Date: {analysis_data['date']}")
    c.drawString(100, 710, f"Result Positive: {analysis_data.get('result_positive', 'N/A')}")
    
    if analysis_type == 'common':
        c.drawString(100, 690, f"Red Blood Cells: {analysis_data['red_blood_cells']}")
        c.drawString(100, 670, f"White Blood Cells: {analysis_data['white_blood_cells']}")
        c.drawString(100, 650, f"Platelets: {analysis_data['platelets']}")
        c.drawString(100, 630, f"Hemoglobin: {analysis_data['hemoglobin']}")
        c.drawString(100, 610, f"Hematocrit: {analysis_data['hematocrit']}")
    elif analysis_type == 'cholesterol':
        c.drawString(100, 690, f"Total Cholesterol: {analysis_data['chol_total']}")
        c.drawString(100, 670, f"HDL: {analysis_data['chol_hdl']}")
        c.drawString(100, 650, f"LDL: {analysis_data['chol_ldl']}")
        c.drawString(100, 630, f"Triglycerides: {analysis_data['chol_triglycerides']}")
    elif analysis_type == 'ist':
        c.drawString(100, 690, f"VIH: {analysis_data['ist_vih']}")
        c.drawString(100, 670, f"Syphilis: {analysis_data['ist_syphilis']}")
    elif analysis_type == 'diabetes':
        c.drawString(100, 690, f"Glucose: {analysis_data['diabete_glucose']}")
        c.drawString(100, 670, f"HbA1c: {analysis_data['diabete_hba1c']}")
    
    c.save()
    return file_path

@require_POST
def save_analysis(request):
    if request.method == 'POST':
        patient_id = request.POST.get('patient')
        analysis_type = request.POST.get('analysisType')
        analysis_data = request.POST.dict()
        patient = get_object_or_404(Patient, id=patient_id)
        patient_name = f"{patient.nom}_{patient.prenom}"
        
        file_path = save_pdf(patient_name, analysis_data, analysis_type)
        
        dossier = Dossier(patient=patient, nom_dossier=f"Dossier de {patient.nom} {patient.prenom}", pdf=file_path)
        dossier.save()
        
        return JsonResponse({"message": "Résultat entré avec succès", "file_path": file_path})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

    
class AllAnalysesListView(APIView):
    def get(self, request, *args, **kwargs):
        common_analyses = CommonAnalysis.objects.all()
        cholesterol_analyses = CholesterolAnalysis.objects.all()
        ist_analyses = IstAnalysis.objects.all()
        diabetes_analyses = DiabetesAnalysis.objects.all()

        common_serializer = CommonAnalysisSerializer(common_analyses, many=True)
        cholesterol_serializer = CholesterolAnalysisSerializer(cholesterol_analyses, many=True)
        ist_serializer = IstAnalysisSerializer(ist_analyses, many=True)
        diabetes_serializer = DiabetesAnalysisSerializer(diabetes_analyses, many=True)

        return Response({
            "common_analyses": common_serializer.data,
            "cholesterol_analyses": cholesterol_serializer.data,
            "ist_analyses": ist_serializer.data,
            "diabetes_analyses": diabetes_serializer.data,
        }) 