from django.contrib import admin
from django.forms import ModelForm

from django.utils.translation import ugettext_lazy as _

from apps.candidates.models import Candidate, CandidateContact
# from apps.questionnaires.models import Response


class ContactInline(admin.TabularInline):
    model = CandidateContact
    extra = 0
    min_num = 0


# class ResponseInline(admin.StackedInline):
#     model = Response
#     extra = 0


class CandidateForm(ModelForm):
    class Meta:
        model = Candidate
        fields = '__all__'
        labels = {
            'cboe_id': _('Chicago Board of Elections'),
            'isbe_id': _('Illinois State Board of Elections'),
            'br_id': _('BallotReady'),
            'ri_id': _('Reform Illinois'),
        }


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    model = Candidate
    form = CandidateForm
    inlines = [
        ContactInline,
        # ResponseInline
    ]
    fieldsets = (
        (None, {
            'fields': ('first_name', 'middle_name', 'last_name', 'suffix', 'full_name', 'race', 'status', 'incumbent', 'ballot_order')
        }),
        ('Alternate keys', {
            'classes': ('collapse',),
            'fields': ('cboe_id', 'isbe_id', 'br_id', 'ri_id')
        }),
        ('From Ballot Ready', {
            'fields': ('br_thumb_url', 'br_photo_url', 'br_urls', 'br_endorsements', 'br_experience', 'br_education')
        })
    )
    search_fields = ['full_name']
    readonly_fields = ('br_thumb_url', 'br_photo_url', 'br_urls',
                       'br_endorsements', 'br_experience', 'br_education')

    def link_to_race(self, obj):
        from django.urls import reverse
        from django.utils.html import escape
        from django.utils.safestring import mark_safe

        link = reverse('admin:races_race_change', args=[obj.race.id])
        return mark_safe(f'<a href="{link}">{escape(obj.race.__str__())}</a>') if obj.race else None
    link_to_race.short_description = 'Race'
    link_to_race.admin_order_field = 'race'

    # list screen
    list_display = ('__str__', 'link_to_race', 'status',
                    'incumbent', 'cboe_id', 'br_id')
    list_filter = ('status', 'race',)
    ordering = ('race', 'ballot_order',)
