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
from .models import CommonAnalysis, CholesterolAnalysis, IstAnalysis, DiabetesAnalysis, DossierMedical
from .serializers import CommonAnalysisSerializer, CholesterolAnalysisSerializer, IstAnalysisSerializer, DiabetesAnalysisSerializer, DossierMedicalSerializer
from users.models import Patient, Doctor, Rdv, Consultation
from rest_framework.decorators import api_view
from rest_framework import status
import logging
# Vues pour les analyses courantes
class CommonAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = CommonAnalysis.objects.all()
    serializer_class = CommonAnalysisSerializer

class CommonAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CommonAnalysis.objects.all()
    serializer_class = CommonAnalysisSerializer

    def get_object(self):
        doctor_id = self.request.query_params.get('doctorId')  # Obtenez l'ID du médecin depuis les paramètres de la requête
        obj = super().get_object()  # Récupère l'objet via la méthode standard

        # Vérifiez si le médecin est bien celui qui a créé l'analyse
        if doctor_id and obj.created_by_id != int(doctor_id):
            raise PermissionDenied("Vous n'êtes pas autorisé à voir cette analyse.")  # Erreur si le médecin n'est pas le bon

        return obj

# Vues pour les analyses de cholestérol
class CholesterolAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = CholesterolAnalysis.objects.all()
    serializer_class = CholesterolAnalysisSerializer

class CholesterolAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CholesterolAnalysis.objects.all()
    serializer_class = CholesterolAnalysisSerializer

    def get_object(self):
        doctor_id = self.request.query_params.get('doctorId')  # Obtenez l'ID du médecin depuis les paramètres de la requête
        obj = super().get_object()  # Récupère l'objet via la méthode standard

        # Vérifiez si le médecin est bien celui qui a créé l'analyse
        if doctor_id and obj.created_by_id != int(doctor_id):
            raise PermissionDenied("Vous n'êtes pas autorisé à voir cette analyse.")  # Erreur si le médecin n'est pas le bon

        return obj

# Vues pour les analyses IST
class IstAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = IstAnalysis.objects.all()
    serializer_class = IstAnalysisSerializer

class IstAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = IstAnalysis.objects.all()
    serializer_class = IstAnalysisSerializer

    def get_object(self):
        doctor_id = self.request.query_params.get('doctorId')  # Obtenez l'ID du médecin depuis les paramètres de la requête
        obj = super().get_object()  # Récupère l'objet via la méthode standard

        # Vérifiez si le médecin est bien celui qui a créé l'analyse
        if doctor_id and obj.created_by_id != int(doctor_id):
            raise PermissionDenied("Vous n'êtes pas autorisé à voir cette analyse.")  # Erreur si le médecin n'est pas le bon

        return obj

# Vues pour les analyses de diabète
class DiabetesAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = DiabetesAnalysis.objects.all()
    serializer_class = DiabetesAnalysisSerializer

class DiabetesAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DiabetesAnalysis.objects.all()
    serializer_class = DiabetesAnalysisSerializer

    def get_object(self):
        doctor_id = self.request.query_params.get('doctorId')  # Obtenez l'ID du médecin depuis les paramètres de la requête
        obj = super().get_object()  # Récupère l'objet via la méthode standard

        # Vérifiez si le médecin est bien celui qui a créé l'analyse
        if doctor_id and obj.created_by_id != int(doctor_id):
            raise PermissionDenied("Vous n'êtes pas autorisé à voir cette analyse.")  # Erreur si le médecin n'est pas le bon

        return obj


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
        
        dossier = DossierMedical(patient=patient, nom_dossier=f"Dossier de {patient.nom} {patient.prenoms}", pdf=file_path)
        dossier.save()
        
        return JsonResponse({"message": "Résultat entré avec succès", "file_path": file_path})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


logger = logging.getLogger(__name__)

