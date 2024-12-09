from django.urls import path 
from . import views
from myapp.views import * 

urlpatterns= [
    #home is the index 
    path("",views.game_vs_computer,name="game_vs_computer"),
    path("index/",views.index,name="Start"),
    path("myapp/<int:id>/<str:name>/",views.myapp),
    path("home/", views.home, name="home"),
    path("todos/",views.todos,name="Todos")
]