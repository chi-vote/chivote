from django.db import models
from apps.races.models import Race


class Candidate(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    race = models.ForeignKey(Race, on_delete=models.CASCADE)

    STATUS_CHOICES = (
        ('elected', 'Elected'),
        ('candidate', 'Candidate'),
        ('inactive', 'Inactive')
    )
    status = models.CharField(
        max_length=25, choices=STATUS_CHOICES, default='candidate')

    incumbent = models.BooleanField(default=False)
    ballot_order = models.PositiveSmallIntegerField(
        default=0, blank=False, null=False)

    cboe_id = models.IntegerField()
    isbe_id = models.IntegerField(null=True, blank=True)
    br_id = models.IntegerField(null=True, blank=True)
    ri_id = models.IntegerField(null=True, blank=True)

    class Meta(object):
        ordering = ['ballot_order']


class CandidateContact(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    CONTACT_TYPE_CHOICES = (
        ('email', 'email'),
        ('mobile', 'mobile'),
        ('campaign phone', 'campaign phone'),
        ('home address', 'home address'),
        ('campaign address', 'campaign address'),
        ('other', 'other'))
    contact_type = models.CharField(
        max_length=25, choices=CONTACT_TYPE_CHOICES, default='email')
    contact_value = models.CharField(max_length=50)
    notes = models.TextField()
