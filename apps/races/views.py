import json

from django.conf import settings
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.safestring import mark_safe
from django.utils.translation import gettext as _

from bakery.views import BuildableDetailView, BuildableListView

from apps.core.views import RenderReactMixin

from .models import Race

import logging
logger = logging.getLogger(__name__)


class RaceDetailView(RenderReactMixin, BuildableDetailView):
    model = Race
    template_name = 'base_rendered.html'
    react_component = 'raceDetail'

    def get_react_props(self):
        from apps.newsfeed.models import CandidateStance, Issue

        curr_section = self.kwargs.get('section', None)
        issues = Issue.objects.all().order_by('issue_order')
        stances = CandidateStance.objects.filter(
            candidate__race=self.object).order_by('-date')
        race_obj = {
            'id': self.object.pk,
            'office': self.object.__str__(),
        }
        description = mark_safe(self.object.explainer)
        candidates = self.object.candidates.all().exclude(status='inactive')

        return {
            'ballot_ready_api_url': getattr(settings, 'BALLOT_READY_API_URL'),
            'cboeId': self.object.cboe_results_id,
            'feed': curr_section,
            'data': {
                'issues': serializers.serialize('json', issues),
                'stances': serializers.serialize('json', stances),
                'articles': self.get_articles(),
                'office': json.dumps(race_obj),
                'description': description,
                'slug': self.object.slug,
                'documenters_slug': self.object.documenters_slug,
            },
            'candidates': serializers.serialize('json', candidates)
        }

    def get_articles(self):
        articles_queryset = self.object.tagged_articles.filter(
            article__is_published=True)

        articles_json = serializers.serialize(
            'json', [a.article for a in articles_queryset])

        def add_pinned(article):
            is_pinned = articles_queryset.get(
                article__pk=article['pk']).is_pinned
            article['is_pinned'] = is_pinned
            return article

        articles_dict = [add_pinned(a) for a in json.loads(articles_json)]

        articles = json.dumps(articles_dict)

        return articles

    def get_context_data(self, **kwargs):
        from apps.newsfeed.models import CandidateStance, Issue

        context = super().get_context_data(**kwargs)

        candidates = self.object.candidates.all().exclude(status='inactive')

        stances = CandidateStance.objects.filter(
            candidate__race=self.object).order_by('-date')

        issues = Issue.objects.all().order_by('issue_order')

        race_obj = {
            'id': self.object.pk,
            'office': self.object.__str__(),
        }

        description = mark_safe(self.object.explainer)

        curr_section = self.kwargs.get('section', None)

        react_dict = {
            'absolute_url': self.get_object().get_absolute_url(),
            # 'component': 'raceDetail',
            # 'props': {
            #     'ballot_ready_api_url': getattr(settings, 'BALLOT_READY_API_URL'),
            #     'feed': curr_section,
            #     'data': {
            #         'issues': serializers.serialize('json', issues),
            #         'stances': serializers.serialize('json', stances),
            #         'articles': self.get_articles(),
            #         'office': json.dumps(race_obj),
            #         'description': description,
            #         'slug': self.object.slug,
            #         'documenters_slug': self.object.documenters_slug,
            #     },
            #     'candidates': serializers.serialize('json', candidates)
            # },
            'meta': {
                'title': _('Race for %(office)s, 2019') % {'office': race_obj['office']},
                'description': _('Candidate bios, related articles and more.'),
                'img': _('images/C_2x1_Chi-vote_advert.png'),
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
            'finances',
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


class RaceListView(RenderReactMixin, BuildableListView):
    model = Race
    template_name = 'base_rendered.html'
    build_path = 'races/index.html'
    react_component = 'raceList'

    def get_react_props(self):
        race_data = self.object_list.order_by('pk')

        races = []

        for race in race_data:
            races.append({
                'name': race.__str__(),
                'id': race.slug
            })

        return {
            'data': {
                'races': json.dumps(list(races), cls=DjangoJSONEncoder),
            },
        }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            # 'absolute_path': self.object.get_absolute_path(),
            'absolute_url': '/races/',
            'meta': {
                'title': _('All 2019 Chicago races'),
                'description': _('Full list of Chicago races and candidates.'),
                'img': _('images/C_2x1_Chi-vote_advert.png'),
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


class ResultsListView(RenderReactMixin, BuildableListView):
    model = Race
    template_name = 'base_rendered.html'
    build_path = 'results/index.html'
    react_component = 'resultsList'

    def get_react_props(self):
        race_data = self.object_list.order_by('pk')

        races = []

        for race in race_data:
            races.append({
                'name': race.__str__(),
                'id': race.slug,
                'cboeId': race.cboe_results_id,
            })

        return {
            'data': {
                'races': json.dumps(list(races), cls=DjangoJSONEncoder),
            },
        }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            # 'absolute_path': self.object.get_absolute_path(),
            'absolute_url': '/results/',
            'meta': {
                'title': _('All 2019 Chicago races'),
                'description': _('Full list of Chicago races and candidates.'),
                'img': _('images/C_2x1_Chi-vote_advert.png'),
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
                    'results-list')[1:] + '/index.html'  # strip leading slash
                super(ResultsListView, self).build_queryset()
        else:
            super(ResultsListView, self).build_queryset()
