from django.shortcuts import render,HttpResponse,redirect
from .models import TodoItem
from .models import Room
from django.contrib import messages
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
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



# A simple game state for demonstration
game_state = {
    "current_turn": "player",  # Can be "player" or "computer"
    "last_result": None,       # Store the result of the player's last action
}

@csrf_protect
def update_turn(request):
    if request.method == "POST":
        data = request.POST
        is_correct = data.get("is_correct", "false").lower() == "true"

        # Update the game state based on the player's response
        if is_correct:
            print("player turn")
            game_state["current_turn"] = "player"
            game_state["last_result"] = "correct"
        else:
            print("computer turn")
            game_state["current_turn"] = "computer"
            game_state["last_result"] = "wrong"

        # Send the updated turn to the WebSocket consumer (game_vs_computer)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "game_myapp",  # Assuming room name is 'myapp'
            {
                "type": "game_update",
                "current_turn": game_state["current_turn"],  # Send the current turn to the WebSocket
                "last_result": game_state["last_result"],
            }
        )

        return JsonResponse(game_state)

    return JsonResponse({"error": "Invalid request"}, status=400)