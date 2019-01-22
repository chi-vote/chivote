from django.db import models
from apps.offices.models import Office


# Create your models here.
class Race(models.Model):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    explainer = models.TextField()

    def __str__(self):
        return self.office.name

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('race-detail', args=[str(self.pk)])
