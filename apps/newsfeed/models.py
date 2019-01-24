from django.db import models
from ..races.models import Race
from ..candidates.models import Candidate


class Issue(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Article(models.Model):
    hed = models.CharField(max_length=280)
    date = models.DateTimeField()
    link = models.URLField()
    source = models.CharField(max_length=200, verbose_name='Publisher')
    candidate = models.ManyToManyField(
        Candidate, blank=True, verbose_name="Candidate(s)", help_text="Double click, or select and click the arrow, to add or remove a candidate.")
    race = models.ManyToManyField(
        Race, blank=True, verbose_name="Race(s)", help_text="Double click, or select and click the arrow, to add or remove a race.")
    issue = models.ManyToManyField(
        Issue, blank=True, verbose_name="Issue(s)", help_text="Double click, or select and click the arrow, to add or remove an issue.")

    def __str__(self):
        return self.hed


class CandidateStatement(models.Model):
    statement = models.TextField()
    date = models.DateTimeField()
    link = models.URLField()
    source = models.CharField(max_length=200, verbose_name='Publisher')
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE)
    issue = models.ManyToManyField(
        Issue, blank=True, verbose_name="Issue(s)", help_text="Double click, or select and click the arrow, to add or remove an issue.")

    def __str__(self):
        # also need to fix this when issues normalize
        return self.candidate.name + ' on ' + self.issue
