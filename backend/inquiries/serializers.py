from rest_framework import serializers

from .models import ContactMessage, NewsletterSubscriber


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    # Declared explicitly (without the auto UniqueValidator DRF would add for
    # a unique=True model field) so validate_email can decide what "already
    # exists" should mean: block active subscribers, but let someone who
    # previously unsubscribed (is_active=False) sign up again.
    email = serializers.EmailField()

    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_email(self, value):
        existing = NewsletterSubscriber.objects.filter(email__iexact=value).first()
        if existing and existing.is_active:
            raise serializers.ValidationError("This email is already subscribed.")
        return value

    def create(self, validated_data):
        email = validated_data["email"]
        subscriber, _ = NewsletterSubscriber.objects.update_or_create(
            email__iexact=email,
            defaults={"email": email, "is_active": True},
        )
        return subscriber
