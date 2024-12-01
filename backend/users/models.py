from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models


class Patient(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    nom = models.CharField(max_length=100, null=True, blank=True, default='Inconnu')
    prenom = models.CharField(max_length=100, null=True, blank=True, default='Inconnu')
    dateNaissance = models.DateField(null=True, blank=True)
    adresse = models.TextField(null=True, blank=True, default='')
    numeroTelephone = models.CharField(max_length=20, null=True, blank=True, default='0000000000')
    password = models.CharField(max_length=128, default='')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

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

    def __str__(self):
        return self.email

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
    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='rendez_vous',
        null=False,
        blank=False
    )
    date = models.DateField()
    time = models.TimeField()
    instructions = models.TextField(null=True, blank=True, default='Aucune instruction')

    def __str__(self):
        return f"{self.patient.email} - {self.date} {self.time}"
