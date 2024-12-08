from django.shortcuts import render,HttpResponse,redirect
from .models import TodoItem
from .models import Room
# Create your views here.
def home(request):
    return render(request,"home.html")
def todos(request):
    items=TodoItem.objects.all()
    return render(request,"todos.html",{"todos":items})

def index(request):
    if request.method == "GET":
        return render(request,"index.html")
    elif request.method =="POST":
        print(request.POST)
        roomId=request.POST.get("room-id",None)
        playerName = request.POST.get("player-name","Unknown Player")
        if(roomId):
            return redirect(f"/myapp/{roomId}/{playerName}/")
        else:
            room= Room.objects.create()
            return redirect(f"/myapp/{roomId}/{playerName}/")

            pass
def myapp(request,id=None,name=None):
    return render(request,"game.html")
