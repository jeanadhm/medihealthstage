from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterDoctorView, RegisterPatientView, list_doctors, list_patients, PatientLoginView, DoctorLoginView, RendezVousViewSet

# Créer un routeur
router = DefaultRouter()
router.register(r'rdv', RendezVousViewSet, basename='rdv')

urlpatterns = [
    path('register/doctor/', RegisterDoctorView.as_view(), name='register-doctor'),
    path('register/patient/', RegisterPatientView.as_view(), name='register-patient'),
    path('doctors/', list_doctors, name='list-doctors'),
    path('patients/', list_patients, name='list-patients'),
    path('patient/login/', PatientLoginView.as_view(), name='patient_login'),
    path('doctor/login/', DoctorLoginView.as_view(), name='doctor_login'),
    path('api/', include(router.urls)),  # Inclure les routes du routeur ici
]