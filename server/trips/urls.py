from django.urls import include, path

from rest_framework.routers import DefaultRouter

from trips.views import TripViewSet

router = DefaultRouter()
router.register('', TripViewSet, basename='trip')

urlpatterns = [
    path('', include(router.urls))
]
