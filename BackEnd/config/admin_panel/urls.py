from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.AdminOrderListView.as_view(), name='admin-order-list'),
    path('orders/<str:order_code>/', views.AdminOrderUpdateView.as_view(), name='admin-order-update'),
    path('dashboard/stats/', views.DashboardStatsView.as_view(), name='admin-dashboard-stats'),
    path('customers/', views.AdminCustomerListView.as_view(), name='admin-customer-list'),
    path('settings/', views.StoreSettingsView.as_view(), name='admin-settings'),
]