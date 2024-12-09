from channels.generic.websocket import AsyncJsonWebsocketConsumer


class MyAppConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print(self.scope['url_route']['kwargs']['id'])
        self.room_id =self.scope['url_route']['kwargs']['id']
        self.group_name=f"group_{self.room_id}"
        with contextlib.suppress(KeyError):
            if(len(channel_layer.groups[self.group_name])>=2):
                await self.accept()
                await self.send_json({
                    "event": "show_error",
                    "error": "This room is full!!"
                })
                return await self.close()
      
        await self.accept()
        await self.channel_layer.group_add(self.group_name,self.channel_name)

        print(self.channel_layer.groups[self.group_name])
        return await self.accept()
    async def receive_json(self, content, **kwargs):
        print(content)
        return await super().receive_json(content, **kwargs)

    async def disconnect(self,code=None):
        print("disconnect")
        return await super().disconnect(code)
    