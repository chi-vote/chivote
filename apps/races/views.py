import datetime
import json
from random import randrange

from django.urls import reverse, reverse_lazy
from django.core import serializers
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
from .models import Race

class RaceDetailView(BuildableTemplateView):
  template_name = 'index.html'
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)

    from apps.candidates.models import Candidate

    candidates = Candidate.objects.filter(
      race=self.kwargs['raceId']
    )

    raceData = Race.objects.filter(
      office=self.kwargs['raceId']
    )

    react_dict = {
      'component': 'RaceDetail',
      'props': {
        'data': {
          'modelData': serializers.serialize('json', raceData),
          'office': 'mayor',
          'description': '''Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi autem, explicabo ipsam
          deserunt id vel eos pariatur aut consequuntur nesciunt optio atque est praesentium quia saepe dicta
          exercitationem. In temporibus maiores facilis eligendi laudantium! Esse, corporis dolorum a possimus
          dolorem harum, perferendis inventore earum, neque ducimus quod odio omnis. Voluptas!''',
          'cycle': {
            'date': 'February 26, 2019'
          }
        },
        'candidates': serializers.serialize('json', candidates)
      }
    }


    context.update(react_dict)

    return context
