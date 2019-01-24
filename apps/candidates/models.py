from django.db import models
from apps.races.models import Race


class Candidate(models.Model):
    last_name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    middle_name = models.CharField(max_length=100, null=True, blank=True)
    suffix = models.CharField(max_length=10, null=True, blank=True)
    full_name = models.CharField(max_length=500, null=True, blank=True)

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

    def save(self, *args, **kwargs):
        if not self.full_name:
            self.full_name = '{0}{1}{2}{3}'.format(
                self.first_name,
                '{}'.format(
                    ' ' + self.middle_name + ' ' if self.middle_name else ' ',
                ),
                self.last_name,
                '{}'.format(' ' + self.suffix if self.suffix else '')
            )

        super(Candidate, self).save(*args, **kwargs)

    class Meta(object):
        ordering = ['ballot_order']

    def __str__(self):
        return self.full_name


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
