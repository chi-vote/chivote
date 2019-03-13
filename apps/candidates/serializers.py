from rest_framework import serializers
from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    br_data = serializers.ReadOnlyField()

    class Meta:
        model = Candidate
        fields = '__all__'
