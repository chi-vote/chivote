from django.contrib import admin
from apps.candidates.models import Candidate, CandidateContact
from apps.questionnaires.models import Response


class ContactInline(admin.TabularInline):
    model = CandidateContact


class ResponseInline(admin.StackedInline):
    model = Response


class CandidateAdmin(admin.ModelAdmin):
    model = Candidate
    inlines = [
        ContactInline,
        ResponseInline
    ]


admin.site.register(Candidate, CandidateAdmin)
