from django.urls import path
from .views import CommonAnalysisCreateView, CholesterolAnalysisCreateView, IstAnalysisCreateView, DiabetesAnalysisCreateView, save_analysis, save_pdf, AllAnalysesListView

urlpatterns = [
    path('common/', CommonAnalysisCreateView.as_view(), name='common-create'),
    path('cholesterol/', CholesterolAnalysisCreateView.as_view(), name='cholesterol-create'),
    path('ist/', IstAnalysisCreateView.as_view(), name='ist-create'),
    path('diabetes/', DiabetesAnalysisCreateView.as_view(), name='diabetes-create'),
    path('analyses/all/', AllAnalysesListView.as_view(), name='all-analyses-list'),
    path('save_analysis/', save_analysis, name='save_analysis'),
    path('save_pdf/', save_pdf, name='save_pdf'),
]
