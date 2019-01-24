from django.db import models
from ckeditor.fields import RichTextField

from ..offices.models import Office


class Race(models.Model):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    explainer = RichTextField()

    def __str__(self):
        return self.office.name

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('race-detail', args=[str(self.pk)])
