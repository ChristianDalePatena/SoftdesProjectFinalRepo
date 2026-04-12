from django.contrib import admin
from .models import Category, Service


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display  = ("name", "slug", "order")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display  = ("name", "category", "base_price", "is_available")
    list_filter   = ("category", "is_available")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}