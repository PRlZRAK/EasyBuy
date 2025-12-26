from rest_framework import serializers
from .models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.UUIDField(source="seller_id", read_only=True)

    category = CategorySerializer(read_only=True)
    category_id = serializers.UUIDField(
        required=False, allow_null=True, write_only=True
    )

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
            "category",
            "category_id",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "seller", "slug", "created_at", "updated_at")

    def validate_category_id(self, value):
        if value is None:
            return None
        if not Category.objects.filter(id=value).exists():
            raise serializers.ValidationError("Category not found.")
        return value

    def create(self, validated_data):
        category_id = validated_data.pop("category_id", None)
        if category_id:
            validated_data["category_id"] = category_id
        return super().create(validated_data)

    def update(self, instance, validated_data):
        category_id = validated_data.pop("category_id", serializers.empty)

        if category_id is not serializers.empty:
            instance.category_id = category_id

        return super().update(instance, validated_data)
