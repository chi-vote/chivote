import logging, requests

from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils import timezone
from bakery.models import AutoPublishingBuildableModel

from ..races.models import Race
from chivote.settings.base import IL_SUNSHINE_API_URL

logger = logging.getLogger(__name__)


class Candidate(AutoPublishingBuildableModel):
    last_name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    middle_name = models.CharField(max_length=100, null=True, blank=True)
    suffix = models.CharField(max_length=10, null=True, blank=True)
    full_name = models.CharField(max_length=500, null=True, blank=True)

    race = models.ForeignKey(
        Race, related_name='candidates', on_delete=models.CASCADE)

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

    cboe_id = models.IntegerField(null=True, blank=True) # chi board elex cand id
    isbe_id = models.IntegerField(null=True, blank=True) # il state board elex cand committee id
    br_id = models.IntegerField(null=True, blank=True) 
    ri_id = models.IntegerField(null=True, blank=True) 

    # Ballot Ready fields
    br_thumb_url = models.URLField(
        null=True, blank=True, verbose_name="Thumbnail URL")
    br_photo_url = models.URLField(
        null=True, blank=True, verbose_name="Photo URL")
    br_urls = JSONField(null=True, blank=True, verbose_name='URLs')
    br_endorsements = JSONField(
        null=True, blank=True, verbose_name='Endorsements')
    br_experience = JSONField(null=True, blank=True, verbose_name="Experience")
    br_education = JSONField(null=True, blank=True, verbose_name="Education")


    # CBOE results
    cboe_results_id = models.CharField(max_length=7,null=True)

    def update_br_data(self):
        from django.conf import settings

        if not getattr(settings, 'BALLOT_READY_API_KEY'):
            logger.info("Need to set BALLOT_READY_API_KEY in your settings")
        else:
            path = f'https://api.civicengine.com/candidate/{self.br_id}'
            headers = {'x-api-key': getattr(settings, 'BALLOT_READY_API_KEY')}
            r = requests.get(path, headers=headers)
            if r.status_code == 200:
                r_json = r.json()
                self.br_thumb_url = r_json['thumb_url']
                self.br_photo_url = r_json['photo_url']
                self.br_urls = r_json['urls']
                self.br_endorsements = r_json['endorsements']
                self.br_experience = r_json['experience']
                self.br_education = r_json['education']
    
    # Reform Illinois/ Illinois Sunshine fields
    ri_cash_on_hand = models.IntegerField(null=True,blank=True)
    ri_funds_raised_this_cycle = models.IntegerField(null=True,blank=True)
    ri_last_updated = models.DateTimeField(null=True,blank=True)

    def ri_committee_url(self):
        return 'https://illinoissunshine.org/committees/' + self.isbe_id

    def update_ri_data(self):
        """
        you may want to 
        tasks.update_ri_candidates_all()
        instead
        """
        try:
            ri_data = requests.get(IL_SUNSHINE_API_URL+'?committee_id='+self.isbe_id).json['objects']
            self.ri_cash_on_hand = ri_data['cash_on_hand']
            self.ri_funds_raised_this_cycle = ri_data['total_funds_raised']
            self.ri_last_updated = timezone.now()
        except Exception as e:
            logger.info("illinois sunshine lookup error: " + e)

    def save(self, *args, **kwargs):
        if not self.full_name:
            self.full_name = '{0}{1}{2}{3}'.format(
                self.first_name if self.first_name else '',
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

    def _build_related(self):
        self.race.build()

    def get_publication_status(self):
        return (self.status != 'inactive')


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
    notes = models.TextField(null=True, blank=True)
