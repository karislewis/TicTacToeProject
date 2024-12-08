from django.db import models

# Create your models here.
#database model

class TodoItem(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
class Room(models.Model):
    def __str__(self)->str:
        return f"{self.id}"
        