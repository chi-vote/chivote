from django.contrib import admin
from django.forms import ModelForm

from django.utils.translation import ugettext_lazy as _

from apps.candidates.models import Candidate, CandidateContact
from apps.questionnaires.models import Response


class ContactInline(admin.TabularInline):
    model = CandidateContact
    extra = 0
    min_num = 1


class ResponseInline(admin.StackedInline):
    model = Response
    extra = 0


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
        ResponseInline
    ]
    fieldsets = (
        (None, {
            'fields': ('name', 'race', 'incumbent', 'ballot_order')
        }),
        ('Alternate keys', {
            'classes': ('collapse',),
            'fields': ('cboe_id', 'isbe_id', 'br_id', 'ri_id')
        })
    )

    # list screen
    list_display = ('__str__', 'race', 'incumbent')
    list_filter = ('race',)
    ordering = ('race', 'ballot_order',)
