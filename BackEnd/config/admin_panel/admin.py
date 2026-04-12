from django.contrib import admin
from .models import StoreSettings


@admin.register(StoreSettings)
class StoreSettingsAdmin(admin.ModelAdmin):
    list_display = ("store_name", "contact_email", "contact_phone", "updated_at")

    def has_add_permission(self, request):
        # Prevent creating more than one settings row
        return not StoreSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False