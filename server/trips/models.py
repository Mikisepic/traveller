import uuid

from django.contrib.auth.models import User
from django.db import models

from places.models import Place

class Trip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name='trips', on_delete=models.CASCADE, default=None)
    locations = models.ManyToManyField(Place)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
