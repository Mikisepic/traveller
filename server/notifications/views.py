from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination

from .models import Notification
from .serializers import NotificationSerializer

class NotificationCreateAPIView(ListCreateAPIView):
    pagination_class = PageNumberPagination
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

class NotificationDetailsAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()