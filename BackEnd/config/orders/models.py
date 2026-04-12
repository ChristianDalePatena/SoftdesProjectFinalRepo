import uuid
from django.db import models
from django.conf import settings


def generate_order_code():
    from django.utils import timezone
    date_str = timezone.now().strftime("%Y%m%d")
    unique   = uuid.uuid4().hex[:4].upper()
    return f"ORD-{date_str}-{unique}"


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING    = "pending",    "Pending"
        PROCESSING = "processing", "Processing"
        COMPLETED  = "completed",  "Completed"
        CANCELLED  = "cancelled",  "Cancelled"

    class DeliveryType(models.TextChoices):
        PICKUP   = "pickup",   "Pickup"
        DELIVERY = "delivery", "Delivery"

    class PaymentMethod(models.TextChoices):
        GCASH    = "gcash",    "GCash"
        MAYA     = "maya",     "Maya"
        BPI      = "bpi",      "BPI"
        COINSPH  = "coinsph",  "Coins.ph"
        PAYPAL   = "paypal",   "PayPal"
        EASTWEST = "eastwest", "EastWest"
        BANK     = "bank",     "Bank Transfer"
        CASH     = "cash",     "Cash on Pickup"

    # Core
    order_code = models.CharField(
        max_length=20, unique=True, default=generate_order_code
    )
    user   = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )

    # Delivery ← Orders.jsx modal + Shared.jsx DeliverySection
    delivery_type = models.CharField(
        max_length=20, choices=DeliveryType.choices, default=DeliveryType.PICKUP
    )
    address      = models.TextField(blank=True)

    # Payment ← Orders.jsx modal payment section
    payment_method    = models.CharField(
        max_length=20, choices=PaymentMethod.choices, blank=True
    )
    payment_reference = models.CharField(max_length=100, blank=True)

    # Pricing ← Orders.jsx modal price breakdown
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_price  = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Admin ← AdminDashboard "Internal Notes"
    admin_notes = models.TextField(blank=True)

    # Controls Edit/Cancel buttons ← Orders.jsx canEdit
    # Automatically False when status != Pending
    @property
    def can_edit(self):
        return self.status == self.Status.PENDING

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.order_code} — {self.user.email}"


class OrderItem(models.Model):
    """
    One row per product in an order.
    options JSONField mirrors exactly what each OrderForm collects.

    Mug example:
    {
        "mug_type":      "Classic White Mug",
        "print_area":    "Front Only",
        "design_size":   "Medium",
        "orientation":   "Landscape",
        "custom_text":   "Happy Birthday!",
        "font_style":    "Sans",
        "text_color":    "#000000",
        "with_box":      false,
        "instructions":  "Center the logo please"
    }
    """
    order          = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    service        = models.ForeignKey("shop.Service", on_delete=models.PROTECT, related_name="order_items")
    quantity       = models.PositiveIntegerField(default=1)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    options        = models.JSONField(default=dict, blank=True)

    @property
    def subtotal(self):
        return self.quantity * self.price_per_unit

    def __str__(self):
        return f"{self.service.name} x{self.quantity} → {self.order.order_code}"


class OrderFile(models.Model):
    """Design files uploaded per order ← AdminDashboard download file button"""
    class FileType(models.TextChoices):
        PDF   = "pdf",   "PDF"
        PNG   = "png",   "PNG"
        JPG   = "jpg",   "JPG"
        OTHER = "other", "Other"

    order       = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="files")
    file        = models.FileField(upload_to="order_files/")
    file_name   = models.CharField(max_length=255, blank=True)  # e.g. "team_logo.png"
    file_type   = models.CharField(max_length=10, choices=FileType.choices, default=FileType.OTHER)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto-fill file_name from uploaded file
        if self.file and not self.file_name:
            self.file_name = self.file.name.split("/")[-1]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.file_name} → {self.order.order_code}"


class SavedDesign(models.Model):
    """AccountLogin 'Saved Designs' tab"""
    class FileType(models.TextChoices):
        PDF   = "pdf",   "PDF"
        PNG   = "png",   "PNG"
        JPG   = "jpg",   "JPG"
        OTHER = "other", "Other"

    user        = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_designs"
    )
    name        = models.CharField(max_length=255)       # "Company Logo V2"
    file        = models.FileField(upload_to="saved_designs/")
    file_type   = models.CharField(max_length=10, choices=FileType.choices)
    file_size   = models.CharField(max_length=20, blank=True)  # "2.4 MB"
    preview_url = models.URLField(blank=True)             # thumbnail for grid display
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.user.email})"