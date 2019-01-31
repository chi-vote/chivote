from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from bakery.models import AutoPublishingBuildableModel

from ..offices.models import Office


class Race(AutoPublishingBuildableModel):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    explainer = RichTextField(blank=True, null=True)
    slug = models.SlugField(max_length=250)

    # BuildableModel field
    detail_views = ('apps.races.views.RaceDetailView',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.office.name, allow_unicode=True)
        return super(Race, self).save(*args, **kwargs)

    def __str__(self):
        return self.office.name

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('race-detail', args=[self.slug])

    class Meta:
        ordering = ['office']

    def _build_related(self):
        from .views import RaceListView
        RaceListView().build_queryset()

    def get_publication_status(self):
        # we want all races to publish
        return True
