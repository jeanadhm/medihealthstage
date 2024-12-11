from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from .models import CustomUser, Doctor, Patient, RendezVous,Appointment, Rdv, Consultation, Demandes
from .serializers import DoctorSerializer, CustomUserSerializer, RendezVousSerializer, PatientSerializer,AppointmentSerializer, CreateAppointmentSerializer, RdvSerializer, ConsultationSerializer, DemandesSerializer
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
from rest_framework.exceptions import NotFound


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

        if not email or not password:
            return JsonResponse({"message": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authentifier l'utilisateur
        user = authenticate(email=email, password=password)

        if user and user.is_active:
            # Générer les tokens JWT
            refresh = RefreshToken.for_user(user)

            # Identifier le rôle de l'utilisateur
            role = 'doctor' if isinstance(user, Doctor) else 'patient'

            # Récupérer l'ID de l'utilisateur (ou du docteur)
            user_id = user.id

            # Ajouter l'ID de l'utilisateur dans la réponse
            return JsonResponse({
                "message": "Login successful",
                "role": role,  # Inclure le rôle dans la réponse
                "userId": user_id,  # ID de l'utilisateur (docteur ou patient)
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_202_ACCEPTED)

        return JsonResponse({"message": "Invalid credentials or account not active."}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Vérification que l'utilisateur est authentifié

    def get(self, request):
        user = request.user

        # Vérification que l'utilisateur est authentifié
        if not user.is_authenticated:
            return Response({"detail": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

        # Structure de la réponse en fonction du rôle
        data = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "full_name": user.full_name,
        }

        # Vérifier les informations spécifiques au patient
        if user.role == "patient" and hasattr(user, 'patient'):
            data.update({
                "numeroTelephone": user.patient.numeroTelephone,
                "adresse": user.patient.adresse,
                "dateNaissance": user.patient.dateNaissance,
            })

        # Vérifier les informations spécifiques au médecin
        elif user.role == "doctor" and hasattr(user, 'doctor'):
            data.update({
                "numIdentification": user.doctor.numIdentification,
                "hopital": user.doctor.hopital,
                "telHopital": user.doctor.telHopital,
                "adresseHopital": user.doctor.adresse,
            })

        else:
            return Response({"detail": "Profile non trouvé."}, status=status.HTTP_404_NOT_FOUND)

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
    # Récupérer l'ID du docteur envoyé depuis le frontend (localStorage)
    doctor_id = request.query_params.get('doctorId')  # Récupérer depuis la requête GET
    
    if doctor_id:
        # Filtrer les patients par l'ID du docteur
        patients = Patient.objects.filter(created_by=doctor_id)
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)
    else:
        return Response({"detail": "Doctor ID is required"}, status=400)
        
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
        # Vérifier si 'patient' est fourni dans les données de la requête
        patient_id = request.data.get('patient')
        if not patient_id:
            return Response({"error": "L'ID du patient est requis"}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier si le patient existe
        try:
            Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            return Response({"error": "Patient non trouvé"}, status=status.HTTP_404_NOT_FOUND)

        # Passer les données au serializer
        serializer = CreateAppointmentSerializer(data=request.data)
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
    doctor_id = request.query_params.get('doctorId')  # Récupérer l'ID du docteur depuis les paramètres de la requête
    
    if doctor_id:
        try:
            appointments = Rdv.objects.filter(created_by_id=doctor_id).order_by('date', 'time')  # Filtrer par docteur
            serializer = RdvSerializer(appointments, many=True)
            return Response(serializer.data)
        except Rdv.DoesNotExist:
            return Response({"detail": "Aucun rendez-vous trouvé pour ce docteur."}, status=404)
    else:
        return Response({"detail": "L'ID du docteur est requis"}, status=400)


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
            Q(hopital__icontains=query) | Q(adresse__icontains=query)
        )
        # Préparer les données pour la réponse
        results = doctors.values(
            'hopital', 'adresse', 'telHopital'
        ).distinct()
        return Response(results)


class DemandesAPIView(APIView):
    def get(self, request):
        demandes = Demandes.objects.all()
        serializer = DemandesSerializer(demandes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DemandesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            demande = Demandes.objects.get(id=pk)
        except Demandes.DoesNotExist:
            return Response({'error': 'Demande introuvable.'}, status=status.HTTP_404_NOT_FOUND)

        if 'status' not in request.data:
            return Response({'error': 'Statut requis.'}, status=status.HTTP_400_BAD_REQUEST)

        demande.status = request.data['status']
        demande.save()
        return Response({'message': f"Demande mise à jour avec le statut '{demande.get_status_display()}'."}, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_demandes_patient(request):
    # Récupérer l'ID du patient depuis les paramètres de la requête GET
    patient_id = request.query_params.get('patientId')  

    if patient_id:
        try:
            # Filtrer les demandes par l'ID du patient
            demandes = Demandes.objects.filter(patient_id=patient_id)

            # Créer une liste de demandes avec les informations du docteur et le statut
            demandes_data = []
            for demande in demandes:
                doctor = demande.doctor  # Ici, doctor est une relation ForeignKey (assurez-vous que c'est bien un objet, pas un ID)

                # Si la relation est correcte, doctor sera un objet Doctor
                doctor_name = f"{doctor.nom} {doctor.prenoms}"

                # Récupérer le statut de la demande
                status = demande.status

                demande_data = {
                    'id': demande.id,
                    'patient_id': demande.patient_id,
                    'date': demande.date,
                    'time': demande.time,
                    'instructions': demande.instructions,
                    'doctor_name': doctor_name, 
                    'status': status  
                }

                demandes_data.append(demande_data)

            return Response(demandes_data)

        except Demandes.DoesNotExist:
            return Response({"detail": "Aucune demande trouvée pour ce patient."}, status=404)
    else:
        return Response({"detail": "Patient ID is required"}, status=400)
    

@api_view(['GET'])
def list_demandes_patient(request):
    # Récupérer l'ID du patient depuis les paramètres de la requête GET
    patient_id = request.query_params.get('patientId')

    if patient_id:
        try:
            # Filtrer les demandes par l'ID du patient
            demandes = Demandes.objects.filter(patient_id=patient_id)

            # Créer une liste de demandes avec les informations du docteur et le statut
            demandes_data = []
            for demande in demandes:
                doctor = demande.doctor  # Assurez-vous que le champ doctor est une ForeignKey vers le modèle Doctor

                if isinstance(doctor, Doctor):  # Vérifier que doctor est un objet valide
                    doctor_name = f"{doctor.nom} {doctor.prenoms}"
                else:
                    doctor_name = "Docteur inconnu"

                demande_data = {
                    'id': demande.id,
                    'patient_id': demande.patient_id,
                    'date': demande.date,
                    'time': demande.time,
                    'instructions': demande.instructions,
                    'doctor_name': doctor_name,
                    'status': demande.status,
                }

                demandes_data.append(demande_data)

            return Response(demandes_data)

        except Demandes.DoesNotExist:
            return Response({"detail": "Aucune demande trouvée pour ce patient."}, status=404)
    else:
        return Response({"detail": "Patient ID is required"}, status=400)

@api_view(['GET'])
def list_demandes_doctor(request):
    # Récupérer l'ID du docteur depuis les paramètres de la requête GET
    doctor_id = request.query_params.get('doctorId')

    if doctor_id:
        try:
            # Filtrer les demandes par l'ID du docteur
            demandes = Demandes.objects.filter(doctor_id=doctor_id)

            # Créer une liste de demandes avec les informations du patient et le statut
            demandes_data = []
            for demande in demandes:
                patient = demande.patient  # Assurez-vous que le champ patient est une ForeignKey vers le modèle Patient

                if patient:  # Vérifier que patient est un objet valide
                    patient_name = f"{patient.nom} {patient.prenoms}"
                else:
                    patient_name = "Patient inconnu"

                demande_data = {
                    'id': demande.id,
                    'doctor_id': demande.doctor_id,
                    'date': demande.date,
                    'time': demande.time,
                    'instructions': demande.instructions,
                    'patient_name': patient_name,
                    'status': demande.status,
                }

                demandes_data.append(demande_data)

            return Response(demandes_data)

        except Demandes.DoesNotExist:
            return Response({"detail": "Aucune demande trouvée pour ce docteur."}, status=404)
    else:
        return Response({"detail": "Doctor ID is required"}, status=400)
    

@api_view(['PATCH'])
def update_demandes_status(request, pk):
    try:
        # Récupérer l'objet demande par son ID
        demande = Demandes.objects.get(pk=pk)

        # Obtenir le nouveau statut depuis le corps de la requête
        new_status = request.data.get('status')
        if not new_status or new_status not in ['Validé', 'Reporté']:
            return Response({'error': 'Statut invalide.'}, status=status.HTTP_400_BAD_REQUEST)

        # Mettre à jour le statut
        demande.status = new_status
        demande.save()

        return Response({'message': 'Statut mis à jour avec succès.'}, status=status.HTTP_200_OK)
    except Demandes.DoesNotExist:
        return Response({'error': 'Demande non trouvée.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)