from rest_framework.permissions import BasePermission, SAFE_METHODS

def is_seller(user) -> bool:
    try:
        return bool(user.profile.is_seller)
    except Exception:
        return False

class IsSellerOwnerOrAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        return bool(user and user.is_authenticated and (user.is_staff or is_seller(user)))

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        return bool(user.is_staff or obj.seller_id == user.id)