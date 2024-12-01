from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.http import JsonResponse

from .models import Doctor, Patient, DossierMedical, CholesterolAnalyse, DiabeteAnalyse, IstAnalyse, AnalyseCourant
from .serializers import DoctorSerializer, PatientSerializer, DossierMedicalSerializer, CholesterolAnalyseSerializer, DiabeteAnalyseSerializer, IstAnalyseSerializer, AnalyseCourantSerializer

# Registration views
class RegisterDoctorView(generics.CreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        doctor_data = self.request.data
        doctor_data['password'] = make_password(doctor_data['password'])  # Hashing the password
        serializer.save(**doctor_data)

class RegisterPatientView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        patient_data = self.request.data
        patient_data['password'] = make_password(patient_data['password'])  # Hashing the password
        serializer.save(**patient_data)

# Listing views
@api_view(['GET'])
def list_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def list_patients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)

# Login views
class PatientLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user and user.is_active:
            # Successful login
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            # Failed login
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class DoctorLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user and user.is_active:
            # Successful login
            return JsonResponse({'message': 'Connexion réussie'}, status=status.HTTP_200_OK)
        else:
            # Failed login
            return JsonResponse({'error': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)

# Medical record views
class CreateDossierMedicalView(generics.CreateAPIView):
    queryset = DossierMedical.objects.all()
    serializer_class = DossierMedicalSerializer
    permission_classes = [AllowAny]

class ListDossierMedicalView(generics.ListAPIView):
    queryset = DossierMedical.objects.all()
    serializer_class = DossierMedicalSerializer
    permission_classes = [AllowAny]

# Analysis views
class CreateCholesterolAnalyseView(generics.CreateAPIView):
    queryset = CholesterolAnalyse.objects.all()
    serializer_class = CholesterolAnalyseSerializer
    permission_classes = [AllowAny]

class CreateDiabeteAnalyseView(generics.CreateAPIView):
    queryset = DiabeteAnalyse.objects.all()
    serializer_class = DiabeteAnalyseSerializer
    permission_classes = [AllowAny]

class CreateIstAnalyseView(generics.CreateAPIView):
    queryset = IstAnalyse.objects.all()
    serializer_class = IstAnalyseSerializer
    permission_classes = [AllowAny]

class CreateAnalyseCourantView(generics.CreateAPIView):
    queryset = AnalyseCourant.objects.all()
    serializer_class = AnalyseCourantSerializer
    permission_classes = [AllowAny]

# List and retrieve analysis views
class ListCholesterolAnalyseView(generics.ListAPIView):
    queryset = CholesterolAnalyse.objects.all()
    serializer_class = CholesterolAnalyseSerializer
    permission_classes = [AllowAny]

class RetrieveCholesterolAnalyseView(generics.RetrieveAPIView):
    queryset = CholesterolAnalyse.objects.all()
    serializer_class = CholesterolAnalyseSerializer
    permission_classes = [AllowAny]

class ListDiabeteAnalyseView(generics.ListAPIView):
    queryset = DiabeteAnalyse.objects.all()
    serializer_class = DiabeteAnalyseSerializer
    permission_classes = [AllowAny]

class RetrieveDiabeteAnalyseView(generics.RetrieveAPIView):
    queryset = DiabeteAnalyse.objects.all()
    serializer_class = DiabeteAnalyseSerializer
    permission_classes = [AllowAny]

class ListIstAnalyseView(generics.ListAPIView):
    queryset = IstAnalyse.objects.all()
    serializer_class = IstAnalyseSerializer
    permission_classes = [AllowAny]

class RetrieveIstAnalyseView(generics.RetrieveAPIView):
    queryset = IstAnalyse.objects.all()
    serializer_class = IstAnalyseSerializer
    permission_classes = [AllowAny]

class ListAnalyseCourantView(generics.ListAPIView):
    queryset = AnalyseCourant.objects.all()
    serializer_class = AnalyseCourantSerializer
    permission_classes = [AllowAny]

class RetrieveAnalyseCourantView(generics.RetrieveAPIView):
    queryset = AnalyseCourant.objects.all()
    serializer_class = AnalyseCourantSerializer
    permission_classes = [AllowAny]
