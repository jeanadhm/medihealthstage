# Generated by Django 4.2.6 on 2024-11-27 18:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('users', '0004_rename_datenaissance_doctor_anneenaissance_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='doctor_groups', to='auth.group'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='doctor',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='doctor',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, related_name='doctor_user_permissions', to='auth.permission'),
        ),
        migrations.AddField(
            model_name='patient',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='patient_groups', to='auth.group'),
        ),
        migrations.AddField(
            model_name='patient',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='patient',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
        migrations.AddField(
            model_name='patient',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='patient',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, related_name='patient_user_permissions', to='auth.permission'),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='adresseHopital',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='documentsVerification',
            field=models.FileField(blank=True, null=True, upload_to='documents/'),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='email',
            field=models.EmailField(default='example@gmail.com', max_length=254, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='doctor',
            name='hopital',
            field=models.CharField(blank=True, default='Inconnu', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='nom',
            field=models.CharField(blank=True, default='Inconnu', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='numIdentification',
            field=models.CharField(blank=True, default='Aucun', max_length=100, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='prenom',
            field=models.CharField(blank=True, default='Inconnu', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='telHopital',
            field=models.CharField(blank=True, default='0000000000', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='adresse',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='email',
            field=models.EmailField(default='example@gmail.com', max_length=254, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='patient',
            name='nom',
            field=models.CharField(blank=True, default='Inconnu', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='numeroTelephone',
            field=models.CharField(blank=True, default='0000000000', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='prenom',
            field=models.CharField(blank=True, default='Inconnu', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='rendezvous',
            name='instructions',
            field=models.TextField(blank=True, default='Aucune instruction', null=True),
        ),
        migrations.AlterField(
            model_name='rendezvous',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rendez_vous', to='users.patient'),
        ),
    ]