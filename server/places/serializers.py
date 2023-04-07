from rest_framework import serializers

from .models import Place

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'title',  'description', 'lat', 'lng', 'isBookmarked')