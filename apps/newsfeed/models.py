import uuid

from django.db import models
from django.db.models.functions import Lower
from ckeditor.fields import RichTextField
from bakery.models import AutoPublishingBuildableModel

from apps.races.models import Race
from apps.candidates.models import Candidate


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


class Article(AutoPublishingBuildableModel):
    hed = models.CharField(max_length=280, unique=True,
                           verbose_name='Headline')
    summary = RichTextField(null=True, blank=True)
    date = models.DateTimeField()
    link = models.URLField(unique=True)
    source = models.CharField(max_length=200, verbose_name='Publisher')
    candidates = models.ManyToManyField(
        Candidate, related_name='articles', blank=True, verbose_name="Candidate(s)", help_text="Double click, or select and click the arrow, to add or remove a candidate.")
    races = models.ManyToManyField(
        Race, related_name='articles', blank=True, verbose_name="Race(s)", help_text="Double click, or select and click the arrow, to add or remove a race.", through='TaggedArticle',)
    issues = models.ManyToManyField(
        Issue, related_name='articles', blank=True, verbose_name="Issue(s)", help_text="Double click, or select and click the arrow, to add or remove an issue.")
    # is_pinned = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.hed

    def _build_related(self):
        # for candidate in self.candidates.all():
        #     candidate.build()

        for race in self.races.all():
            race.build()


class TaggedArticle(models.Model):
    article = models.ForeignKey(
        Article, related_name='tagged_articles', on_delete=models.CASCADE)
    race = models.ForeignKey(
        Race, related_name='tagged_articles', on_delete=models.CASCADE)
    is_pinned = models.BooleanField(default=False, verbose_name='Pin?')

    class Meta:
        ordering = ('-is_pinned', '-article__date',)


class CandidateStance(AutoPublishingBuildableModel):
    stance_short = models.CharField(
        max_length=280, verbose_name='Short stance')
    stance_long = RichTextField(verbose_name='Long stance')
    date = models.DateField(null=True, blank=True)
    link = models.URLField()
    source = models.CharField(max_length=200, verbose_name='Publisher')
    candidate = models.ForeignKey(
        Candidate, related_name='stances', on_delete=models.CASCADE)
    issue = models.ForeignKey(
        Issue, related_name='stances', null=True, blank=True, on_delete=models.SET_NULL)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        import textwrap
        string = f'{self.candidate.__str__()} on {self.issue.__str__()}: {self.stance_short}'
        return textwrap.shorten(string, width=100)

    def _build_related(self):
        self.candidate.build()
