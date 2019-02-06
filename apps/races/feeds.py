from django.contrib.syndication.views import Feed
from os import path
from .models import Race
from django.utils.html import conditional_escape, mark_safe, strip_tags


class RaceFeed(Feed):
    # title = 'Chi.vote'
    # link = '/'
    # description = 'Articles from Chicago media organizations about the February 2019 election'

    def get_object(self, request, slug):
        return Race.objects.get(slug=slug)

    def title(self, obj):
        return "Chi.vote: Articles for the race for %s" % str(obj)

    def link(self, obj):
        return path.join(obj.get_absolute_url(), 'articles/')

    def description(self, obj):
        return "Articles from Chicago media organizations about the race for %s" % str(obj)

    def items(self, obj):
        return obj.articles.order_by('-date')[:10]

    def item_title(self, item):
        return item.hed

    def item_description(self, item):
        # return conditional_escape(strip_tags(item.summary))
        return strip_tags(item.summary)

    def item_link(self, item):
        return item.link

    # def items(self):
    #     return Article.objects.order_by('date')[:10]

    # def item_title(self, item):
    #     return item.hed

    # def item_description(self, item):
    #     # return conditional_escape(strip_tags(item.summary))
    #     return strip_tags(item.summary)

    # def item_link(self, item):
    #     return item.link
