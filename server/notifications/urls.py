from django.urls import path

from . import views

urlpatterns = [
    path('', views.NotificationCreateAPIView.as_view()),
    path('<uuid:pk>', views.NotificationDetailsAPIView.as_view()),
]
