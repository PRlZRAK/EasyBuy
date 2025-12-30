from rest_framework import serializers
from .models import Product, Category, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("id", "image", "alt_text", "sort_order", "created_at")
        read_only_fields = ("id", "created_at")


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.UUIDField(source="seller_id", read_only=True)

    category = CategorySerializer(read_only=True)
    category_id = serializers.UUIDField(
        required=False, allow_null=True, write_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)
    image_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
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
            "images",
            "image_files",
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
        image_files = validated_data.pop("image_files", [])
        if category_id:
            validated_data["category_id"] = category_id
        product = super().create(validated_data)
        if image_files:
            self._save_images(product, image_files)
        return product

    def update(self, instance, validated_data):
        category_id = validated_data.pop("category_id", serializers.empty)
        image_files = validated_data.pop("image_files", [])

        if category_id is not serializers.empty:
            instance.category_id = category_id

        product = super().update(instance, validated_data)
        if image_files:
            self._save_images(product, image_files)
        return product

    def _save_images(self, product, image_files):
        start_index = product.images.count()
        images = [
            ProductImage(
                product=product,
                image=image_file,
                sort_order=start_index + idx,
            )
            for idx, image_file in enumerate(image_files)
        ]
        ProductImage.objects.bulk_create(images)
