from django.db import models
from apps.places.models import Place

# Create your models here.
class Office(models.Model):
    # someday these could be subclassed if necessary
    # but that's potentially complicated to implement
    name = models.CharField(max_length=20)
    place = models.ForeignKey(Place,on_delete=models.CASCADE)
