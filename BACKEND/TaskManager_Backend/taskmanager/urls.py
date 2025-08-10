from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TaskViewSet
from rest_framework.authtoken.views import obtain_auth_token

# Router automatically generates CRUD routes
router = DefaultRouter()
router.register(r'Users', UserViewSet)
router.register(r'Tasks', TaskViewSet)

urlpatterns = [
    path('api/data/', include(router.urls)),
    path('api/token/', obtain_auth_token),  # Login: returns token
]
