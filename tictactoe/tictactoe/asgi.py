"""
ASGI config for tictactoe project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter,URLRouter
from django.urls import path
from channels.auth import AuthMiddlewareStack
from myapp.consumers import *

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tictactoe.settings')

#application = get_asgi_application()
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/myapp/<int:id>/", MyAppConsumer.as_asgi()),
        ])
    ),
})