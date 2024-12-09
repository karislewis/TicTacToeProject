from channels.generic.websocket import AsyncWebsocketConsumer
import json
import random
import asyncio

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "myapp"
        self.room_group_name = f"game_{self.room_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        self.board = [""] * 9
        self.turn = "X"  # Player X starts first
        self.winner = None
        self.game_over = False  # Flag to check if the game is over
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        action = text_data_json.get("action")

        if action == "player_move" and not self.game_over:
            move = text_data_json.get("move")
            if self.board[move] == "" and self.winner is None:
                self.board[move] = self.turn

                if self.check_winner():
                    self.winner = self.turn
                    message = f"Player {self.turn} wins!"
                    self.game_over = True  # End the game
                elif self.check_draw():
                    message = "It's a draw!"
                    self.game_over = True  # End the game
                else:
                    self.turn = "O" if self.turn == "X" else "X"
                    message = f"Player {self.turn}'s turn"

                await self.channel_layer.group_send(self.room_group_name, {
                    "type": "game_update",
                    "board": self.board,
                    "message": message,
                    "game_over": self.game_over  # Include game_over flag
                })

                # Now it's the computer's turn if player X just moved
                if self.turn == "O" and not self.game_over:
                    await asyncio.sleep(0.5)  # Add a 0.5 second delay before computer moves
                    await self.computer_move()

    async def computer_move(self):
    # Logic for computer's move (randomly choose an empty spot)
        empty_spots = [i for i in range(9) if self.board[i] == ""]

        if empty_spots:
            move = random.choice(empty_spots)  # Randomly pick an empty spot
            self.board[move] = "O"

            if self.check_winner():
                self.winner = "O"
                message = "Player O wins!"
                self.game_over = True  # End the game
            elif self.check_draw():
                message = "It's a draw!"
                self.game_over = True  # End the game
            else:
                self.turn = "X"  # Player X's turn next
                message = f"Player {self.turn}'s turn"

            # Broadcast the updated board and message
            await self.channel_layer.group_send(self.room_group_name, {
                "type": "game_update",
                "board": self.board,
                "message": message,
                "game_over": self.game_over  # Include game_over flag in the message
            })

    async def game_update(self, event):
        await self.send(text_data=json.dumps({
            "board": event["board"],
            "message": event["message"],
            "game_over": event["game_over"]  # Include game_over flag in the message
        }))

    def check_winner(self):
        winning_combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # vertical
            [0, 4, 8], [2, 4, 6]  # diagonal
        ]
        for combo in winning_combinations:
            if self.board[combo[0]] == self.board[combo[1]] == self.board[combo[2]] != "":
                return True
        return False

    def check_draw(self):
        return all(cell != "" for cell in self.board) and self.winner is None
