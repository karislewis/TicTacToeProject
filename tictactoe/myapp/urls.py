from django.urls import path 
from . import views
from myapp.views import * 

urlpatterns= [
    #home is the index 
    path("",views.home,name="home_page"),
    path("game_vs_computer/",views.game_vs_computer,name="game_vs_computer"),
    path("index/",views.index,name="Start"),
    path("myapp/<int:id>/<str:name>/",views.myapp),
    path("todos/",views.todos,name="Todos")
]