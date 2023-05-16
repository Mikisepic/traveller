from rest_framework import serializers

from places.models import Place
from trips.models import Trip
from notifications.models import Notification
from users.user.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    places = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), many=True)
    trips = serializers.PrimaryKeyRelatedField(queryset=Trip.objects.all(), many=True)
    notifications = serializers.PrimaryKeyRelatedField(queryset=Notification.objects.all(), many=True)
    
    # places = serializers.HyperlinkedRelatedField(many=True, view_name='place-detail', read_only=True)
    # trips = serializers.HyperlinkedRelatedField(many=True, view_name='trip-detail', read_only=True)
    # notifications = serializers.HyperlinkedRelatedField(many=True, view_name='notification-detail', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'created', 'updated', 'places', 'trips', 'notifications']
        read_only_field = ['is_active', 'created', 'updated']
