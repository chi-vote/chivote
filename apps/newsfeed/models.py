from django.db import models
from apps.races.models import Race
from apps.candidates.models import Candidate

# Create your models here.
class FeedItem(models.Model):
    hed=models.CharField(max_length=280)
    link=models.CharField(max_length=1000)
    source=models.CharField(max_length=200)
    races=models.ManyToManyField(Race)
    def __str__(self):
        return self.hed

class CandidateStatement(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete=models.CASCADE)
    statement = models.TextField()
    issue = models.CharField(max_length=100) # this should be fk once issues are modeled
    date = models.DateTimeField()
    def __str__(self):
        return self.candidate.name + ' on ' + self.issue # also need to fix this when issues normalize
