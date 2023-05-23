from rest_framework import serializers

from places.models import Place
from trips.models import Trip

class TripSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    locations = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), many=True)
    # locations = serializers.HyperlinkedRelatedField(many=True, view_name='place-detail', read_only=True)

    class Meta:
        model = Trip
        fields = ['id', 'user', 'locations', 'title', 'shortened_url', 'visible', 'description', 'created_at', 'updated_at']
