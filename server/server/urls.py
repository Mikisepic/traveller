from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/places/', include('places.urls')),
    path('api/trips/', include('trips.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/users/', include('users.urls')),
]
