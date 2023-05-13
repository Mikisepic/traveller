from rest_framework import serializers

from places.models import Place

class PlaceSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Place
        fields = ['id', 'user', 'title', 'description', 'lat', 'lng', 'priority', 'isBookmarked', 'created_at', 'updated_at']
