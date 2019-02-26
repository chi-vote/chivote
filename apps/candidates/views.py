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
from .models import Candidate, CandidateContact


class CandidateDetailView(BuildableTemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # from apps.races.models import Race

        candidateData = Candidate.objects.filter(
            pk=self.kwargs['candidateId']
        )

        contactData = CandidateContact.objects.filter(
            candidate=self.kwargs['candidateId']
        )

        react_dict = {
            'component': 'CandidateDetail',
            'props': {
                'data': {
                    'modelData': serializers.serialize('json', candidateData),
                    'contactData': serializers.serialize('json', contactData)
                },
            }
        }

        context.update(react_dict)

        return context
