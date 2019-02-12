import logging
from bakery.views import BuildableDetailView
from .models import ContentItem
logger = logging.getLogger(__name__)


class ContentItemDetailView(BuildableDetailView):
    model = ContentItem
    template_name = 'base_react.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            'absolute_url': self.get_object().get_absolute_url(),
            'component': 'ContentItemDetail',
            'props': {
                'title': self.object.title,
                'slug': self.object.slug,
                'content': self.object.content,
                'helmet': self.object.helmet,
                'background': self.object.background
            },
            'meta': {
                'title': self.object.title,
                'description': self.object.description,
            }
        }

        context.update(react_dict)

        return context

    def build_object(self, obj):
        from django.conf import settings
        from django.utils.translation import activate

        logger.debug("Building %s" % obj)

        if settings.USE_I18N:
            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                super(ContentItemDetailView, self).build_object(obj)
        else:
            super(ContentItemDetailView, self).build_object(obj)

    def unbuild_object(self, obj):
        from django.conf import settings
        from django.utils.translation import activate

        # logger.debug("Building %s" % obj)

        if settings.USE_I18N:
            for language_code, language in settings.LANGUAGES:
                activate(language_code)
                super(ContentItemDetailView, self).unbuild_object(obj)
        else:
            super(ContentItemDetailView, self).unbuild_object(obj)
