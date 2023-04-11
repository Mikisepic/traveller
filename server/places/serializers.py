from django.core.validators import MaxValueValidator, MinValueValidator

from rest_framework import serializers

from .models import Place

class PlaceSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True, format='hex_verbose')
    title = serializers.CharField(required=True, allow_blank=False, max_length=50)
    description = serializers.CharField(required=False, allow_blank=True, max_length=256)
    lat = serializers.DecimalField(max_digits=8, decimal_places=6, validators=[MaxValueValidator(90.000000), MinValueValidator(-90.000000)])
    lng = serializers.DecimalField(max_digits=9, decimal_places=6, validators=[MaxValueValidator(180.000000), MinValueValidator(-180.000000)])
    priority = serializers.IntegerField(default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    isBookmarked = serializers.BooleanField(required=False, default=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Place
        fields = ['id', 'title', 'description', 'lat', 'lng', 'priority', 'isBookmarked', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        return Place.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.isBookmarked = validated_data.get('isBookmarked', instance.isBookmarked)
        instance.save()
        return instance
