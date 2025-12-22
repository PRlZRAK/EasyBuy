from rest_framework.permissions import BasePermission

class IsSellerModeEnabled(BasePermission):
    message = "Seller mode is not enabled for this account."

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return hasattr(user, "profile") and user.profile.is_seller_mode is True