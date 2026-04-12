from django.contrib import admin
from .models import Order, OrderItem, OrderFile, SavedDesign


class OrderItemInline(admin.TabularInline):
    model  = OrderItem
    extra  = 0
    fields = ("service", "quantity", "price_per_unit", "options")


class OrderFileInline(admin.TabularInline):
    model  = OrderFile
    extra  = 0
    fields = ("file_name", "file_type", "uploaded_at")
    readonly_fields = ("uploaded_at",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display   = ("order_code", "user", "status", "delivery_type", "total_price", "created_at")
    list_filter    = ("status", "delivery_type", "payment_method")
    search_fields  = ("order_code", "user__email", "user__full_name")
    readonly_fields = ("order_code", "created_at", "updated_at")
    inlines        = [OrderItemInline, OrderFileInline]


@admin.register(SavedDesign)
class SavedDesignAdmin(admin.ModelAdmin):
    list_display  = ("name", "user", "file_type", "file_size", "created_at")
    search_fields = ("name", "user__email")