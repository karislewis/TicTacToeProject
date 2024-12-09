from django.urls import re_path
from .consumers import GameConsumer

websocket_urlpatterns = [
    re_path(r'ws/myapp/(?P<room_name>\w+)/$', GameConsumer.as_asgi()),
]
