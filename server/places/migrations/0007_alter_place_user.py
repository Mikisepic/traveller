# Generated by Django 4.1.7 on 2023-05-13 17:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('places', '0006_place_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='places', to=settings.AUTH_USER_MODEL),
        ),
    ]
