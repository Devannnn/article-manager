from django.db import models

class Website(models.Model):
   id = models.AutoField(primary_key=True)
   nom = models.TextField()
   url = models.TextField()
   image = models.ImageField(upload_to='website_images/', blank=True, null=True)

   def _str_(self):
     return self.nom
