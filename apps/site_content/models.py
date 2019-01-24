from django.db import models
from ckeditor.fields import RichTextField


class ContentItem(models.Model):
    slug = models.CharField(max_length=30)
    title = models.CharField(max_length=200)
    content = RichTextField()

    def __str__(self):
        return self.slug
