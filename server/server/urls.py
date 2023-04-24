from django.contrib import admin
from django.urls import include, path, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/places/', include('places.urls')),
    re_path(r'^api/trips/', include('trips.urls')),
    re_path(r'^api/notifications/', include('notifications.urls')),
]
