from django.urls import path
from . import views

urlpatterns = [
    path('weekly/', views.WeeklyForecastView.as_view(), name='weekly-forecast'),
]