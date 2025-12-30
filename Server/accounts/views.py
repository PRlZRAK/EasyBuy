from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    RegisterSerializer,
    MeSerializer,
    MeUpdateSerializer,
    SellerModeSerializer,
    AvatarUploadSerializer,
    EmailTokenObtainPairSerializer,
)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            MeSerializer(user, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(MeSerializer(request.user, context={"request": request}).data)

    def patch(self, request):
        serializer = MeUpdateSerializer(
            instance=request.user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(MeSerializer(request.user, context={"request": request}).data)


class SellerModeView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = SellerModeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        request.user.profile.is_seller = serializer.validated_data["is_seller"]
        request.user.profile.save(update_fields=["is_seller"])

        return Response(MeSerializer(request.user, context={"request": request}).data)


class AvatarUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AvatarUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        request.user.profile.avatar = serializer.validated_data["avatar"]
        request.user.profile.save(update_fields=["avatar"])

        return Response(MeSerializer(request.user, context={"request": request}).data)
