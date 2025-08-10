from rest_framework import serializers
from .models import Tasks
from django.contrib.auth.models import User

# Serializer for user data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Don't show password in GET requests
        }

    # Override create method so passwords are hashed
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

# Serializer for tasks
class TasksSerializer(serializers.ModelSerializer):
    assigned_to = serializers.StringRelatedField(read_only=True)  # Shows username

    class Meta:
        model = Tasks
        fields = '__all__'
