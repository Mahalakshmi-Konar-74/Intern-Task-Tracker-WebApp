from rest_framework import viewsets, permissions
from .models import Tasks
from .serializers import TasksSerializer, UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# API for registering new users
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Anyone can register

# API for tasks
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users

    # Filter tasks by status or assigned user
    def get_queryset(self):
        queryset = Tasks.objects.all()

        # Read query params like /api/tasks/?status=Pending
        status = self.request.query_params.get('status')
        assigned_to = self.request.query_params.get('assigned_to')

        if status:
            queryset = queryset.filter(status=status)
        if assigned_to:
            queryset = queryset.filter(assigned_to__id=assigned_to)

        return queryset

    # When creating a task, set the assigned user to the current user
    def perform_create(self, serializer):
        serializer.save(assigned_to=self.request.user)
