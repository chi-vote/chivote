import os
import logging

from django.conf import settings
from django.utils.html import conditional_escape, mark_safe, strip_tags

from bakery.feeds import BuildableFeed

from .models import Race

logger = logging.getLogger(__name__)

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


class RaceFeed(BuildableFeed):
    # title = 'Chi.vote'
    # link = '/'
    # description = 'Articles from Chicago media organizations about the February 2019 election'

    def get_object(self, request, slug):
        return Race.objects.get(slug=slug)

    def get_queryset(self):
        return Race.objects.all()

    def get_content(self, obj):
        return super().get_content(obj.slug)

    def title(self, obj):
        return "Chi.vote: Articles for the race for %s" % str(obj)

    def description(self, obj):
        return "Articles from Chicago media organizations about the race for %s" % str(obj)

    def items(self, obj):
        return obj.articles.filter(is_published=True).order_by('-date')[:10]

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
        return os.path.join('https://chi.vote/', CHIVOTE_PREFIX_URL, 'races/', obj.slug, 'articles/')

    def feed_url(self, obj):
        return os.path.join('https://chi.vote/', CHIVOTE_PREFIX_URL, 'races/', obj.slug, 'articles/rss.xml')

    def build_path(self, obj):
        return os.path.join(chivote_prefix('races/'), obj.slug, 'articles/rss.xml')

    def build_queryset(self, my_queryset=None):
        if my_queryset == None:
            my_queryset = self.get_queryset()

        for obj in my_queryset:
            build_path = self._get_bakery_dynamic_attr('build_path', obj)
            url = self._get_bakery_dynamic_attr('feed_url', obj)

            logger.debug("Building %s" % build_path)

            self.request = self._get_bakery_dynamic_attr(
                'create_request',
                obj,
                args=[url or build_path]
            )

            self.prep_directory(build_path)
            path = os.path.join(settings.BUILD_DIR, build_path)
            content = self._get_bakery_dynamic_attr('get_content', obj)
            self.build_file(path, content)
