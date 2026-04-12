from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import Category, Service
from .serializers  import (CategorySerializer, ServiceListSerializer, ServiceDetailSerializer,)


class CategoryListView(generics.ListAPIView):
    """
    GET /api/shop/categories/
    Returns all categories with their services nested
    Shop.jsx → group products by category (folders 1-5)
    """
    queryset           = Category.objects.prefetch_related("services").all()
    serializer_class   = CategorySerializer
    permission_classes = [AllowAny]


class ServiceListView(generics.ListAPIView):
    """
    GET /api/shop/services/
    GET /api/shop/services/?category=cat-1
    GET /api/shop/services/?available=true
    Returns flat list of all 27 services
    """
    serializer_class   = ServiceListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Service.objects.select_related("category").all()

        # Filter by category slug
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__slug=category)

        # Filter by availability
        available = self.request.query_params.get("available")
        if available == "true":
            queryset = queryset.filter(is_available=True)

        return queryset


class ServiceDetailView(generics.RetrieveAPIView):
    """
    GET /api/shop/services/<slug>/
    e.g. GET /api/shop/services/mug/
    ProductPage.jsx → load product details + options
    """
    queryset           = Service.objects.select_related("category").all()
    serializer_class   = ServiceDetailSerializer
    permission_classes = [AllowAny]
    lookup_field       = "slug"        # ← matches /product/:name in your React router


# ── Admin Only ────────────────────────────────────────────────────────────────

class ServiceCreateView(generics.CreateAPIView):
    """
    POST /api/shop/services/create/
    Admin creates a new service/product
    """
    queryset           = Service.objects.all()
    serializer_class   = ServiceDetailSerializer
    permission_classes = [IsAdminUser]


class ServiceUpdateView(generics.RetrieveUpdateDestroyAPIView):
    """
    PUT    /api/shop/services/<slug>/edit/
    PATCH  /api/shop/services/<slug>/edit/
    DELETE /api/shop/services/<slug>/edit/
    Admin edits or deletes a service
    """
    queryset           = Service.objects.all()
    serializer_class   = ServiceDetailSerializer
    permission_classes = [IsAdminUser]
    lookup_field       = "slug"
