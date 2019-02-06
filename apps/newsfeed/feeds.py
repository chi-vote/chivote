from django.contrib.syndication.views import Feed
from django.utils.html import conditional_escape, mark_safe, strip_tags
from .models import Article


class LatestArticlesFeed(Feed):
    title = 'Chi.vote'
    link = '/'
    description = 'Articles from Chicago media organizations about the February 2019 election'

    def items(self):
        return Article.objects.order_by('date')[:10]

    def item_title(self, item):
        return item.hed

    def item_description(self, item):
        # return conditional_escape(strip_tags(item.summary))
        return strip_tags(item.summary)

    def item_link(self, item):
        return item.link
