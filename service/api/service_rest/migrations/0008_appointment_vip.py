# Generated by Django 4.0.3 on 2023-07-26 03:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0007_alter_appointment_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='vip',
            field=models.CharField(default='No', max_length=10),
        ),
    ]
