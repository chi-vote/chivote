from rest_framework import serializers
from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    # full_name = serializers.CharField()
    class Meta:
        model = Candidate
        fields = '__all__'
        # fields = ('full_name',)


# class BallotReadySerializer(serializers.Serializer):
