from django.db import models
from apps.races.models import Race

# Create your models here.
class Candidate(models.Model):
    name = models.CharField(max_length=100)
    race = models.ForeignKey(Race,on_delete=models.CASCADE)
    incumbent = models.BooleanField(default=False)
    email = models.CharField(max_length=200)
