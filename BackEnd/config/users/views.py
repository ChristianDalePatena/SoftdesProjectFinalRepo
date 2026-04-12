from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserProfileSerializer,
)

User = get_user_model()


def get_tokens_for_user(user):
    """Returns JWT access + refresh tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access":  str(refresh.access_token),
    }


class RegisterView(APIView):
    """
    POST /api/auth/register/
    signin.jsx → Create Account form
    Body: { full_name, email, phone, password }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user   = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                "user":   UserProfileSerializer(user).data,
                "tokens": tokens,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    POST /api/auth/login/
    signin.jsx → Log-in form
    Body: { email, password }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email    = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        # Find user by email
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Authenticate
        user = authenticate(request, username=user_obj.username, password=password)
        if not user:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            return Response(
                {"error": "Account is disabled."},
                status=status.HTTP_403_FORBIDDEN
            )

        tokens = get_tokens_for_user(user)
        return Response({
            "user":   UserProfileSerializer(user).data,
            "tokens": tokens,
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """
    POST /api/auth/logout/
    Blacklists the refresh token.
    Body: { refresh }
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Logged out successfully."},
                status=status.HTTP_200_OK
            )
        except Exception:
            return Response(
                {"error": "Invalid token."},
                status=status.HTTP_400_BAD_REQUEST
            )


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    GET  /api/auth/profile/  → AccountLogin.jsx load profile
    PUT  /api/auth/profile/  → AccountLogin.jsx save profile
    PATCH /api/auth/profile/ → partial update
    """
    serializer_class   = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class GoogleOAuthView(APIView):
    """
    POST /api/auth/google/
    signin.jsx → Google button
    Body: { access_token }  ← token from Google OAuth on frontend
    """
    permission_classes = [AllowAny]

    def post(self, request):
        import requests as http_requests

        access_token = request.data.get("access_token")
        if not access_token:
            return Response(
                {"error": "Access token required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verify token with Google
        google_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        response   = http_requests.get(
            google_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )

        if response.status_code != 200:
            return Response(
                {"error": "Invalid Google token."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        google_data = response.json()
        email       = google_data.get("email")
        full_name   = google_data.get("name", "")
        avatar      = google_data.get("picture", "")

        if not email:
            return Response(
                {"error": "Could not retrieve email from Google."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get or create user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username":  email,
                "full_name": full_name,
                "avatar":    avatar,
                "role":      "customer",
            }
        )

        # Update avatar if returning user
        if not created and avatar:
            user.avatar = avatar
            user.save()

        tokens = get_tokens_for_user(user)
        return Response({
            "user":    UserProfileSerializer(user).data,
            "tokens":  tokens,
            "created": created,
        }, status=status.HTTP_200_OK)


class FacebookOAuthView(APIView):
    """
    POST /api/auth/facebook/
    signin.jsx → Facebook button
    Body: { access_token }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        import requests as http_requests

        access_token = request.data.get("access_token")
        if not access_token:
            return Response(
                {"error": "Access token required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verify token with Facebook
        fb_url   = "https://graph.facebook.com/me"
        response = http_requests.get(fb_url, params={
            "fields":       "id,name,email,picture",
            "access_token": access_token,
        })

        if response.status_code != 200:
            return Response(
                {"error": "Invalid Facebook token."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        fb_data   = response.json()
        email     = fb_data.get("email")
        full_name = fb_data.get("name", "")
        avatar    = fb_data.get("picture", {}).get("data", {}).get("url", "")

        if not email:
            return Response(
                {"error": "Could not retrieve email from Facebook."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username":  email,
                "full_name": full_name,
                "avatar":    avatar,
                "role":      "customer",
            }
        )

        if not created and avatar:
            user.avatar = avatar
            user.save()

        tokens = get_tokens_for_user(user)
        return Response({
            "user":    UserProfileSerializer(user).data,
            "tokens":  tokens,
            "created": created,
        }, status=status.HTTP_200_OK)