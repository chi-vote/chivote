from django.db import models
from apps.races.models import Race

# Create your models here.
class Candidate(models.Model):
    name = models.CharField(max_length=100)

    cboe_id = models.IntegerField()
    isbe_id = models.IntegerField(null=True)
    br_id = models.IntegerField(null=True)
    ri_id = models.IntegerField(null=True)
    
    race = models.ForeignKey(Race,on_delete=models.CASCADE)
    incumbent = models.BooleanField(default=False)
    ballot_order = models.IntegerField()

class CandidateContact(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete=models.CASCADE)
    CONTACT_TYPES = (
            ('email','email'),
            ('mobile','mobile'),
            ('campaign phone','campaign phone'),
            ('home address','home address'),
            ('campaign address','campaign address'),
            ('other','other'))
    contact_type = models.CharField(max_length=25)
    contact_value = models.CharField(max_length=50)
    notes = models.TextField()

