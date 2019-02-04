import json

from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.views.generic.base import TemplateView
from django.utils.safestring import mark_safe

from bakery.views import BuildableDetailView, BuildableListView

from .models import Race


class RaceDetailView(BuildableDetailView):
    model = Race
    template_name = 'base_react.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        from ..candidates.models import Candidate
        from ..newsfeed.models import Article, CandidateStance, Issue
        from django.utils.html import strip_tags

        candidates = self.object.candidates.all().exclude(status='inactive')

        stances = CandidateStance.objects.filter(
            candidate__race=self.object).order_by('-date')

        articles = self.object.articles.all().order_by(
            '-date').exclude(is_published=False)

        issues = Issue.objects.all().order_by('issue_order')

        raceData = self.object

        raceObj = {
            'id': raceData.pk,
            'office': raceData.__str__(),
        }

        description = mark_safe(self.object.explainer)

        react_dict = {
            'absolute_url': self.get_object().get_absolute_url(),
            'component': 'RaceDetail',
            'props': {
                'data': {
                    'issues': serializers.serialize('json', issues),
                    'stances': serializers.serialize('json', stances),
                    'articles': serializers.serialize('json', articles),
                    'office': json.dumps(raceObj),
                    'description': description,
                    'slug': self.object.slug,
                    'documenters_slug': self.object.documenters_slug,
                },
                'candidates': serializers.serialize('json', candidates)
            },
            'meta': {
                'title': f'Race for {raceObj["office"]}, 2019',
                'description': 'Candidate bios, related articles and more.'
            }
        }

        context.update(react_dict)

        return context


class RaceListView(BuildableListView):
    model = Race
    template_name = 'base_react.html'
    build_path = 'races/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        raceData = self.object_list.order_by('pk')

        races = []

        for race in raceData:
            races.append({
                'name': race.__str__(),
                'id': race.slug
            })

        react_dict = {
            # 'absolute_path': self.object.get_absolute_path(),
            'absolute_url': '/races/',
            'component': 'RaceList',
            'props': {
                'data': {
                    'races': json.dumps(list(races), cls=DjangoJSONEncoder),
                },
            },
            'meta': {
                'title': 'All 2019 Chicago races',
                'description': 'Full list of Chicago races and candidates.'
            }
        }

        context.update(react_dict)

        return context
