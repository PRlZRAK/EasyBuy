from django.contrib.auth import get_user_model
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

User = get_user_model()


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    # We want the request payload to be {"email": ..., "password": ...}
    username_field = "email"

    def validate(self, attrs):
        email = (attrs.get("email") or "").strip().lower()
        password = attrs.get("password") or ""

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "No active account found with the given credentials."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "No active account found with the given credentials."
            )

        # Check password (works with default User model)
        if not check_password(password, user.password):
            raise serializers.ValidationError(
                "No active account found with the given credentials."
            )

        # Create tokens directly (skip super().validate to avoid KeyError)
        refresh = self.get_token(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password")

    def validate_email(self, value):
        value = (value or "").strip().lower()
        if not value:
            raise serializers.ValidationError("Email is required.")
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        validated_data["email"] = validated_data["email"].strip().lower()
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class ProfileSerializer(serializers.Serializer):
    is_seller = serializers.BooleanField()
    avatar = serializers.ImageField(required=False, allow_null=True)


class MeSerializer(serializers.ModelSerializer):
    is_seller = serializers.BooleanField(source="profile.is_seller", read_only=True)
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "username", "email", "is_seller", "avatar")

    def get_avatar(self, obj):
        avatar = getattr(obj.profile, "avatar", None)
        if not avatar:
            return None

        request = self.context.get("request")
        url = avatar.url  # "/media/avatars/avatar.png"

        return request.build_absolute_uri(url) if request else url


class MeUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")


class SellerModeSerializer(serializers.Serializer):
    is_seller = serializers.BooleanField()


class AvatarUploadSerializer(serializers.Serializer):
    avatar = serializers.ImageField()
