from django.urls import path
from .views import (
    CategoryListView,
    ServiceListView,
    ServiceDetailView,
    ServiceCreateView,
    ServiceUpdateView,
)

urlpatterns = [
    # Public endpoints ← Shop.jsx + ProductPage.jsx
    path("categories/",           CategoryListView.as_view(),  name="shop-categories"),
    path("services/",             ServiceListView.as_view(),   name="shop-services"),
    path("services/<slug:slug>/", ServiceDetailView.as_view(), name="shop-service-detail"),

    # Admin only endpoints
    path("services/create/",            ServiceCreateView.as_view(), name="shop-service-create"),
    path("services/<slug:slug>/edit/",  ServiceUpdateView.as_view(), name="shop-service-edit"),
]