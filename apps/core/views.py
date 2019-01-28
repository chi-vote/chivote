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
    build_path = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        react_dict = {
            'component': 'Homepage',
        }

        # context.update(context_dict)
        context.update(react_dict)

        return context


class RaceDetailView(BuildableTemplateView):
    template_name = 'race-view.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        description: ''

        react_dict = {
            'component': 'RaceDetail',
            'props': {
                'data': {
                    'office': 'mayor',
                    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi autem, explicabo ipsam' /
                    'deserunt id vel eos pariatur aut consequuntur nesciunt optio atque est praesentium quia saepe dicta' /
                    'exercitationem. In temporibus maiores facilis eligendi laudantium! Esse, corporis dolorum a possimus' /
                    'dolorem harum, perferendis inventore earum, neque ducimus quod odio omnis. Voluptas!',
                    'cycle': {
                        'date': datetime.date(2019, 2, 26)
                    }
                },
                'candidates': [
                    {
                        'personId': 1,
                        'full_name': 'Amara Enyia',
                        'photo': ''
                    },
                    {
                        'personId': 2,
                        'full_name': 'Toni Periwinkle',
                        'photo': ''
                    },
                    {
                        'personId': 3,
                        'full_name': 'Susana Mendoza',
                        'photo': ''
                    },
                ]
            }
        }

        context.update(react_dict)

        return context
