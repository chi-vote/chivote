from django.db import models
from apps.races.models import Race


class Candidate(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    cboe_id = models.IntegerField()  # TODO: this should match fields below
    isbe_id = models.CharField(max_length=100, null=True, blank=True)
    br_id = models.CharField(max_length=100, null=True, blank=True)
    ri_id = models.CharField(max_length=100, null=True, blank=True)

    race = models.ForeignKey(Race, on_delete=models.CASCADE)
    incumbent = models.BooleanField(default=False)
    ballot_order = models.IntegerField()


class CandidateContact(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    CONTACT_TYPES = (
        ('email', 'email'),
        ('mobile', 'mobile'),
        ('campaign phone', 'campaign phone'),
        ('home address', 'home address'),
        ('campaign address', 'campaign address'),
        ('other', 'other'))
    contact_type = models.CharField(max_length=25)
    contact_value = models.CharField(max_length=50)
    notes = models.TextField()
