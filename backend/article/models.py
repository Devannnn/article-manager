from django.db import models

class Article(models.Model):
   id = models.AutoField(primary_key=True)
   titre = models.TextField()
   auteur = models.TextField()
   site = models.TextField()
   date = models.IntegerField()
   synopsis = models.TextField()

   def _str_(self):
     return self.titre
