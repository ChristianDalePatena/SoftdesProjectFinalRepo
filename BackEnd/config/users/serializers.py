from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model  = User
        fields = ["id", "full_name", "email", "phone", "password"]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
            full_name=validated_data.get("full_name", ""),
            phone=validated_data.get("phone", ""),
            role="customer",
        )
        return user

class LoginSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserProfileSerializer(serializers.ModelSerializer):
    """Used in AccountLogin.jsx profile tab"""
    class Meta:
        model  = User
        fields = [
            "id", "full_name", "email", "phone",
            "address", "avatar", "role",
            "email_notifications", "sms_notifications",
            "date_joined",
        ]
        read_only_fields = ["id", "email", "role", "date_joined"]


class UserMiniSerializer(serializers.ModelSerializer):
    """Lightweight serializer for order listings"""
    class Meta:
        model  = User
        fields = ["id", "full_name", "email", "phone"]