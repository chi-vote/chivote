from django.db import models

# Create your models here.
class Office(models.Model):
    name = models.TextField()
    type = models.TextField()
