from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        CUSTOMER = "customer", "Customer"
        ADMIN    = "admin",    "Admin"

    # Override first_name/last_name with single full_name
    full_name = models.CharField(max_length=150, blank=True)
    phone     = models.CharField(max_length=20, blank=True)
    address   = models.TextField(blank=True)
    avatar    = models.URLField(blank=True)
    role      = models.CharField(max_length=20, choices=Role.choices, default=Role.CUSTOMER)

    # AccountLogin settings tab
    email_notifications = models.BooleanField(default=True)
    sms_notifications   = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.email} ({self.role})"