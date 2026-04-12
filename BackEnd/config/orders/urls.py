from django.urls import path
from .views import (
    OrderListCreateView,
    OrderDetailView,
    OrderCancelView,
    OrderFileUploadView,
    OrderStatusView,
    OrderHistoryView,
    SavedDesignListCreateView,
    SavedDesignDeleteView,
)

urlpatterns = [
    # Orders ← Orders.jsx
    path("",                                   OrderListCreateView.as_view(), name="order-list-create"),
    path("history/",                           OrderHistoryView.as_view(),    name="order-history"),
    path("<str:order_code>/",                  OrderDetailView.as_view(),     name="order-detail"),
    path("<str:order_code>/status/",           OrderStatusView.as_view(),     name="order-status"),
    path("<str:order_code>/cancel/",           OrderCancelView.as_view(),     name="order-cancel"),
    path("<str:order_code>/upload/",           OrderFileUploadView.as_view(), name="order-file-upload"),

    # Saved Designs ← AccountLogin.jsx
    path("designs/",                           SavedDesignListCreateView.as_view(), name="saved-designs"),
    path("designs/<int:pk>/",                  SavedDesignDeleteView.as_view(),     name="saved-design-delete"),
]