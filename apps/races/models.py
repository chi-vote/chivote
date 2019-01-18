from django.db import models
from apps.offices.models import Office


# Create your models here.
class Race(models.Model):
    office = models.ForeignKey(Office,on_delete=models.CASCADE)
    explainer = models.TextField()
