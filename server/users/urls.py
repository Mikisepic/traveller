from rest_framework.routers import DefaultRouter

from users.user.viewsets import UserViewSet
from users.auth.viewsets import RegistrationViewSet, RefreshViewSet, LoginViewSet

routes = DefaultRouter()

routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]