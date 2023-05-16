import uuid

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from users.user.models import User

class Place(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name='places', on_delete=models.CASCADE, default=None)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=256)
    lat = models.DecimalField(max_digits=8, decimal_places=6, validators=[MaxValueValidator(90.000000), MinValueValidator(-90.000000)])
    lng = models.DecimalField(max_digits=9, decimal_places=6, validators=[MaxValueValidator(180.000000), MinValueValidator(-180.000000)])
    priority = models.IntegerField(default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    isBookmarked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
