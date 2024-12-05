from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("L'adresse email doit être fournie")
        if not password:
            raise ValueError('Un mot de passe doit être fourni')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    nom = models.CharField(max_length=100, null=True, blank=True)
    prenoms = models.CharField(max_length=100, null=True, blank=True)
    adresse = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, max_length=255)
    dateNaissance = models.DateField(null=True, blank=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    
    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        """Retourne le nom complet."""
        return f"{self.nom} {self.prenoms}".strip()

class Patient(CustomUser):
    numeroTelephone = models.CharField(max_length=20, null=True, blank=True, default='0000000000')

    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    def save(self, *args, **kwargs):
        """Assure que le rôle est défini comme 'patient'."""
        self.role = 'patient'
        super().save(*args, **kwargs)

class Doctor(CustomUser):
    numIdentification = models.CharField(max_length=100, unique=True, null=True, blank=True, default='Aucun')
    hopital = models.CharField(max_length=100, null=True, blank=True, default='Inconnu')
    telHopital = models.CharField(max_length=20, null=True, blank=True, default='0000000000')
    adresseHopital = models.TextField(null=True, blank=True, default='')
    documentsVerification = models.FileField(upload_to='documents/', null=True, blank=True)

    class Meta:
        verbose_name = "Docteur"
        verbose_name_plural = "Docteurs"

    def save(self, *args, **kwargs):
        """Assure que le rôle est défini comme 'doctor'."""
        self.role = 'doctor'
        super().save(*args, **kwargs)

class RendezVous(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="rdv")
    date = models.DateField()
    time = models.TimeField()
    instructions = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Rendez-vous avec {self.patient} le {self.date} à {self.time}"


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="appointments")
    date = models.DateField()
    time = models.TimeField()
    instructions = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Rendez-vous avec {self.patient} le {self.date} à {self.time}"

class Rdv(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('attended', 'Le patient est venu'),
        ('missed', 'Le patient n\'est pas venu'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="rdvs")
    date = models.DateField()
    time = models.TimeField()
    instructions = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )

    def __str__(self):
        return f"Rendez-vous de {self.patient} le {self.date} à {self.time}"


class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="consultations")
    date = models.DateField()
    symptoms = models.TextField(blank=True, null=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    blood_pressure = models.CharField(max_length=20, blank=True, null=True)
    pulse = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"Consultation de {self.patient.full_name} le {self.date}"