from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination

from .models import Trip
from .serializers import TripSerializer

class TripCreateAPIView(ListCreateAPIView):
    serializer_class = TripSerializer
    pagination_class = PageNumberPagination
    queryset = Trip.objects.all()

class TripDetailsAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()
