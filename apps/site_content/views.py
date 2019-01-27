import json
from django.core import serializers
from bakery.views import BuildableDetailView
from django.core import serializers
from .models import ContentItem


class ContentItemDetailView(BuildableDetailView):
    model = ContentItem
    template_name = 'page_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            'component': 'ContentItemDetail',
            'props': {
                'title': self.object.title,
                'slug': self.object.slug,
                'content': self.object.content,
                'helmet': self.object.helmet,
                'background': self.object.background
            }
        }

        context.update(react_dict)

        return context
