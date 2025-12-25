from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.UUIDField(source="seller_id", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "seller",
            "name",
            "slug",
            "description",
            "price",
            "currency",
            "stock",
            "is_active",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "seller", "slug", "created_at", "updated_at")
