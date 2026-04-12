from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Extra Info", {
            "fields": ("full_name", "phone", "address", "avatar", "role",
                       "email_notifications", "sms_notifications")
        }),
    )
    list_display  = ("email", "full_name", "role", "is_active", "date_joined")
    list_filter   = ("role", "is_active")
    search_fields = ("email", "full_name", "phone")