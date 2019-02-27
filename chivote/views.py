# from apps.core.views import HomePageView
# from apps.races.views import ResultsListView
from django.utils.translation import gettext as _
from apps.core.views import RenderReactMixin
from apps.races.models import Race
from bakery.views import BuildableTemplateView, BuildableListView
import json
from django.core.serializers.json import DjangoJSONEncoder


# class IndexView(RenderReactMixin, BuildableTemplateView):
#     """View function for the landing page (/index.html)"""
#     template_name = 'base_rendered.html'
#     build_path = 'index.html'

#     react_component = 'homepage'

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)

#         context.update({
#             'absolute_url': '/',
#             'meta': {
#                 'title': _('Everything you need to know to vote in Chicago on Feb. 26th'),
#                 'description': _('No matter if you’re a rookie voter or a veteran, we have everything you need.'),
#                 'img': _('images/C_2x1_Chi-vote_socialcard.png'),
#             }
#         })

#         return context

#     def build(self):
#         from django.conf import settings

#         if settings.USE_I18N:
#             from django.utils.translation import activate
#             from django.urls import reverse

#             for language_code, language in settings.LANGUAGES:
#                 activate(language_code)
#                 self.build_path = reverse(
#                     'index')[1:] + '/index.html'  # strip leading slash
#                 super(IndexView, self).build()
#         else:
#             super(IndexView, self).build()


class IndexView(RenderReactMixin, BuildableListView):
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
                'title': _('Live Chicago election results, February 26, 2019'),
                'description': _('Full results list of Chicago races and candidates.'),
                'img': _('images/results-social-2.png'),
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
                    'index')[1:] + 'index.html'  # strip leading slash
                super(IndexView, self).build_queryset()
        else:
            super(IndexView, self).build_queryset()
