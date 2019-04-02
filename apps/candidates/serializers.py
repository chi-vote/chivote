from django.conf import settings
from rest_framework import serializers
from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('id',
                  'full_name',
                  'last_name',
                  'status',
                  'br_thumb_url',
                  'br_id',
                  'ri_funds_raised_this_cycle',
                  'ri_cash_on_hand',
                  'ri_last_updated',
                  'incumbent',
                  )

        if settings.CHIVOTE_URL_PREFIX:
            fields += ('br_data',)
