from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('community', 'Społeczność'),
        ('authority', 'Władze terytorialne'),
    )

    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    office_name = models.CharField(max_length=150, blank=True, null=True)  # tylko dla władz

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.first_name} {self.last_name})"
