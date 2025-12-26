from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet,
    MyProductViewSet,
    CategoryViewSet,
    AdminCategoryViewSet,
)

router = DefaultRouter()
# public catalog
router.register(r"products", ProductViewSet, basename="products")

# seller dashboard
router.register(r"me/products", MyProductViewSet, basename="my-products")

router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"admin/categories", AdminCategoryViewSet, basename="admin-categories")

urlpatterns = router.urls
