import json

from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.views.generic.base import TemplateView
from django.utils.safestring import mark_safe

from bakery.views import BuildableDetailView, BuildableListView, BuildableTemplateView

from .models import Race


class RaceDetailView(BuildableDetailView):
    model = Race
    template_name = 'race_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        from ..candidates.models import Candidate
        from ..newsfeed.models import Article, CandidateStance, Issue
        from django.utils.html import strip_tags

        candidates = Candidate.objects.filter(
            race=self.object).exclude(status='inactive')

        stances = CandidateStance.objects.filter(
            candidate__race=self.object).order_by('-date')

        articles = Article.objects.filter(race=self.object)

        issue_dict = {}

        for issue in Issue.objects.all():
            issue_dict[issue.pk] = issue.name

        # print(issue_dict)

        raceData = Race.objects.filter(
            office=self.object.pk
        )

        raceObj = {
            'id': raceData[0].pk,
            'office': raceData[0].__str__(),
        }

        description = mark_safe(self.object.explainer)

        # print(json.dumps(description))

        react_dict = {
            'component': 'RaceDetail',
            'props': {
                'data': {
                    'issueDict': issue_dict,
                    'stances': serializers.serialize('json', stances),
                    'articles': serializers.serialize('json', articles),
                    'office': json.dumps(raceObj),
                    'description': description,
                },
                'candidates': serializers.serialize('json', candidates)
            }
        }

        context.update(react_dict)

        return context


class RaceListView(BuildableTemplateView):
    model = Race
    template_name = 'race_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        raceData = Race.objects.all().order_by('pk')

        races = []

        for race in raceData:
            races.append({
                'name': race.__str__(),
                'id': race.slug
            })

        react_dict = {
            'component': 'RaceList',
            'props': {
                'data': {
                    'races': json.dumps(list(races), cls=DjangoJSONEncoder),
                },
            }
        }

        context.update(react_dict)

        return context
        # build_path = 'races/index.html'
