from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum, Count
from datetime import timedelta
from orders.models import Order, OrderItem
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from orders.models import Order
from .serializers import AdminOrderSerializer
from users.models import User
from .models import StoreSettings
from .serializers import AdminCustomerSerializer, StoreSettingsSerializer
from django.db.models import Sum, Count, Q
from django.db import models
from django.db.models.functions import Coalesce
from django.utils import timezone


class AdminOrderListView(generics.ListAPIView):
    """
    GET /api/admin-panel/orders/
    Returns all orders formatted for the Admin Dashboard table.
    """
    # prefetch_related makes the query fast and prevents N+1 database hits
    queryset = Order.objects.select_related('user').prefetch_related('items__service', 'files').all().order_by('-created_at')
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdminUser]


class AdminOrderUpdateView(generics.UpdateAPIView):
    """
    PATCH /api/admin-panel/orders/<order_code>/
    Updates order status and admin_notes from the modal.
    """
    queryset = Order.objects.all()
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'order_code'


class DashboardStatsView(APIView):
    """
    GET /api/admin/dashboard/stats/
    Returns aggregated revenue, order trends, and top services for the React dashboard.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        today = timezone.localtime(timezone.now())
        
        # We only want to count revenue from active/completed orders (ignore cancelled)
        valid_statuses = ['pending', 'processing', 'completed']

        # --- 1. REVENUE CALCULATIONS ---
        # Daily (Today)
        daily_orders = Order.objects.filter(created_at__date=today.date(), status__in=valid_statuses)
        daily_revenue = daily_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0

        # Weekly (Last 7 Days)
        week_ago = today - timedelta(days=7)
        weekly_orders = Order.objects.filter(created_at__gte=week_ago, status__in=valid_statuses)
        weekly_revenue = weekly_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0

        # Monthly (Current Month)
        monthly_orders = Order.objects.filter(
            created_at__year=today.year, 
            created_at__month=today.month, 
            status__in=valid_statuses
        )
        monthly_revenue = monthly_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0

        # --- 2. ORDER VOLUME TREND (Past 7 Days) ---
        trend_data = []
        for i in range(6, -1, -1):
            day = today - timedelta(days=i)
            count = Order.objects.filter(created_at__date=day.date()).count()
            trend_data.append({
                "label": day.strftime('%a'),  # Returns 'Mon', 'Tue', etc.
                "value": count
            })

        # --- 3. TOP SERVICES (Percentage Breakdown) ---
        total_items = OrderItem.objects.count()
        # Group by service name, count them, order highest to lowest, grab top 4
        top_services_qs = OrderItem.objects.values('service__name').annotate(total=Count('id')).order_by('-total')[:4]
        
        top_services = []
        for item in top_services_qs:
            percentage = round((item['total'] / total_items) * 100) if total_items > 0 else 0
            top_services.append({
                "name": item['service__name'],
                "percentage": percentage
            })

        # --- 4. REVENUE TREND (Past 30 Days for Line Chart) ---
        revenue_trend = []
        for i in range(29, -1, -1):
            day = today - timedelta(days=i)
            daily_sum = Order.objects.filter(
                created_at__date=day.date(), 
                status__in=valid_statuses
            ).aggregate(Sum('total_price'))['total_price__sum'] or 0
            
            revenue_trend.append({
                "day": day.day,  # Just the day number for the x-axis
                "value": float(daily_sum)
            })

        # --- SEND JSON TO REACT ---
        return Response({
            "dailyRevenue": float(daily_revenue),
            "weeklyRevenue": float(weekly_revenue),
            "monthlyRevenue": float(monthly_revenue),
            "trendData": trend_data,
            "topServices": top_services,
            "revenueTrend": revenue_trend
        })


class AdminCustomerListView(generics.ListAPIView):
    """
    GET /api/admin/customers/
    Returns all customers with their total order count and lifetime spent.
    """
    permission_classes = [IsAdminUser]
    serializer_class = AdminCustomerSerializer

    def get_queryset(self):
        valid_statuses = ['pending', 'processing', 'completed']
        
        # Filter only customers, then annotate with aggregated data
        return User.objects.filter(role=User.Role.CUSTOMER).annotate(
            # CHANGED: 'orders' is now 'total_orders'
            total_orders=Count('orders', filter=Q(orders__status__in=valid_statuses)),
            spent=Coalesce(Sum('orders__total_price', filter=Q(orders__status__in=valid_statuses)), 0.0, output_field=models.DecimalField())
        ).order_by('-date_joined')


class StoreSettingsView(generics.RetrieveUpdateAPIView):
    """
    GET /api/admin/settings/
    PATCH /api/admin/settings/
    Retrieves or updates the single StoreSettings instance.
    """
    permission_classes = [IsAdminUser]
    serializer_class = StoreSettingsSerializer

    def get_object(self):
        # We use the class method you built in the model to guarantee only 1 row exists
        return StoreSettings.get_settings()