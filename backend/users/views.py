from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from .models import CustomUser, Doctor, Patient, RendezVous,Appointment, Rdv, Consultation
from .serializers import DoctorSerializer, CustomUserSerializer, RendezVousSerializer, PatientSerializer,AppointmentSerializer, CreateAppointmentSerializer, RdvSerializer, ConsultationSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404


class DoctorView(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()
    # filterset_fields = '__all__'

class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()
    # filterset_fields = '__all__'


class RegisterUserView(APIView):
    
    def post(self, request):

        if not CustomUser.objects.filter(email = request.data.get('email')).exists():

            if request.data.get('role') == 'doctor':
                user_serialized = DoctorSerializer(data=request.data)
            elif request.data.get('role') == 'patient':
                user_serialized = PatientSerializer(data=request.data)
            else:
                return None
            
              
                
            if user_serialized.is_valid(): 
                
                user_serialized.save()
                
                refresh = RefreshToken.for_user(user_serialized)

                return JsonResponse(data= {
                    "message": "User created successfully"
                }, status=status.HTTP_201_CREATED,  safe=False)
            
            else:
                return JsonResponse(data=user_serialized.errors ,status=status.HTTP_400_BAD_REQUEST, safe=False)

        else:
            return JsonResponse("Cet utilisateur existe déja", safe=False)


def authenticate(email, password):
    try:
        # Vérifier dans les deux modèles
        user = None
        if Doctor.objects.filter(email=email).exists():
            user = Doctor.objects.get(email=email)
        elif Patient.objects.filter(email=email).exists():
            user = Patient.objects.get(email=email)
        
        # Vérifier le mot de passe
        if user and user.check_password(password):
            return user
    except Exception as e:
        print(f"Error during authentication: {e}")
        return None

    return None

class ConexionUserView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authentifier l'utilisateur
        user = authenticate(email=email, password=password)

        if user and user.is_active:
            # Générer les tokens JWT
            refresh = RefreshToken.for_user(user)

            # Identifier le rôle (si nécessaire)
            role = 'doctor' if isinstance(user, Doctor) else 'patient'

            return JsonResponse({
                "message": "Login successful",
                "role": role,  # Inclure le rôle dans la réponse
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_202_ACCEPTED)

        return JsonResponse({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Structure de la réponse en fonction du rôle
        data = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "full_name": user.full_name,
        }

        if user.role == "patient":
            data.update({
                "numeroTelephone": user.patient.numeroTelephone,
                "adresse": user.adresse,
                "dateNaissance": user.dateNaissance,
            })

        elif user.role == "doctor":
            data.update({
                "numIdentification": user.doctor.numIdentification,
                "hopital": user.doctor.hopital,
                "telHopital": user.doctor.telHopital,
                "adresseHopital": user.doctor.adresseHopital,
            })

        return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def protected_view(request):
    
    permission_classes=IsAuthenticated
    print(request)
    # Cette vue est accessible uniquement aux utilisateurs authentifiés avec un jeton valide
    user = request.user
    # print(user.role)
    if user:
        user = get_object_or_404(CustomUser, id=user.id)
        user_serializer = CustomUserSerializer(user)
    # print(user) 
    return JsonResponse(data=user_serializer.data, status= status.HTTP_202_ACCEPTED, safe=False)

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



        
class RendezVousViewSet(viewsets.ModelViewSet):
    queryset = RendezVous.objects.all()
    serializer_class = RendezVousSerializer

    def create(self, request, *args, **kwargs):
        # Récupérer les données
        patient_name = request.data.get('patientName', '').strip()
        date = request.data.get('date')
        time = request.data.get('time')
        instructions = request.data.get('instructions', 'Aucune instruction')

        # Validation des champs obligatoires
        if not patient_name:
            return Response({'error': 'Le nom complet du patient est requis.'}, status=status.HTTP_400_BAD_REQUEST)
        if not date or not time:
            return Response({'error': 'La date et l\'heure sont obligatoires.'}, status=status.HTTP_400_BAD_REQUEST)

        # Diviser le nom complet en prénom et nom
        try:
            name_parts = patient_name.split(' ', 1)  # Divise en deux parties seulement
            if len(name_parts) != 2:
                raise ValueError("Format incorrect")
            prenom, nom = name_parts
        except ValueError:
            return Response({'error': 'Le nom complet doit inclure un prénom et un nom.'}, status=status.HTTP_400_BAD_REQUEST)

        # Rechercher le patient par prénom et nom
        try:
            patient = Patient.objects.get(prenom=prenom, nom=nom)
        except Patient.DoesNotExist:
            return Response({'error': 'Aucun patient trouvé avec ce prénom et nom.'}, status=status.HTTP_404_NOT_FOUND)

        # Créer le rendez-vous
        rendez_vous = RendezVous.objects.create(
            patient=patient,
            date=date,
            time=time,
            instructions=instructions
        )

        # Sérialiser et retourner la réponse
        serializer = self.get_serializer(rendez_vous)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AppointmentListCreateView(APIView):
     def post(self, request):
        # Récupérer l'ID du patient
        patient_id = request.data.get('patient')
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            return Response({"error": "Patient non trouvé"}, status=status.HTTP_404_NOT_FOUND)
        
        # Créer le rendez-vous avec le patient
        appointment_data = {
            'patient': patient,
            'date': request.data.get('date'),
            'time': request.data.get('time'),
            'instructions': request.data.get('instructions'),
        }
        
        # Serializer
        serializer = CreateAppointmentSerializer(data=appointment_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RdvCreateView(APIView):
    def post(self, request):
        serializer = RdvSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
def list_appointments(request):
    appointments = Rdv.objects.all().order_by('date', 'time')
    serializer = RdvSerializer(appointments, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def update_appointment_status(request, pk):
    try:
        appointment = Rdv.objects.get(pk=pk)
    except Rdv.DoesNotExist:
        return Response({'error': 'Rendez-vous introuvable'}, status=status.HTTP_404_NOT_FOUND)

    appointment.status = request.data.get('status', appointment.status)
    appointment.save()
    return Response({'message': 'Statut mis à jour avec succès'})


class ConsultationListCreateView(generics.ListCreateAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer


class HospitalSearchFromDoctorsView(APIView):
    def get(self, request):
        query = request.GET.get('q', '')
        # Rechercher dans les champs hopital, adresseHopital
        doctors = Doctor.objects.filter(
            Q(hopital__icontains=query) | Q(adresseHopital__icontains=query)
        )
        # Préparer les données pour la réponse
        results = doctors.values(
            'hopital', 'adresseHopital', 'telHopital'
        ).distinct()
        return Response(results)