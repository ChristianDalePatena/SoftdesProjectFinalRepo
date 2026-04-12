from django.db import models


class Category(models.Model):
    name  = models.CharField(max_length=100)
    slug  = models.SlugField(unique=True)   # e.g. "cat-1", "cat-2"
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["order"]

    def __str__(self):
        return self.name


class Service(models.Model):
    category     = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="services")
    name         = models.CharField(max_length=100)     # e.g. "Mug"
    slug         = models.SlugField(unique=True)        # e.g. "mug" ← matches /product/:name
    description  = models.TextField(blank=True)
    base_price   = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)
    thumbnail    = models.URLField(blank=True)          # AccountLogin order history image

    # Stores product-specific options
    # e.g. for Mug:
    # {
    #   "types":        ["Classic White Mug", "Magic Mug", "Glass Mug", "Colored Mug"],
    #   "print_areas":  ["Front Only", "Full Wrap", "Front & Back"],
    #   "design_sizes": ["Small Logo", "Medium", "Full Wrap"],
    #   "extras": {
    #       "magic_mug_extra": 50,
    #       "box_extra": 20
    #   }
    # }
    options_schema = models.JSONField(default=dict, blank=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} (₱{self.base_price})"