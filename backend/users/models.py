from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models


class Patient(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    nom = models.CharField(max_length=100, null=False, blank=False)
    prenom = models.CharField(max_length=100, null=False, blank=False)
    dateNaissance = models.DateField(null=True, blank=True)
    adresse = models.TextField(null=True, blank=True, default='')
    numeroTelephone = models.CharField(max_length=20, null=True, blank=True, default='0000000000')
    password = models.CharField(max_length=128, default='')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'  # L'email reste utilisé pour les fonctions d'authentification
    REQUIRED_FIELDS = ['nom', 'prenom']  # Ces champs seront requis lors de la création d'un utilisateur

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='patient_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='patient_user_permissions',
        blank=True
    )
    class Meta:
        unique_together = ('nom', 'prenom')  # Contraintes d'unicité pour `nom` et `prenom`

    def __str__(self):
        return f"{self.prenom} {self.nom}"

    @property
    def full_name(self):
        """Retourne le nom complet du patient."""
        return f"{self.nom} {self.prenom}"

class Doctor(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    nom = models.CharField(max_length=100, null=True, blank=True, default='Inconnu')
    prenom = models.CharField(max_length=100, null=True, blank=True, default='Inconnu')
    anneeNaissance = models.DateField(null=True, blank=True)
    numIdentification = models.CharField(max_length=100, unique=True, null=True, blank=True, default='Aucun')
    hopital = models.CharField(max_length=100, null=True, blank=True, default='Inconnu')
    telHopital = models.CharField(max_length=20, null=True, blank=True, default='0000000000')
    adresseHopital = models.TextField(null=True, blank=True, default='')
    documentsVerification = models.FileField(upload_to='documents/', null=True, blank=True)
    password = models.CharField(max_length=128, default='')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='doctor_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='doctor_user_permissions',
        blank=True
    )

    def __str__(self):
        return self.email

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