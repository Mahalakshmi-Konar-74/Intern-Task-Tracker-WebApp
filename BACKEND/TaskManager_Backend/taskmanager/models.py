from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    role = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
    
class Tasks(models.Model):
    task_name = models.CharField(max_length=50,db_index=True)
    description = models.TextField(max_length=200)
    status_choices = [('Pending','Pending'),('In Progress','In Progress'),('Completed','Completed')]
    status = models.CharField(max_length=50,choices=status_choices,default='Pending')
    deadline = models.DateField()
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.task_name
