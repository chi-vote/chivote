from django.utils.translation import gettext as _
from bakery.views import BuildableTemplateView


class HomePageView(BuildableTemplateView):
    """View function for home page of site."""
    template_name = 'base_rendered.html'
    build_path = 'index.html'

    def get_context_data(self, **kwargs):
        from react.render import render_component

        # rendered = render_component('path/to/component.jsx', {'foo': 'bar'})

        context = super().get_context_data(**kwargs)

        react_dict = {
            'absolute_url': '/',
            'component': 'homepage',
            'meta': {
                'title': _('Everything you need to know to vote in Chicago on Feb. 26th'),
                'description': _('No matter if you’re a rookie voter or a veteran, we have everything you need.'),
                'img': _('images/C_2x1_Chi-vote_advert.png'),
            }
        }

        context.update(react_dict)
        context.update({"rendered": self._react_render()})

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

    def _react_render(self):
        import requests

        res = requests.post('http://127.0.0.1:9009/render',
                            # json=render_assets,
                            headers={'content_type': 'application/json'})
        rendered_content = res.json()['markup']

        return rendered_content


class ErrorView(BuildableTemplateView):
    """View function for the S3 error page."""
    template_name = 'error.html'
    build_path = 'error.html'
