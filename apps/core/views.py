# from apps.races.views import ResultsListView
from django.utils.translation import gettext as _
from bakery.views import BuildableTemplateView, BuildableRedirectView, BuildableListView


class RenderReactMixin(object):
    """
    A mixin that can be used to inject rendered React
    """

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_component = self.react_component
        react_props = self.get_react_props()

        try:
            url = self.build_path
        except Exception:
            url = self.get_url(self.object)
        except Exception:
            url = None

        context.update(
            {
                "component": react_component,
                "props": react_props,
                "rendered": self._react_render(react_component, react_props, url)
            })
        return context

    def get_react_props(self):
        if hasattr(self, 'react_props'):
            return self.react_props
        else:
            return {}

    def _react_render(self, page, props={}, url=None):
        import json
        import requests

        try:
            serialized_props = json.dumps(props)

            render_dict = {
                'page': page,
                'serializedProps': serialized_props,
                'url': url,
            }

            res = requests.post('http://127.0.0.1:9009/render',
                                json=render_dict,
                                headers={'content_type': 'application/json'})
            rendered_content = res.json()['markup']

        except Exception as e:
            import pprint

            render_dict = {
                'page': page,
                'props': props,
                'url': url
            }

            rendered_content = f'<p class="has-text-warning">{e}</p>'
            rendered_content += f'<div class="has-text-white">{pprint.pformat(render_dict)}</div>'

        return rendered_content


class HomePageView(RenderReactMixin, BuildableTemplateView):
    """View function for home page of site."""
    template_name = 'base_rendered.html'
    build_path = 'home/index.html'

    react_component = 'homepage'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context.update({
            'absolute_url': '/',
            'meta': {
                'title': _('Everything you need to know to vote in Chicago on Feb. 26th'),
                'description': _('No matter if you’re a rookie voter or a veteran, we have everything you need.'),
                'img': _('images/C_2x1_Chi-vote_socialcard.png'),
            }
        })

        return context

    def build(self):
        from django.conf import settings

        if settings.USE_I18N:
            from django.utils.translation import activate
            from django.urls import reverse

            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                self.build_path = reverse(
                    'home')[1:] + '/index.html'  # strip leading slash
                super(HomePageView, self).build()
        else:
            super(HomePageView, self).build()


class ErrorView(BuildableTemplateView):
    """View function for the S3 error page."""
    template_name = 'error.html'
    build_path = 'error.html'
