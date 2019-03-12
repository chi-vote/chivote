import os

from django.contrib.syndication.views import Feed
from django.conf import settings
from django.utils.html import conditional_escape, mark_safe, strip_tags

from bakery.feeds import BuildableFeed

from .models import Article


try:
    CHIVOTE_PREFIX_URL = settings.CHIVOTE_PREFIX_URL
except AttributeError:
    CHIVOTE_PREFIX_URL = ''


def chivote_prefix(url):
    '''
    prefix url path with CHIVOTE_URL_PREFIX from settings
    '''

    try:
        return os.path.join(settings.CHIVOTE_URL_PREFIX, url)
    except AttributeError:
        return url


class LatestArticlesFeed(BuildableFeed):
    title = 'Chi.vote'
    description = 'Articles from Chicago media organizations about the February 2019 election'

    def items(self):
        return Article.objects.filter(is_published=True).order_by('-date')[:20]

    def item_title(self, item):
        return item.hed

    def item_description(self, item):
        # return conditional_escape(strip_tags(item.summary))
        return strip_tags(item.summary)

    def item_link(self, item):
        return item.link

    def item_pubdate(self, item):
        return item.date

    def link(self, obj):
        return os.path.join('https://chi.vote/', CHIVOTE_PREFIX_URL)

    def feed_url(self, obj):
        return os.path.join('https://chi.vote/', CHIVOTE_PREFIX_URL, 'rss.xml')

    def build_path(self, obj):
        return os.path.join(chivote_prefix(''), 'rss.xml')
