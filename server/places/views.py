from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Place
from .serializers import PlaceSerializer

class PlaceCreateAPIView(ListCreateAPIView):
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['isBookmarked']

    def get_queryset(self):
        queryset = Place.objects.all()
        paginate = self.request.query_params.get('paginate', 'true')
        
        if paginate.lower() == 'false':
            self.pagination_class = None
        return queryset

class PlaceDetailsAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.title = request.data.get('title', instance.title)
        instance.description = request.data.get('description', instance.description)
        instance.isBookmarked = request.data.get('isBookmarked', instance.isBookmarked)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
