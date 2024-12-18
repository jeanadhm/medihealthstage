from django.urls import path
from .views import (
    CommonAnalysisListCreateView,
    CommonAnalysisDetailView,
    CholesterolAnalysisListCreateView,
    CholesterolAnalysisDetailView,
    IstAnalysisListCreateView,
    IstAnalysisDetailView,
    DiabetesAnalysisListCreateView,
    DiabetesAnalysisDetailView,
    AllAnalysesListView,
    CreateOrUpdateDossierMedicalView,
    list_medical_records
)

urlpatterns = [
    # Routes pour les analyses courantes
    path('common/', CommonAnalysisListCreateView.as_view(), name='common_analysis_list_create'),
    path('common/<int:pk>/', CommonAnalysisDetailView.as_view(), name='common_analysis_detail'),

    # Routes pour les analyses de cholestérol
    path('cholesterol/', CholesterolAnalysisListCreateView.as_view(), name='cholesterol_analysis_list_create'),
    path('cholesterol/<int:pk>/', CholesterolAnalysisDetailView.as_view(), name='cholesterol_analysis_detail'),

    # Routes pour les analyses IST
    path('ist/', IstAnalysisListCreateView.as_view(), name='ist_analysis_list_create'),
    path('ist/<int:pk>/', IstAnalysisDetailView.as_view(), name='ist_analysis_detail'),

    # Routes pour les analyses de diabète
    path('diabetes/', DiabetesAnalysisListCreateView.as_view(), name='diabetes_analysis_list_create'),
    path('diabetes/<int:pk>/', DiabetesAnalysisDetailView.as_view(), name='diabetes_analysis_detail'),

    path('all/<int:pk>/type/<str:type>/', AllAnalysesListView.as_view(), name='all_analyses_list'),
    path('dossiermedical/', CreateOrUpdateDossierMedicalView.as_view(), name='create_or_update_dossier_medical'),
    path('dossiermedical/list/<int:pk>', list_medical_records, name='list_medical_records'),
]
