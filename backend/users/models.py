from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.conf import settings

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
        ('doctor', 'Docteur'),
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

    @property
    def user_id(self):
        """Retourne l'ID unique de l'utilisateur."""
        return self.id  # Utilise l'ID standard généré par Django

class Patient(CustomUser):
    numeroTelephone = models.CharField(max_length=20, null=True, blank=True, default='0000000000')
    created_by = models.ForeignKey(
        'Doctor',  # Remplacez 'User' par 'Doctor' si vous voulez qu'un docteur soit le créateur
        on_delete=models.CASCADE,
        related_name='patients_created',
        null=True,  
        blank=True   # Fournissez un nom unique pour la relation inverse
    )

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
    documentsVerification = models.FileField(upload_to='documents/', null=True, blank=True)
    adresseHopital = models.CharField(max_length=255, null=True, blank=True)

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
        return f"Rendez-vous avec {self.patient.nom} le {self.date} à {self.time}"


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
    created_by = models.ForeignKey(
        'Doctor',  # Remplacez 'User' par 'Doctor' si vous voulez qu'un docteur soit le créateur
        on_delete=models.CASCADE,
        related_name='rdv_created',  # Fournissez un nom unique pour la relation inverse
        null=True,  
        blank=True 
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )

    def __str__(self):
        return f"Rendez-vous de {self.patient.nom}{self.patient.prenoms} le {self.date} à {self.time}"


class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="consultations")
    date = models.DateField()
    symptoms = models.TextField(blank=True, null=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    blood_pressure = models.CharField(max_length=20, blank=True, null=True)
    pulse = models.PositiveIntegerField(blank=True, null=True)
    created_by = models.ForeignKey(
        'Doctor',  # Remplacez 'User' par 'Doctor' si vous voulez qu'un docteur soit le créateur
        on_delete=models.CASCADE,
        related_name='consultation_created',
        null=True,  
        blank=True  
    )

    def __str__(self):
        return f"Consultation de {self.patient.nom}{self.patient.prenoms} le {self.date}"

    
class Demandes(models.Model):
    STATUS_CHOICES = [
        ('En attente', 'En attente'),
        ('Validé', 'Validé'),
        ('Reporté', 'Reporté'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="demandes_patient")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="demandes_doctor")
    date = models.DateField()
    time = models.TimeField()
    instructions = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='En attente')

    def __str__(self):
        return f"Demande - {self.patient.full_name} avec {self.doctor.full_name} le {self.date} à {self.time}"


class Message(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="received_messages"
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"Message de {self.sender} à {self.receiver}"