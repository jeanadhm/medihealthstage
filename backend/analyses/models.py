from django.db import models
from users.models import Patient

class CommonAnalysis(models.Model):
    patientname = models.CharField(default='')
    red_blood_cells = models.FloatField()
    white_blood_cells = models.FloatField()
    platelets = models.FloatField()
    hemoglobin = models.FloatField()
    hematocrit = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return f"Common Analysis on {self.date}"

class CholesterolAnalysis(models.Model):
    patientname = models.CharField(default='')
    chol_total = models.FloatField()
    chol_hdl = models.FloatField()
    chol_ldl = models.FloatField()
    chol_triglycerides = models.FloatField()
    date = models.DateField()
    result_positive = models.BooleanField()

    def __str__(self):
        return f"Cholesterol Analysis on {self.date}"

class IstAnalysis(models.Model):
    patientname = models.CharField(default='')
    ist_vih = models.CharField(max_length=50)
    ist_syphilis = models.CharField(max_length=50)
    date = models.DateField()
    result_positive = models.BooleanField()

    def __str__(self):
        return f"IST Analysis on {self.date}"

class DiabetesAnalysis(models.Model):
    patientname = models.CharField(default='')
    diabete_glucose = models.FloatField()
    diabete_hba1c = models.FloatField()
    date = models.DateField()
    result_positive = models.BooleanField()

    def __str__(self):
        return f"Diabetes Analysis on {self.date}"

class Dossier(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    nom_dossier = models.CharField(max_length=200)
    pdf = models.FileField(upload_to='medical_records/')

    def __str__(self):
        return f"{self.patient.nom} {self.patient.prenom} - {self.nom_dossier}"