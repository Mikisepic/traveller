from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden

from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from places.models import Place
from trips.models import Trip
from trips.permissions import IsOwnerOrReadOnly
from trips.serializers import TripSerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    pagination_class = PageNumberPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        locations_data = self.request.data.pop('locations', [])
        instance = serializer.save()

        for location_data in locations_data:
            location = Place.objects.get(id=location_data['id'])
            instance.locations.add(location)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly])
def redirect_to_trip(request, shortened_url):
    instance = get_object_or_404(Trip, shortened_url=shortened_url)
    if instance.visible:
      serializer = TripSerializer(instance)
      serialized_data = serializer.data
      return Response(serialized_data)
    return HttpResponseForbidden('Trip is private')
