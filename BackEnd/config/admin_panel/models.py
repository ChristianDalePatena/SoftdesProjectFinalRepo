from django.db import models


class StoreSettings(models.Model):
    """
    Singleton model — only one row ever exists.
    AdminDashboard Settings tab.
    """
    store_name    = models.CharField(max_length=100, default="Pick2Print")
    contact_email = models.EmailField(default="admin@pick2print.com")
    contact_phone = models.CharField(max_length=20, default="0947-463-1561")

    # Notification preferences
    email_notifications = models.BooleanField(default=True)
    sms_notifications   = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "Store Settings"
        verbose_name_plural = "Store Settings"

    def __str__(self):
        return self.store_name

    @classmethod
    def get_settings(cls):
        """Always returns the single settings row, creates if missing."""
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj