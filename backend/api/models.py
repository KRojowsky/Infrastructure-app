from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    ROLE_CHOICES = (
        ('community', 'Społeczność'),
        ('authority', 'Władze terytorialne'),
    )

    AREA_CHOICES = (
        ('energy', 'Energetyka'),
        ('water', 'Woda / kanalizacja'),
        ('road', 'Infrastruktura drogowa'),
        ('other', 'Inne'),
    )

    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/avatar.svg', blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    office_name = models.CharField(max_length=150, blank=True, null=True)
    area = models.CharField(max_length=50, choices=AREA_CHOICES, blank=True, null=True)  # <--- nowe pole

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.first_name} {self.last_name})"


class Report(models.Model):
    CATEGORY_CHOICES = [
        ('energy', 'Energetyka'),
        ('water', 'Woda / kanalizacja'),
        ('road', 'Infrastruktura drogowa'),
        ('other', 'Inne'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Oczekujące'),
        ('in-progress', 'W trakcie'),
        ('done', 'Zakończone'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Niski'),
        ('medium', 'Średni'),
        ('high', 'Wysoki'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reports')
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='low')

    def __str__(self):
        return self.title


class ReportImage(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='report_images/')


class ReportLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'report')


class ReportComment(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)