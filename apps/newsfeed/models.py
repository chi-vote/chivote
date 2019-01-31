import uuid

from django.db import models
from django.db.models.functions import Lower
from ckeditor.fields import RichTextField

from ..races.models import Race
from ..candidates.models import Candidate


class IssueManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().order_by(Lower('name'))


class Issue(models.Model):
    name = models.CharField(max_length=100)
    description = RichTextField()
    issue_order = models.PositiveSmallIntegerField(
        default=0, blank=False, null=False)

    objects = IssueManager()

    class Meta(object):
        ordering = ['issue_order']

    def __str__(self):
        return self.name


class Article(models.Model):
    hed = models.CharField(max_length=280, unique=True,
                           verbose_name='Headline')
    summary = RichTextField(null=True, blank=True)
    date = models.DateTimeField()
    link = models.URLField(unique=True)
    source = models.CharField(max_length=200, verbose_name='Publisher')
    candidate = models.ManyToManyField(
        Candidate, blank=True, verbose_name="Candidate(s)", help_text="Double click, or select and click the arrow, to add or remove a candidate.")
    race = models.ManyToManyField(
        Race, related_name='articles', blank=True, verbose_name="Race(s)", help_text="Double click, or select and click the arrow, to add or remove a race.")
    issue = models.ManyToManyField(
        Issue, blank=True, verbose_name="Issue(s)", help_text="Double click, or select and click the arrow, to add or remove an issue.")

    def __str__(self):
        return self.hed


class CandidateStance(models.Model):
    statement_short = models.CharField(
        max_length=280, verbose_name='Short stance')
    statement_long = RichTextField(verbose_name='Long stance')
    date = models.DateField(null=True, blank=True)
    link = models.URLField()
    source = models.CharField(max_length=200, verbose_name='Publisher')
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE)
    issue = models.ForeignKey(
        Issue, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        import textwrap
        string = f'{self.candidate.__str__()} on {self.issue.__str__()}: {self.statement_short}'
        return textwrap.shorten(string, width=100)
