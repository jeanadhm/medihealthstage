# Generated by Django 5.1.3 on 2024-12-10 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_remove_demandes_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='demandes',
            name='status',
            field=models.CharField(choices=[('En attente', 'En attente'), ('Validé', 'Validé'), ('Reporté', 'Reporté')], default='pending', max_length=20),
        ),
    ]
