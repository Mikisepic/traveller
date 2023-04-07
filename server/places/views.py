from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Place
from .serializers import PlaceSerializer

class PlaceCreateAPIView(ListCreateAPIView):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

class PlaceDetailsAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()
