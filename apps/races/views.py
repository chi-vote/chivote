import json
import logging

from django.conf import settings
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.safestring import mark_safe
from django.utils.translation import gettext as _

from rest_framework.renderers import JSONRenderer

from bakery.views import BuildableDetailView, BuildableListView

from apps.core.views import RenderReactMixin
from apps.candidates.serializers import CandidateSerializer

from .models import Race

logger = logging.getLogger(__name__)


class RaceDetailView(RenderReactMixin, BuildableDetailView):
    model = Race
    template_name = 'base_rendered.html'
    react_component = 'raceDetail'

    def get_react_props(self):
        from apps.newsfeed.models import CandidateStance, Issue

        candidates = self.object.candidates.all().exclude(status='inactive')

        if settings.CHIVOTE_IS_RUNOFF:
            candidates = candidates.exclude(status='candidate')

        curr_section = self.kwargs.get('section', None)
        issues = Issue.objects.all().order_by('issue_order')
        stances = CandidateStance.objects.filter(
            candidate__in=candidates).order_by('-date')
        race_obj = {
            'id': self.object.pk,
            'office': self.object.__str__(),
            'decided': self.object.is_decided,
            'status': self.object.status
        }
        description = mark_safe(self.object.explainer)

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
            # 'candidates': serializers.serialize('json', candidates, fields=('full_name', 'br_id', 'br_thumb_url'))
            'candidates': JSONRenderer().render(CandidateSerializer(candidates, many=True).data).decode()
        }

    def get_articles(self):
        # get candidates for this race
        candidates = self.object.candidates.all().exclude(status='inactive')

        if settings.CHIVOTE_IS_RUNOFF:
            candidates = candidates.exclude(status='candidate')

        base_articles_queryset = self.object.tagged_articles.filter(
            article__is_published=True)

        # get article querysets tagged to current candidates
        candidates_queryset = base_articles_queryset.filter(
            article__candidates__in=candidates)

        # get article querysets tagged to no particular candidates
        no_candidates_queryset = base_articles_queryset.filter(
            article__candidates=None)

        # combine querysets
        articles_queryset = (candidates_queryset |
                             no_candidates_queryset).distinct()

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
        context = super().get_context_data(**kwargs)

        race_obj = {
            'id': self.object.pk,
            'office': self.object.__str__(),
        }

        react_dict = {
            'absolute_url': self.get_object().get_absolute_url(),
            'meta': {
                'title': _('Race for %(office)s, 2019') % {'office': race_obj['office']},
                'description': _('Candidate bios, related articles and more.'),
                'img': _('images/socialrunoff.jpg'),
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
            'results',
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
                'id': race.slug,
                'decided': race.is_decided,
                'status': race.status
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
                'img': _('images/socialrunoff.jpg'),
            }
        }

        context.update(react_dict)

        return context

    def build_queryset(self):
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
    url_name = 'results-list'

    def get_react_props(self):
        race_data = self.object_list.order_by('pk')

        races = []

        for race in race_data:
            races.append({
                'name': race.__str__(),
                'id': race.slug,
                'cboeId': race.cboe_results_id,
                'decided': race.is_decided,
                'status': race.status,
                'note': race.cboe_results_note,
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
                'title': _('Live Chicago election results, February 26, 2019'),
                'description': _('Full results list of Chicago races and candidates.'),
                'img': _('images/results-social-2.png'),
            }
        }

        context.update(react_dict)

        return context

    def build_queryset(self):
        import os

        if settings.USE_I18N:
            from django.utils.translation import activate
            from django.urls import reverse

            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                self.build_path = os.path.join(
                    reverse(self.url_name)[1:],  # strip leading slash
                    'index.html'
                )
                super(ResultsListView, self).build_queryset()
        else:
            super(ResultsListView, self).build_queryset()
