#from django.contrib.gis.db import models
from django.db import models
from apps.candidates.models import Candidate

# Create your models here.
class Place(models.Model):
    name=models.CharField(max_length=20)
    citywide=models.BooleanField()
    ward_no=models.IntegerField(null=True)
    lame_duck = models.CharField(max_length=50,null=True) # an incumbent who isn't running
    incumbent_candidate = models.ForeignKey(Candidate,null=True,on_delete=models.CASCADE) 
    def incumbent(self):
        return self.incumbent if self.incumbent else self.lame_duck
    
    # install geo libraries to enable shapes
    #shape=models.PolygonField()
    # tk: demographics

