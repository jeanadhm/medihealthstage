from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Patient(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100, null=True, blank=True)
    prenom = models.CharField(max_length=100, null=True, blank=True)
    dateNaissance = models.DateField(null=True, blank=True)
    adresse = models.TextField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    numeroTelephone = models.CharField(max_length=20, null=True, blank=True)
    password = models.CharField(max_length=128, default='')

class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100, null=True, blank=True)
    prenom = models.CharField(max_length=100, null=True, blank=True)
    anneeNaissance = models.IntegerField(null=True, blank=True)
    numIdentification = models.CharField(max_length=100, null=True, blank=True)
    hopital = models.CharField(max_length=100, null=True, blank=True)
    telHopital = models.CharField(max_length=20, null=True, blank=True)
    adresseHopital = models.TextField(null=True, blank=True)
    documentsVerification = models.FileField(upload_to='documents/', null=True)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=128, default='')

class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    Doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date_consultation = models.DateField()
    type = models.CharField(max_length=255)
    diagnostique = models.CharField(max_length=255)
    
    def __str__(self):
        return f"Consultation on {self.date_consultation} by {self.Doctor}"

class DossierMedical(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE)
    Doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    historique_consultations = models.JSONField()
    historique_examens = models.JSONField()
    ordonnances = models.JSONField()
    
    def __str__(self):
        return f"Dossier Médical de {self.patient}"

class Ordonnance(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    Doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    prescription = models.TextField()
    date = models.DateField()
    
    def __str__(self):
        return f"Ordonnance for {self.patient} on {self.date}"

class Examen(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    Doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    
    def __str__(self):
        return f"Examen for {self.patient} on {self.date}"

class CholesterolAnalyse(models.Model):
    examen = models.OneToOneField(Examen, on_delete=models.CASCADE)
    chol_total = models.FloatField()
    chol_hdl = models.FloatField()
    chol_ldl = models.FloatField()
    chol_triglycerides = models.FloatField()
    resultat_positif = models.BooleanField()
    
    def __str__(self):
        return f"Cholesterol Analyse for {self.examen.patient}"

class DiabeteAnalyse(models.Model):
    examen = models.OneToOneField(Examen, on_delete=models.CASCADE)
    diabete_glucose = models.FloatField()
    diabete_ha1c = models.FloatField()
    
    def __str__(self):
        return f"Diabetes Analyse for {self.examen.patient}"

class IstAnalyse(models.Model):
    examen = models.OneToOneField(Examen, on_delete=models.CASCADE)
    vih = models.BooleanField()
    syphilis = models.BooleanField()
    hepatite = models.BooleanField()
    
    def __str__(self):
        return f"IST Analyse for {self.examen.patient}"

class AnalyseCourant(models.Model):
    examen = models.OneToOneField(Examen, on_delete=models.CASCADE)
    globule_rouge = models.FloatField()
    globule_blanc = models.FloatField()
    hemoglobin = models.FloatField()
    hematocrit = models.FloatField()
    platelets = models.FloatField()
    
    def __str__(self):
        return f"Analyse Courant for {self.examen.patient}"
