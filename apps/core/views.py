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


class ErrorView(BuildableTemplateView):
    template_name = 'error.html'
    build_path = 'error.html'
