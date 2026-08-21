from django.db import models
from django.utils.text import slugify


class Product(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True, blank=True)
    description = models.TextField(
        help_text="Short description shown on the product card."
    )
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    badge = models.CharField(
        max_length=40,
        blank=True,
        help_text="Optional tag like 'Limited Edition'.",
    )
    is_active = models.BooleanField(
        default=True, help_text="Uncheck to hide from the shop without deleting it."
    )
    display_order = models.PositiveIntegerField(
        default=0, help_text="Lower numbers show first."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "id"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
