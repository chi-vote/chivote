from django.contrib import admin
from apps.races.models import Race
from apps.candidates.models import Candidate

from django.forms import inlineformset_factory

# CandidateFormSet = inlineformset_factory(Race, Candidate, fields=('name',))


class CandidateInline(admin.TabularInline):
    model = Candidate
    extra = 0
    min_num = 1


@admin.register(Race)
class RaceAdmin(admin.ModelAdmin):
    model = Race
    inlines = [
        CandidateInline,
    ]

    def num_candidates(self, obj):
        candidates = Candidate.objects.filter(race=obj)
        return len(candidates)
        # return 3
        # link = reverse('admin:races_race_change', args=[obj.race.id])
        # return mark_safe(f'<a href="{link}">{escape(obj.race.__str__())}</a>') if obj.race else None
    # link_to_race.short_description = 'Race'
    # link_to_race.admin_order_field = 'race'

    list_display = ('__str__', 'num_candidates')
    ordering = ('id',)
