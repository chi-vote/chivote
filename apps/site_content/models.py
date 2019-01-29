from django.db import models
from ckeditor.fields import RichTextField
from colorfield.fields import ColorField


class ContentItem(models.Model):
    slug = models.CharField(max_length=30)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=280, null=True, blank=True)
    content = RichTextField(config_name='full')
    helmet = models.TextField(null=True, blank=True)
    background = ColorField(default='#31313B')

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('page-detail', args=[self.slug])

    def __str__(self):
        return self.slug
