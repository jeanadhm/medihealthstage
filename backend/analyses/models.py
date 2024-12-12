from django.db import models
from users.models import Patient, Doctor, Consultation, Rdv  # Assurez-vous d'importer le modèle Doctor

class CommonAnalysis(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, null=True, blank=True, related_name='common_analysesdoc')
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
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE,null=True, blank=True, related_name='cholesterol_analysesdoc')
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
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, null=True, blank=True, related_name='ist_analysesdoc')
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
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE,null=True, blank=True, related_name='diabete_analyses')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    diabete_glucose = models.FloatField(null=True, blank=True)
    diabete_hba1c = models.FloatField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    result_positive = models.BooleanField(default=False)
    created_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='diabetes_analyses', null=True, blank=True)  # Ajout du champ created_by

    def __str__(self):
        return f"Diabetes Analysis for {self.patient.nom}{self.patient.prenoms} on {self.date or 'N/A'}"


class DossierMedical(models.Model):
    # Relations principales
    patient = models.OneToOneField(
        Patient, 
        on_delete=models.CASCADE, 
        help_text="Le patient auquel ce dossier médical est associé."
    )
    doctor = models.ForeignKey(
        Doctor, 
        on_delete=models.CASCADE, 
        related_name='dossiers', 
        help_text="Le docteur responsable de ce dossier médical."
    )
    created_by = models.ForeignKey(
        Doctor, 
        on_delete=models.CASCADE, 
        related_name='dossiers_created', 
        null=True, 
        blank=True, 
        help_text="Le docteur ayant créé ce dossier médical."
    )

    # Dates de création et de mise à jour
    created_at = models.DateTimeField(auto_now_add=True, help_text="Date de création du dossier.")
    updated_at = models.DateTimeField(auto_now=True, help_text="Date de dernière mise à jour du dossier.")

    # Analyses médicales
    common_analyses = models.ManyToManyField(
        CommonAnalysis, 
        blank=True, 
        help_text="Liste des analyses sanguines communes associées au patient."
    )
    cholesterol_analyses = models.ManyToManyField(
        CholesterolAnalysis, 
        blank=True, 
        help_text="Liste des analyses de cholestérol associées au patient."
    )
    ist_analyses = models.ManyToManyField(
        IstAnalysis, 
        blank=True, 
        help_text="Liste des analyses IST associées au patient."
    )
    diabetes_analyses = models.ManyToManyField(
        DiabetesAnalysis, 
        blank=True, 
        help_text="Liste des analyses de diabète associées au patient."
    )

    # Consultations et rendez-vous
    consultations = models.ManyToManyField(
        Consultation, 
        blank=True, 
        help_text="Liste des consultations associées au patient."
    )
    rendezvous = models.ManyToManyField(
        Rdv, 
        blank=True, 
        help_text="Liste des rendez-vous associés au patient."
    )

    # Méthodes d'ajout pour les relations ManyToMany
    def add_common_analysis(self, analysis):
        """Ajoute une analyse sanguine commune au dossier médical."""
        self.common_analyses.add(analysis)

    def add_cholesterol_analysis(self, analysis):
        """Ajoute une analyse de cholestérol au dossier médical."""
        self.cholesterol_analyses.add(analysis)

    def add_ist_analysis(self, analysis):
        """Ajoute une analyse IST au dossier médical."""
        self.ist_analyses.add(analysis)

    def add_diabetes_analysis(self, analysis):
        """Ajoute une analyse de diabète au dossier médical."""
        self.diabetes_analyses.add(analysis)

    def add_consultation(self, consultation):
        """Ajoute une consultation au dossier médical."""
        self.consultations.add(consultation)

    def add_rendezvous(self, rendezvous):
        """Ajoute un rendez-vous au dossier médical."""
        self.rendezvous.add(rendezvous)

    def __str__(self):
        return f"Dossier Médical de {self.patient.nom} {self.patient.prenoms} (Docteur: {self.doctor.nom})"
