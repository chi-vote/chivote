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
    template_name = 'index.html'
    # template_name = 'react-demo.html'
    # build_path = 'catalog/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            'component': 'App',
            'props': {
              'env': 'Django'
            },
        }

        # context.update(context_dict)
        context.update(react_dict)

        return context
