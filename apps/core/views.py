import datetime
from random import randrange

from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views import generic
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.contrib.auth.decorators import permission_required

from bakery.views import BuildableDetailView, BuildableListView, BuildableTemplateView

# from .forms import RenewBookForm, RenewBookModelForm
# from .models import Book, Author, BookInstance, Genre


class HomePageView(BuildableTemplateView):
    """View function for home page of site."""
    template_name = 'base_react.html'
    build_path = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            'absolute_url': '/',
            'component': 'Homepage',
            'meta': {
                'title': 'Everything you need to know to vote in Chicago on Feb. 26th',
                'description': 'No matter if you’re a rookie voter or a veteran, we have everything you need.',
                'img': 'images/chivote-social-card.jpg',
            }
        }

        # context.update(context_dict)
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
    template_name = 'error.html'
    build_path = 'error.html'
