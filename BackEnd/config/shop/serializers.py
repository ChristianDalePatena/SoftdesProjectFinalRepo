from rest_framework import serializers
from .models import Category, Service


class ServiceListSerializer(serializers.ModelSerializer):
    """
    Lightweight — used in Shop.jsx product grid
    Shows just enough to render a product card
    """
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model  = Service
        fields = [
            "id", "name", "slug", "category_name",
            "base_price", "is_available", "thumbnail",
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    """
    Full detail — used in ProductPage.jsx
    Includes options_schema so frontend knows
    what fields to render in each OrderForm
    """
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)

    class Meta:
        model  = Service
        fields = [
            "id", "name", "slug",
            "category_name", "category_slug",
            "description", "base_price",
            "is_available", "thumbnail",
            "options_schema", "created_at",
        ]


class CategorySerializer(serializers.ModelSerializer):
    """
    Category with all its services nested inside
    Used in Shop.jsx to group products by category
    """
    services = ServiceListSerializer(many=True, read_only=True)

    class Meta:
        model  = Category
        fields = ["id", "name", "slug", "order", "services"]