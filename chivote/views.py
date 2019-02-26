from apps.core.views import HomePageView
from apps.races.views import ResultsListView


class IndexView(ResultsListView):
    """View function for the landing page (/index.html)"""
    build_path = 'index.html'

    def build_queryset(self):
        from django.conf import settings

        if settings.USE_I18N:
            from django.utils.translation import activate
            from django.urls import reverse

            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                self.build_path = reverse(
                    'index')[1:] + '/index.html'  # strip leading slash
                super(IndexView, self).build_queryset()
        else:
            super(IndexView, self).build_queryset()

    # def build(self):
    #     from django.conf import settings

    #     if settings.USE_I18N:
    #         from django.utils.translation import activate
    #         from django.urls import reverse

    #         for language_code, language in settings.LANGUAGES:
    #             activate(language_code)
    #             self.build_path = reverse(
    #                 'index')[1:] + '/index.html'  # strip leading slash
    #             super(IndexView, self).build()
    #     else:
    #         super(IndexView, self).build()
