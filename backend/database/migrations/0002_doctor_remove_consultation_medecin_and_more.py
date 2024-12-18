# Generated by Django 4.2.6 on 2024-07-02 13:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(blank=True, max_length=100, null=True)),
                ('prenom', models.CharField(blank=True, max_length=100, null=True)),
                ('anneeNaissance', models.IntegerField(blank=True, null=True)),
                ('numIdentification', models.CharField(blank=True, max_length=100, null=True)),
                ('hopital', models.CharField(blank=True, max_length=100, null=True)),
                ('telHopital', models.CharField(blank=True, max_length=20, null=True)),
                ('adresseHopital', models.TextField(blank=True, null=True)),
                ('documentsVerification', models.FileField(null=True, upload_to='documents/')),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('password', models.CharField(default='', max_length=128)),
            ],
        ),
        migrations.RemoveField(
            model_name='consultation',
            name='medecin',
        ),
        migrations.RemoveField(
            model_name='dossiermedical',
            name='medecin',
        ),
        migrations.RemoveField(
            model_name='examen',
            name='medecin',
        ),
        migrations.RemoveField(
            model_name='ordonnance',
            name='medecin',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='date_naissance',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='prenoms',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='telephone',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='user',
        ),
        migrations.AddField(
            model_name='patient',
            name='dateNaissance',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='numeroTelephone',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='password',
            field=models.CharField(default='', max_length=128),
        ),
        migrations.AddField(
            model_name='patient',
            name='prenom',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='adresse',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='patient',
            name='nom',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.DeleteModel(
            name='Medecin',
        ),
        migrations.AddField(
            model_name='consultation',
            name='Doctor',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='database.doctor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dossiermedical',
            name='Doctor',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='database.doctor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='examen',
            name='Doctor',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='database.doctor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='Doctor',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='database.doctor'),
            preserve_default=False,
        ),
    ]
