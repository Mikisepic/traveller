from django.db import models

import uuid

from places.models import Place

class Trip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    locations = models.ManyToManyField(Place, related_name="trips")
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
