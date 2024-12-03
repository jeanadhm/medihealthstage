from django.db import models
from users.models import Patient

class CommonAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    red_blood_cells = models.FloatField(null=True, blank=True)  # Peut être null
    white_blood_cells = models.FloatField(null=True, blank=True)  # Peut être null
    platelets = models.FloatField(null=True, blank=True)  # Peut être null
    hemoglobin = models.FloatField(null=True, blank=True)  # Peut être null
    hematocrit = models.FloatField(null=True, blank=True)  # Peut être null
    date = models.DateField(null=True, blank=True)  # Peut être null ou vide

    def __str__(self):
        return f"Common Analysis for {self.patient.nom} on {self.date or 'N/A'}"


class CholesterolAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    chol_total = models.FloatField(null=True, blank=True)  # Peut être null
    chol_hdl = models.FloatField(null=True, blank=True)  # Peut être null
    chol_ldl = models.FloatField(null=True, blank=True)  # Peut être null
    chol_triglycerides = models.FloatField(null=True, blank=True)  # Peut être null
    date = models.DateField(null=True, blank=True)  # Peut être null ou vide
    result_positive = models.BooleanField(default=False)  # Défaut à False

    def __str__(self):
        return f"Cholesterol Analysis for {self.patient.nom} on {self.date or 'N/A'}"


class IstAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    ist_vih = models.CharField(max_length=50, null=True, blank=True)  # Peut être null ou vide
    ist_syphilis = models.CharField(max_length=50, null=True, blank=True)  # Peut être null ou vide
    date = models.DateField(null=True, blank=True)  # Peut être null ou vide
    result_positive = models.BooleanField(default=False)  # Défaut à False

    def __str__(self):
        if self.patient:
            return f"IST Analysis for {self.patient.nom} on {self.date or 'N/A'}"
        return f"IST Analysis (No patient) on {self.date or 'N/A'}"



class DiabetesAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    diabete_glucose = models.FloatField(null=True, blank=True)  # Peut être null
    diabete_hba1c = models.FloatField(null=True, blank=True)  # Peut être null
    date = models.DateField(null=True, blank=True)  # Peut être null ou vide
    result_positive = models.BooleanField(default=False)  # Défaut à False

    def __str__(self):
        return f"Diabetes Analysis for {self.patient.nom} on {self.date or 'N/A'}"


class Dossier(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    nom_dossier = models.CharField(max_length=200, null=True, blank=True)  # Peut être null ou vide
    pdf = models.FileField(upload_to='medical_records/', null=True, blank=True)  # Peut être null ou vide

    def __str__(self):
        return f"{self.patient.nom} {self.patient.prenom} - {self.nom_dossier or 'N/A'}"
