from rest_framework import serializers
from .models import Order, OrderItem, OrderFile, SavedDesign
from shop.models import Service
from users.serializers import UserMiniSerializer


class OrderFileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = OrderFile
        fields = ["id", "file", "file_name", "file_type", "uploaded_at"]
        read_only_fields = ["file_name", "uploaded_at"]


class OrderItemSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source="service.name", read_only=True)
    service_slug = serializers.CharField(source="service.slug", read_only=True)
    subtotal     = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )

    class Meta:
        model  = OrderItem
        fields = [
            "id", "service", "service_name", "service_slug",
            "quantity", "price_per_unit", "subtotal", "options",
        ]


class OrderListSerializer(serializers.ModelSerializer):
    """
    Lightweight — used in Orders.jsx order list cards
    Matches: id, date, status, total, items[], canEdit
    """
    items    = OrderItemSerializer(many=True, read_only=True)
    can_edit = serializers.BooleanField(read_only=True)
    date     = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model  = Order
        fields = [
            "id", "order_code", "date", "status",
            "delivery_type", "total_price", "items", "can_edit",
        ]


class OrderDetailSerializer(serializers.ModelSerializer):
    """
    Full detail — used in Orders.jsx "View Details" modal
    Matches all fields shown in the modal
    """
    items    = OrderItemSerializer(many=True, read_only=True)
    files    = OrderFileSerializer(many=True, read_only=True)
    can_edit = serializers.BooleanField(read_only=True)
    user     = UserMiniSerializer(read_only=True)

    class Meta:
        model  = Order
        fields = [
            "id", "order_code", "user", "status",
            "delivery_type", "address",
            "payment_method", "payment_reference",
            "shipping_fee", "total_price",
            "admin_notes", "can_edit",
            "items", "files",
            "created_at", "updated_at",
        ]


class OrderItemCreateSerializer(serializers.Serializer):
    """Used when creating an order item"""
    service_slug   = serializers.SlugField()
    quantity       = serializers.IntegerField(min_value=1)
    price_per_unit = serializers.DecimalField(max_digits=10, decimal_places=2)
    options        = serializers.DictField(default=dict)

    def validate_service_slug(self, value):
        try:
            Service.objects.get(slug=value, is_available=True)
        except Service.DoesNotExist:
            raise serializers.ValidationError(
                f"Service '{value}' not found or unavailable."
            )
        return value


class OrderCreateSerializer(serializers.Serializer):
    """
    Used when customer submits order
    ← SummaryCard "Submit Order →" button
    """
    items             = OrderItemCreateSerializer(many=True)
    delivery_type     = serializers.ChoiceField(
        choices=["pickup", "delivery"], default="pickup"
    )
    address           = serializers.CharField(required=False, allow_blank=True)
    payment_method    = serializers.ChoiceField(
        choices=["gcash", "maya", "bpi", "coinsph", "paypal", "eastwest", "bank", "cash"],
        default="cash"
    )
    payment_reference = serializers.CharField(required=False, allow_blank=True)
    shipping_fee      = serializers.DecimalField(
        max_digits=10, decimal_places=2, default=0
    )

    def validate(self, data):
        # Require address if delivery
        if data.get("delivery_type") == "delivery" and not data.get("address"):
            raise serializers.ValidationError(
                {"address": "Address is required for delivery orders."}
            )
        return data


class SavedDesignSerializer(serializers.ModelSerializer):
    """
    AccountLogin.jsx → Saved Designs tab
    """
    class Meta:
        model  = SavedDesign
        fields = [
            "id", "name", "file", "file_type",
            "file_size", "preview_url", "created_at"
        ]
        read_only_fields = ["created_at"]


class OrderStatusSerializer(serializers.ModelSerializer):
    """
    Used for order status tracking
    ← Orders.jsx status badges
    """
    can_edit = serializers.BooleanField(read_only=True)

    class Meta:
        model  = Order
        fields = [
            "order_code", "status", "can_edit",
            "created_at", "updated_at",
        ]