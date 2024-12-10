# Generated by Django 5.1.3 on 2024-12-09 17:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_customuser_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='consultation',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='consultation_created', to='users.doctor'),
        ),
        migrations.AddField(
            model_name='patient',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='patients_created', to='users.doctor'),
        ),
        migrations.AddField(
            model_name='rdv',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rdv_created', to='users.doctor'),
        ),
    ]
