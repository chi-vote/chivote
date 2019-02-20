from django.utils.translation import gettext as _
from bakery.views import BuildableTemplateView


class RenderReactMixin(object):
    """
    A mixin that can be used to inject rendered React
    """

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_component = self.react_component
        react_props = self.get_react_props()

        context.update(
            {
                "component": react_component,
                "props": react_props,
                "rendered": self._react_render(react_component, react_props)
            })
        return context

    def get_react_props(self):
        if hasattr(self, 'react_props'):
            return self.react_props
        else:
            return {}

    def _react_render(self, page, props={}):
        import json
        import requests

        serialized_props = json.dumps(props)

        render_dict = {
            'page': page,
            'serializedProps': serialized_props
        }

        res = requests.post('http://127.0.0.1:9009/render',
                            json=render_dict,
                            headers={'content_type': 'application/json'})
        rendered_content = res.json()['markup']

        return rendered_content


class HomePageView(RenderReactMixin, BuildableTemplateView):
    """View function for home page of site."""
    template_name = 'base_rendered.html'
    build_path = 'index.html'

    react_component = 'homepage'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            'absolute_url': '/',
            'meta': {
                'title': _('Everything you need to know to vote in Chicago on Feb. 26th'),
                'description': _('No matter if you’re a rookie voter or a veteran, we have everything you need.'),
                'img': _('images/C_2x1_Chi-vote_advert.png'),
            }
        }

        context.update(react_dict)

        return context

    def build(self):
        from django.conf import settings

        if settings.USE_I18N:
            from django.utils.translation import activate
            from django.urls import reverse

            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                self.build_path = reverse(
                    'index')[1:] + '/index.html'  # strip leading slash
                super(HomePageView, self).build()
        else:
            super(HomePageView, self).build()


class ErrorView(BuildableTemplateView):
    """View function for the S3 error page."""
    template_name = 'error.html'
    build_path = 'error.html'
