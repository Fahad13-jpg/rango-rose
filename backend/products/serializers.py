from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    imageSrc = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "price",
            "imageSrc",
            "badge",
        ]

    def get_imageSrc(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url
