from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorView, PatientView,ConexionUserView, RegisterUserView, list_doctors, list_patients, RendezVousViewSet,AppointmentListCreateView, RdvCreateView, list_appointments,update_appointment_status, ConsultationListCreateView, HospitalSearchFromDoctorsView, UserProfileAPIView, DemandesAPIView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,

)

# Créer un routeur
router = DefaultRouter()
router.register(r'rdv', RendezVousViewSet, basename='rdv')
router.register(r'doctors', DoctorView, basename='doctors')
router.register(r'patients', PatientView, basename='patients')

urlpatterns = [
   
    path('doctors/', list_doctors, name='list-doctors'),
    path('patients/', list_patients, name='list-patients'),
    path('api/', include(router.urls)),  # Inclure les routes du routeur ici
    path('rdvs/all/', AppointmentListCreateView.as_view(), name='appointments'),
    path('rdvs/create/', RdvCreateView.as_view(), name='rdv-create'),
    path('rdvs/',list_appointments, name='list_appointments'),
    path('rdvs/<int:pk>/status/',update_appointment_status, name='update_appointment_status'),
    path('consultations/', ConsultationListCreateView.as_view(), name='consultation-list-create'),
    path('hospitals/doctors/', HospitalSearchFromDoctorsView.as_view(), name='hospital-search-doctors'),
    path('users/', include(router.urls)),  # Inclure les routes du routeur ici
    path('register/', RegisterUserView.as_view()),
    path('login/', ConexionUserView.as_view()),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),
    path('demandes/', DemandesAPIView.as_view(), name='demandes-list'),
    path('demandes/<int:pk>/', DemandesAPIView.as_view(), name='demandes-detail'),
]
