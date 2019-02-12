import json

from django.conf import settings
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.views.generic.base import TemplateView
from django.utils.safestring import mark_safe

from bakery.views import BuildableDetailView, BuildableListView

from .models import Race

import logging
logger = logging.getLogger(__name__)


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

        curr_section = self.kwargs.get('section', None)

        react_dict = {
            'absolute_url': self.get_object().get_absolute_url(),
            'component': 'RaceDetail',
            'props': {
                'ballot_ready_api_url': getattr(settings, 'BALLOT_READY_API_URL'),
                'feed': curr_section,
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

    def set_kwargs(self, obj, section=None):
        slug_field = self.get_slug_field()
        self.kwargs = {
            'pk': getattr(obj, 'pk', None),
            slug_field: getattr(obj, slug_field, None),
            # Also alias the slug_field to the key `slug`
            # so it can work for people who just toss that in
            'slug': getattr(obj, slug_field, None),
            'section': section,
        }

    def build_all_paths(self, obj):
        from os import path

        self.request = self.create_request(self.get_url(obj))
        self.set_kwargs(obj)
        target_path = self.get_build_path(obj)
        self.build_file(target_path, self.get_content())

        sections = [
            'candidates',
            'articles',
            'stances',
            'events',
        ]

        for section in sections:
            logger.debug(f"Building {obj}/{section}")

            url = f'{self.get_url(obj)}{section}/'
            self.request = self.create_request(url)
            self.set_kwargs(obj, section)

            target_path = self.get_build_path(obj).replace(
                'index.html', f'{section}')

            if not self.fs.exists(target_path):
                logger.debug("Creating {}".format(target_path))
                self.fs.makedirs(target_path)

            target_path = path.join(target_path, 'index.html')
            self.build_file(target_path, self.get_content())

    def build_object(self, obj):
        from django.conf import settings

        if settings.USE_I18N:
            from django.utils.translation import activate

            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                self.build_all_paths(obj)
        else:
            self.build_all_paths(obj)


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

    def build_queryset(self):
        from django.conf import settings

        if settings.USE_I18N:
            from django.utils.translation import activate
            from django.urls import reverse

            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                self.build_path = reverse(
                    'races:race-list')[1:] + '/index.html'  # strip leading slash
                super(RaceListView, self).build_queryset()
        else:
            super(RaceListView, self).build_queryset()
