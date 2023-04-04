from django.db import models

# Create your models here.

class Place(models.Model):
  title = models.CharField(max_length=100)
  description = models.CharField(max_length=1000)
  lat = models.DecimalField(max_digits=9, decimal_places=6)
  lng = models.DecimalField(max_digits=9, decimal_places=6)
  isBookmarked = models.BooleanField(False)