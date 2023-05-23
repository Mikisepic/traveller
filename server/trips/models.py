import uuid
import shortuuid

from django.db import models

from users.user.models import User
from places.models import Place

class Trip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name='trips', on_delete=models.CASCADE, default=None)
    locations = models.ManyToManyField(Place)
    title = models.CharField(max_length=50)
    shortened_url = models.CharField(max_length=10, unique=True, editable=False)
    visible = models.BooleanField(default=False)
    description = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def save(self, *args, **kwargs):
        if not self.shortened_url:
            self.shortened_url = shortuuid.uuid()[:10]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
