from django.contrib import admin
from apps.newsfeed.models import FeedItem
from apps.races.models import Race

class FeedItemAdmin(admin.ModelAdmin):
     model= FeedItem
     filter_horizontal = ('races',) #If you don't specify this, you will get a multiple select widget.

admin.site.register(FeedItem, FeedItemAdmin)


"""
from apps.newsfeed.models import FeedItem, RaceTag
# Register your models here.

admin.site.register(FeedItem)
"""
