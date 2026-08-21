from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Product
from .serializers import ProductSerializer


class ProductListView(ListAPIView):
    """GET /api/products/  -> all active products, for the shop grid."""

    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(is_active=True)


class ProductDetailView(RetrieveAPIView):
    """GET /api/products/<slug>/  -> single product detail."""

    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Product.objects.filter(is_active=True)
