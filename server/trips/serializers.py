from rest_framework import serializers

from .models import Trip
from places.models import Place
from places.serializers import PlaceSerializer

class TripSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True, format='hex_verbose')
    title = serializers.CharField(required=True, allow_blank=False, max_length=50)
    description = serializers.CharField(required=False, allow_blank=True, max_length=256)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    locations = PlaceSerializer(many=True)

    class Meta:
        model = Trip
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'locations']

    def create(self, validated_data):
        locations_data = validated_data.pop('locations')

        trip = Trip(**validated_data)
        trip.save()

        for location_data in locations_data:
            location = Place.objects.create(**location_data)
            trip.locations.add(location)

        return trip


    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)

        locations_data = validated_data.pop('locations')
        for location_data in locations_data:
            location = Place.objects.create(**location_data)
            instance.locations.add(location)

        instance.save()
        return instance