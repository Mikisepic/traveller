from django.urls import path

from . import views

urlpatterns = [
    path('', views.PlaceCreateAPIView.as_view()),
    path('<uuid:pk>', views.PlaceDetailsAPIView.as_view()),
]
