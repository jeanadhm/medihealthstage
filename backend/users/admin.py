from django.contrib import admin
from .models import Patient, Doctor, RendezVous, Appointment, Rdv

# Register your models here.
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(RendezVous)
admin.site.register(Rdv)
