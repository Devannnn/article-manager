from rest_framework import serializers
from datetime import datetime
from django.db import models
from tag.models import Tag

def year_validator(value):
  if value < 0 or value > datetime.now().year:
    message = f"Year must be between 0 and {datetime.now().year}"
    raise serializers.ValidationError(message)
       
class Article(models.Model):
   id = models.AutoField(primary_key=True)
   title = models.TextField()
   author = models.TextField()
   url = models.TextField()
   year = models.IntegerField(validators=[year_validator])
   summary = models.TextField(blank=True)
   read = models.BooleanField(default=False)
   read_again = models.BooleanField(default=False)
   favorite = models.BooleanField(default=False)
   tags = models.ManyToManyField(Tag, blank=True)
   date_creation = models.DateTimeField(auto_now_add=True)
   date_modification = models.DateTimeField(auto_now=True)

   def _str_(self):
     return self.title
   
