from django.db import models
from apps.races.models import Race
from apps.candidates.models import Candidate


class Issue(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Article(models.Model):
    hed = models.CharField(max_length=280)
    date = models.DateTimeField()
    link = models.URLField()
    source = models.CharField(max_length=200)
    race = models.ManyToManyField(Race)
    issue = models.ManyToManyField(Issue)

    def __str__(self):
        return self.hed


class CandidateStatement(models.Model):
    statement = models.TextField()
    date = models.DateTimeField()
    link = models.URLField()
    source = models.CharField(max_length=200)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    issue = models.ManyToManyField(Issue)

    def __str__(self):
        # also need to fix this when issues normalize
        return self.candidate.name + ' on ' + self.issue
