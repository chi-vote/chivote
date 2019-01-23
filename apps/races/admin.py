from django.contrib import admin
from apps.races.models import Race
from apps.candidates.models import Candidate

from adminsortable2.admin import SortableInlineAdminMixin

from django.forms import inlineformset_factory


# CandidateFormSet = inlineformset_factory(Race, Candidate, fields=('name',))


class CandidateInline(SortableInlineAdminMixin, admin.TabularInline):
    model = Candidate
    extra = 0
    min_num = 1

    def link_to_candidate(self, obj):
        from django.urls import reverse
        from django.utils.safestring import mark_safe

        link = reverse('admin:candidates_candidate_change', args=[obj.pk])
        return mark_safe(f'<a href="{link}">Edit</a>') if obj.pk else None

    link_to_candidate.short_description = 'Edit'
    # link_to_candidate.admin_order_field = 'race'

    # fields = ('__all__', 'link_to_candidate',)
    readonly_fields = ('link_to_candidate',)


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

    list_display = ('__str__', 'num_candidates',)
    ordering = ('id',)