class AllAnalysesListView(APIView):
    def get(self, request, *args, **kwargs):
        # Récupération de l'ID de l'utilisateur via kwargs
        user_id = kwargs.get('pk')
        user_type = kwargs.get('type')  # Correction

        logger.info(f"User ID: {user_id}, Type: {user_type}")

        # Vérifier si un user_id est fourni
        if not user_id or not user_type:
            logger.error("User ID or type is missing")
            return Response({"error": "User ID and type are required"}, status=status.HTTP_400_BAD_REQUEST)

        if user_type == "doctor":
            # Vérifier que le docteur existe
            try:
                doctor = Doctor.objects.get(id=user_id)
                logger.info(f"Doctor found: {doctor}")
            except Doctor.DoesNotExist:
                logger.error("Doctor not found")
                return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

            # Récupérer toutes les analyses associées au docteur
            analyses = {
                "common_analyses": CommonAnalysis.objects.filter(doctor=doctor),
                "cholesterol_analyses": CholesterolAnalysis.objects.filter(doctor=doctor),
                "ist_analyses": IstAnalysis.objects.filter(doctor=doctor),
                "diabetes_analyses": DiabetesAnalysis.objects.filter(doctor=doctor),
            }

        elif user_type == "patient":
            # Vérifier que le patient existe
            try:
                patient = Patient.objects.get(id=user_id)
                logger.info(f"Patient found: {patient}")
            except Patient.DoesNotExist:
                logger.error("Patient not found")
                return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

            # Récupérer toutes les analyses associées au patient
            analyses = {
                "common_analyses": CommonAnalysis.objects.filter(patient=patient),
                "cholesterol_analyses": CholesterolAnalysis.objects.filter(patient=patient),
                "ist_analyses": IstAnalysis.objects.filter(patient=patient),
                "diabetes_analyses": DiabetesAnalysis.objects.filter(patient=patient),
            }

        else:
            logger.error("Invalid user type")
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        # Sérialiser chaque type d'analyse
        serialized_data = {
            "common_analyses": CommonAnalysisSerializer(analyses["common_analyses"], many=True).data,
            "cholesterol_analyses": CholesterolAnalysisSerializer(analyses["cholesterol_analyses"], many=True).data,
            "ist_analyses": IstAnalysisSerializer(analyses["ist_analyses"], many=True).data,
            "diabetes_analyses": DiabetesAnalysisSerializer(analyses["diabetes_analyses"], many=True).data,
        }

        # Retourner la réponse sérialisée
        return Response(serialized_data, status=status.HTTP_200_OK)
    


class CreateOrUpdateDossierMedicalView(APIView):
    def post(self, request):
        doctor = request.user  # Docteur connecté
        patient_id = request.data.get('patient')  # ID du patient
        patient = Patient.objects.get(id=patient_id)

        # Créer ou récupérer un dossier médical
        dossier, created = DossierMedical.objects.get_or_create(patient=patient, doctor=doctor)

        # Ajouter des analyses au dossier médical
        common_analyses_data = request.data.get('common_analyses', [])
        cholesterol_analyses_data = request.data.get('cholesterol_analyses', [])
        ist_analyses_data = request.data.get('ist_analyses', [])
        diabetes_analyses_data = request.data.get('diabetes_analyses', [])

        for analysis_data in common_analyses_data:
            analysis = CommonAnalysis.objects.get(id=analysis_data)
            dossier.add_common_analysis(analysis)

        for analysis_data in cholesterol_analyses_data:
            analysis = CholesterolAnalysis.objects.get(id=analysis_data)
            dossier.add_cholesterol_analysis(analysis)

        for analysis_data in ist_analyses_data:
            analysis = IstAnalysis.objects.get(id=analysis_data)
            dossier.add_ist_analysis(analysis)

        for analysis_data in diabetes_analyses_data:
            analysis = DiabetesAnalysis.objects.get(id=analysis_data)
            dossier.add_diabetes_analysis(analysis)

        # Ajouter des rendez-vous et des consultations
        rendezvous_data = request.data.get('rendezvous', [])
        consultations_data = request.data.get('consultations', [])

        for rv_data in rendezvous_data:
            rendezvous = Rdv.objects.get(id=rv_data)
            dossier.add_rendezvous(rendezvous)

        for consultation_data in consultations_data:
            consultation = Consultation.objects.get(id=consultation_data)
            dossier.add_consultation(consultation)

        # Retourner le dossier médical
        serializer = DossierMedicalSerializer(dossier)
        return Response(serializer.data, status=200)

@api_view(['GET'])
def list_medical_records(request, pk):
    try:
        # Récupérer tous les dossiers médicaux liés au docteur spécifié
        medical_records = DossierMedical.objects.filter(doctor_id=pk).order_by('patient__nom', 'patient__prenoms')
        
        # Sérialisation des données
        serializer = DossierMedicalSerializer(medical_records, many=True)
        return Response(serializer.data)
    except Exception as e:
        # Retourner une erreur générique
        return Response({"error": str(e)}, status=400)
