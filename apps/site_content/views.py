import logging
from django.utils.translation import gettext as _
from bakery.views import BuildableDetailView
from apps.core.views import RenderReactMixin
from .models import ContentItem

logger = logging.getLogger(__name__)


class ContentItemDetailView(RenderReactMixin, BuildableDetailView):
    model = ContentItem
    template_name = 'base_rendered.html'
    react_component = 'pageDetail'

    def get_react_props(self):
        return {
            'title': self.object.title,
            'slug': self.object.slug,
            'content': self.object.content,
            'helmet': self.object.helmet,
            'background': self.object.background
        }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context.update({
            'absolute_url': self.get_object().get_absolute_url(),
            'meta': {
                'title': self.object.title,
                'description': self.object.description,
                'img': _('images/socialrunoff.jpg'),
            }
        })

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
