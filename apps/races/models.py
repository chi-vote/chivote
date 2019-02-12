from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from bakery.models import AutoPublishingBuildableModel

from apps.offices.models import Office


class Race(AutoPublishingBuildableModel):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    explainer = RichTextField(blank=True, null=True)
    slug = models.SlugField(max_length=250)
    documenters_slug = models.CharField(max_length=20, verbose_name='Documenters.org embed slug',
                                        help_text='Embed will populate at https://embed.documenters.org/chivote-forums/[SLUG].html', null=True, blank=True)

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
        return reverse('races:race-detail', args=[self.slug])

    class Meta:
        ordering = ['office']

    def _build_related(self):
        from .feeds import RaceFeed
        from .views import RaceListView
        from apps.newsfeed.feeds import LatestArticlesFeed
        RaceListView().build_queryset()
        queryset = Race.objects.filter(slug=self.slug)
        RaceFeed().build_queryset(queryset)
        LatestArticlesFeed().build_queryset()

    def get_publication_status(self):
        # we want all races to publish
        return True
