from django.contrib import admin
from apps.newsfeed.models import FeedItem, CandidateStatement
from apps.candidates.models import Candidate
from apps.races.models import Race

class FeedItemAdmin(admin.ModelAdmin):
    model = FeedItem
    filter_horizontal = ('races',) #If you don't specify this, you will get a multiple select widget.

class StatementAdmin(admin.ModelAdmin):
    model = CandidateStatement

admin.site.register(FeedItem, FeedItemAdmin)
admin.site.register(CandidateStatement, StatementAdmin)
