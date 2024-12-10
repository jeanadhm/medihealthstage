from django.db import models
from users.models import Patient, Doctor, Consultation, Rdv  # Assurez-vous d'importer le modèle Doctor

class CommonAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    red_blood_cells = models.FloatField(null=True, blank=True)
    white_blood_cells = models.FloatField(null=True, blank=True)
    platelets = models.FloatField(null=True, blank=True)
    hemoglobin = models.FloatField(null=True, blank=True)
    hematocrit = models.FloatField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    created_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='common_analyses', null=True, blank=True)  # Ajout du champ created_by

    def __str__(self):
        if self.patient:
            return f"Common Analysis for {self.patient.nom} {self.patient.prenoms} on {self.date or 'N/A'}"
        return f"Common Analysis on {self.date or 'N/A'} (No Patient)"

class CholesterolAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    chol_total = models.FloatField(null=True, blank=True)
    chol_hdl = models.FloatField(null=True, blank=True)
    chol_ldl = models.FloatField(null=True, blank=True)
    chol_triglycerides = models.FloatField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    result_positive = models.BooleanField(default=False)
    created_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='cholesterol_analyses', null=True, blank=True)  # Ajout du champ created_by

    def __str__(self):
        return f"Cholesterol Analysis for {self.patient.nom}{self.patient.prenoms} on {self.date or 'N/A'}"


class IstAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    ist_vih = models.CharField(max_length=50, null=True, blank=True)
    ist_syphilis = models.CharField(max_length=50, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    result_positive = models.BooleanField(default=False)
    created_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='ist_analyses', null=True, blank=True)  # Ajout du champ created_by

    def __str__(self):
        if self.patient:
            return f"IST Analysis for {self.patient.nom}{self.patient.prenoms} on {self.date or 'N/A'}"
        return f"IST Analysis (No patient) on {self.date or 'N/A'}"


class DiabetesAnalysis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    diabete_glucose = models.FloatField(null=True, blank=True)
    diabete_hba1c = models.FloatField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    result_positive = models.BooleanField(default=False)
    created_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='diabetes_analyses', null=True, blank=True)  # Ajout du champ created_by

    def __str__(self):
        return f"Diabetes Analysis for {self.patient.nom}{self.patient.prenoms} on {self.date or 'N/A'}"


class DossierMedical(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='dossiers')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Liens vers les analyses
    common_analyses = models.ManyToManyField(CommonAnalysis, blank=True)
    cholesterol_analyses = models.ManyToManyField(CholesterolAnalysis, blank=True)
    ist_analyses = models.ManyToManyField(IstAnalysis, blank=True)
    diabetes_analyses = models.ManyToManyField(DiabetesAnalysis, blank=True)

    # Liens vers les consultations et les rendez-vous
    consultations = models.ManyToManyField(Consultation, blank=True)
    rendezvous = models.ManyToManyField(Rdv, blank=True)

    created_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='dossiers_created', null=True, blank=True)




    def add_common_analysis(self, analysis):
        self.common_analyses.add(analysis)

    def add_cholesterol_analysis(self, analysis):
        self.cholesterol_analyses.add(analysis)

    def add_ist_analysis(self, analysis):
        self.ist_analyses.add(analysis)

    def add_diabetes_analysis(self, analysis):
        self.diabetes_analyses.add(analysis)

    def add_consultation(self, consultation):
        self.consultations.add(consultation)

    def add_rendezvous(self, rendezvous):
        self.rendezvous.add(rendezvous)