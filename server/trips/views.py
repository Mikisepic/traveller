from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Trip
from places.models import Place
from .serializers import TripSerializer

class TripCreateAPIView(ListCreateAPIView):
    serializer_class = TripSerializer
    pagination_class = PageNumberPagination
    queryset = Trip.objects.all()

class TripDetailsAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.title = request.data.get('title', instance.title)
        instance.description = request.data.get('description', instance.description)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
