from django.contrib import admin
from .models import Patient, Doctor, Rdv, Demandes

# Register your models here.
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Rdv)
admin.site.register(Demandes)
