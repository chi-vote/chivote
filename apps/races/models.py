from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField

from ..offices.models import Office


class Race(models.Model):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    explainer = RichTextField(blank=True, null=True)
    slug = models.SlugField(max_length=250)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.office.name, allow_unicode=True)
        return super(Race, self).save(*args, **kwargs)

    def __str__(self):
        return self.office.name

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('race-detail', args=[self.slug])
