from django.urls import include, path

from rest_framework.routers import DefaultRouter

from trips.views import TripViewSet, redirect_to_trip

router = DefaultRouter()
router.register('', TripViewSet, basename='trip')

urlpatterns = [
    path('', include(router.urls)),
    path('<str:shortened_url>', redirect_to_trip, name='redirect-to-trip'),
]
