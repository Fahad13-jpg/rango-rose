from rest_framework.generics import CreateAPIView

from .models import ContactMessage, NewsletterSubscriber
from .serializers import ContactMessageSerializer, NewsletterSubscriberSerializer


class ContactMessageCreateView(CreateAPIView):
    """POST /api/contact/  -> stores a message from the Contact page form."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


class NewsletterSubscribeView(CreateAPIView):
    """POST /api/newsletter/  -> subscribes an email from the Newsletter form."""

    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
