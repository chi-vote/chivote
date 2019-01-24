import json

from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.views.generic.base import TemplateView

from bakery.views import BuildableDetailView, BuildableListView, BuildableTemplateView

from .models import Race


class RaceDetailView(BuildableDetailView):
  model = Race
  template_name = 'race_detail.html'

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)

    from apps.candidates.models import Candidate

    candidates = Candidate.objects.filter(
      race=self.kwargs['pk']
    )

    raceData = Race.objects.filter(
      office=self.kwargs['pk']
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


class RaceListView(BuildableTemplateView):
  model = Race
  template_name = 'race_list.html'

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)

    raceData = Race.objects.all()

    races = []

    for race in raceData:
      races.append({
        'name': race.__str__(),
        'id': race.pk
      })

    react_dict = {
      'component': 'RaceList',
      'props': {
        'data': {
          'races': json.dumps(list(races), cls=DjangoJSONEncoder),
        },
      }
    }

    context.update(react_dict)

    return context
    # build_path = 'races/index.html'
