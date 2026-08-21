from django.core.management.base import BaseCommand

from products.models import Product

SEED_PRODUCTS = [
    {
        "title": "Signature Rose Milk",
        "description": "Our classic infusion, delicate and subtly sweet.",
        "price": "24.00",
        "display_order": 1,
    },
    {
        "title": "Lavender Dream",
        "description": "A calming blend of French lavender and rose.",
        "price": "28.00",
        "badge": "Limited Edition",
        "display_order": 2,
    },
    {
        "title": "Golden Saffron",
        "description": "Infused with rare saffron for a warm, earthy finish.",
        "price": "32.00",
        "display_order": 3,
    },
]


class Command(BaseCommand):
    help = "Seeds the database with the original hardcoded shop products."

    def handle(self, *args, **options):
        created_count = 0
        for data in SEED_PRODUCTS:
            _, created = Product.objects.get_or_create(
                title=data["title"], defaults=data
            )
            if created:
                created_count += 1
        self.stdout.write(
            self.style.SUCCESS(
                f"Done. {created_count} product(s) created, "
                f"{len(SEED_PRODUCTS) - created_count} already existed."
            )
        )
