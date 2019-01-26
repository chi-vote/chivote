from django.shortcuts import render
from bakery.views import BuildableDetailView
from .models import ContentItem


class ContentItemDetailView(BuildableDetailView):
    model = ContentItem
    template_name = 'page_detail.html'
