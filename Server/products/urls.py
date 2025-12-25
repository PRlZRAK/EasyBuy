from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, MyProductViewSet

router = DefaultRouter()
# public catalog
router.register(r"products", ProductViewSet, basename="products")

# seller dashboard
router.register(r"me/products", MyProductViewSet, basename="my-products")

urlpatterns = router.urls
