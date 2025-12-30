from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Product
from .serializers import ProductSerializer
from .permissions import IsSellerOwnerOrAdminOrReadOnly, is_seller


from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.exceptions import PermissionDenied


from .models import Category
from .serializers import CategorySerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public catalog (read-only)
    /api/products/
    /api/products/<uuid>/
    """

    permission_classes = [AllowAny]

    serializer_class = ProductSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["currency"]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "created_at", "stock", "name"]
    ordering = ["-created_at"]

    def get_queryset(self):
        # public catalog: only active products
        return Product.objects.filter(is_active=True)


class MyProductViewSet(viewsets.ModelViewSet):
    """
    Seller dashboard: manage own products.
    /api/me/products/
    """

    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsSellerOwnerOrAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["is_active", "currency"]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "created_at", "stock", "name"]
    ordering = ["-created_at"]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Product.objects.all()  # optional: or keep staff as all-access
        if not is_seller(user):
            raise PermissionDenied("Seller mode is required.")
        return Product.objects.filter(seller=user)

    def perform_create(self, serializer):
        user = self.request.user
        if not (user.is_staff or is_seller(user)):
            raise PermissionDenied("Seller mode is required.")
        serializer.save(seller=user)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public categories:
    GET /api/categories/
    GET /api/categories/<uuid>/
    """

    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AdminCategoryViewSet(viewsets.ModelViewSet):
    """
    Admin categories management:
    POST/PATCH/DELETE /api/admin/categories/...
    """

    permission_classes = [IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
