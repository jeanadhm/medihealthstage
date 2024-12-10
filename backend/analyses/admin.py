from django.contrib import admin
from .models import CommonAnalysis, CholesterolAnalysis, IstAnalysis, DiabetesAnalysis, DossierMedical

admin.site.register(CommonAnalysis)
admin.site.register(CholesterolAnalysis)
admin.site.register(IstAnalysis)
admin.site.register(DiabetesAnalysis)
admin.site.register(DossierMedical)
