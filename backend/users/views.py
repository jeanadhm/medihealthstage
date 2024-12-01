from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
from .models import Doctor, Patient, RendezVous
from .serializers import DoctorSerializer, PatientLoginSerializer, RendezVousSerializer, PatientSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password

from django.http import JsonResponse


class RegisterDoctorView(generics.CreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Convertir les données de la requête en dictionnaire mutable
        doctor_data = self.request.data.dict()  # Conversion QueryDict -> dict

        # Supprimer les champs non nécessaires (comme csrfmiddlewaretoken)
        doctor_data.pop('csrfmiddlewaretoken', None)

        # Hacher le mot de passe
        doctor_data['password'] = make_password(doctor_data.get('password'))

        # Enregistrement de l'objet Doctor
        serializer.save(**doctor_data)

class RegisterPatientView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        patient_data = self.request.data.copy()  # Toujours travailler avec une copie
        patient_data.pop('csrfmiddlewaretoken', None)  # Supprimer les champs inutiles
        password = patient_data.get('password')

        if password:
            patient_data['password'] = make_password(password)

        # Utiliser le sérialiseur pour valider les données
        serializer.save(**patient_data)

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



   
class PatientLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email et mot de passe sont obligatoires."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authentification
        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response(
                {"detail": "Adresse e-mail ou mot de passe incorrect."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Vérifiez si l'utilisateur est un patient
        if not isinstance(user, Patient):
            return Response(
                {"detail": "Cet utilisateur n'est pas un patient."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Génération ou récupération du token
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {"token": token.key, "message": "Connexion réussie."},
            status=status.HTTP_200_OK,
        )

class DoctorLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email et mot de passe sont obligatoires."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authentification
        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response(
                {"detail": "Adresse e-mail ou mot de passe incorrect."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Vérifiez si l'utilisateur est un docteur
        if not isinstance(user, Doctor):
            return Response(
                {"detail": "Cet utilisateur n'est pas un docteur."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Génération ou récupération du token
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {"token": token.key, "message": "Connexion réussie."},
            status=status.HTTP_200_OK,
        )

class DoctorLoginView(APIView):
    """Vue de connexion pour les docteurs, utilisant la méthode POST."""

    @api_view(['POST'])  # Autorise uniquement les requêtes POST
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authentification par email et mot de passe
        user = authenticate(request, email=email, password=password)

        if user and user.is_active:
            # Connexion réussie
            return JsonResponse({'message': 'Connexion réussie'}, status=status.HTTP_200_OK)
        else:
            # Échec de la connexion
            return JsonResponse({'error': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)
        
        
class RendezVousViewSet(viewsets.ModelViewSet):
    queryset = RendezVous.objects.all()
    serializer_class = RendezVousSerializer

    def create(self, request, *args, **kwargs):
        patient_name = request.data.get('patientName')  # Récupérer le nom du patient
        date = request.data.get('date')
        time = request.data.get('time')
        instructions = request.data.get('instructions')

        # Créer une instance de rendez-vous
        rendez_vous = RendezVous.objects.create(
            patient_name=patient_name,  # Assurez-vous que le champ existe dans votre modèle
            date=date,
            time=time,
            instructions=instructions
        )
        
        # Serialize et renvoyer la réponse
        serializer = self.get_serializer(rendez_vous)
        return Response(serializer.data, status=201)
