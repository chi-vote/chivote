#from django.contrib.gis.db import models
from django.db import models


class Place(models.Model):
    name = models.CharField(max_length=20)
    citywide = models.BooleanField()
    ward_no = models.IntegerField(null=True)

    def __str__(self):
        return self.name

    # install geo libraries to enable shapes
    # shape=models.PolygonField()
    # tk: demographics
