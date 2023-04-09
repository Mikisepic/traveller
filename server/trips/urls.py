from django.urls import path

from . import views

urlpatterns = [
    path('', views.TripCreateAPIView.as_view()),
    path('<uuid:pk>', views.TripDetailsAPIView.as_view()),
]
