# Generated by Django 4.1.7 on 2023-05-11 18:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0002_trip_locations'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trip',
            options={'ordering': ['-updated_at']},
        ),
    ]
