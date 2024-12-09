from django.shortcuts import render,HttpResponse,redirect
from .models import TodoItem
from .models import Room
from django.contrib import messages
import random
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
        roomId=request.POST.get("room-id",None)
        playerName = request.POST.get("player-name","Unknown Player")
        if(roomId):
            try:
                room= Room.objects.get(id=roomId)
                return redirect(f"/myapp/{room.id}/{playerName}/")

            except Room.DoesNotExist:
                messages.error(request, "Room does not exist.")
                return redirect(f"/")
        else:
            room= Room.objects.create()
            return redirect(f"/myapp/{room.id}/{playerName}/")

            pass
def myapp(request,id=None,name=None):
    try:
        room= Room.objects.get(id=id)
        return render(request,"game.html",{"room": room,"name":name})
    except Room.DoesNotExist:
        messages.error(request,"Room does not exist!")
        return redirect("/")
    
def game_vs_computer(request):
    return render(request, 'game_vs_computer.html')