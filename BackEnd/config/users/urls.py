from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    ProfileView,
    GoogleOAuthView,
    FacebookOAuthView,
)

urlpatterns = [
    # Email/Password Auth ← signin.jsx
    path("register/", RegisterView.as_view(),  name="auth-register"),
    path("login/",    LoginView.as_view(),     name="auth-login"),
    path("logout/",   LogoutView.as_view(),    name="auth-logout"),

    # JWT token refresh
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),

    # Profile ← AccountLogin.jsx
    path("profile/", ProfileView.as_view(), name="auth-profile"),

    # OAuth ← signin.jsx Google/Facebook buttons
    path("google/",   GoogleOAuthView.as_view(),   name="auth-google"),
    path("facebook/", FacebookOAuthView.as_view(), name="auth-facebook"),
]