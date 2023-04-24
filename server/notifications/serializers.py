from rest_framework import serializers

from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True, format='hex_verbose')
    title = serializers.CharField(required=True, allow_blank=False, max_length=50)
    body = serializers.CharField(required=False, allow_blank=True, max_length=256)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'title', 'body', 'created_at', 'updated_at']

    def create(self, validated_data):
        return Notification.objects.create(**validated_data)