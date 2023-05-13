from django.contrib.auth.models import User

from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    # places = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), many=True)
    # trips = serializers.PrimaryKeyRelatedField(queryset=Trip.objects.all(), many=True)
    # notifications = serializers.PrimaryKeyRelatedField(queryset=Notification.objects.all(), many=True)
    
    places = serializers.HyperlinkedRelatedField(many=True, view_name='place-detail', read_only=True)
    trips = serializers.HyperlinkedRelatedField(many=True, view_name='trip-detail', read_only=True)
    notifications = serializers.HyperlinkedRelatedField(many=True, view_name='notification-detail', read_only=True)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'places', 'trips', 'notifications']
