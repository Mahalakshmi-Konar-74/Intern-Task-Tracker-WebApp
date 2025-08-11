from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
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

    def get_queryset(self):
        queryset = Tasks.objects.all()
        status = self.request.query_params.get('status')
        assigned_to = self.request.query_params.get('assigned_to')

        if status:
            queryset = queryset.filter(status=status)
        if assigned_to:
            queryset = queryset.filter(assigned_to__id=assigned_to)

        return queryset

    def perform_create(self, serializer):
        serializer.save(assigned_to=self.request.user)

# API for getting the current user's profile
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def profile_view(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# API for registering a new user (matches React Register.js)
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
