from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    MeView,
    SellerModeView,
    AvatarUploadView,
    EmailTokenObtainPairView,
)

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    # Email-based login:
    path("auth/token/", EmailTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),
    path("me/seller-mode/", SellerModeView.as_view(), name="seller_mode"),
    path("me/avatar/", AvatarUploadView.as_view(), name="avatar_upload"),
]
