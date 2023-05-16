from rest_framework import serializers

from .models import Notification

class NotificationSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Notification
        fields = ['id', 'user', 'title', 'body', 'created_at', 'updated_at']
