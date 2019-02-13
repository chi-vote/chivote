from django.contrib import admin
from adminsortable2.admin import SortableInlineAdminMixin

from apps.races.models import Race
from apps.candidates.models import Candidate
from apps.newsfeed.models import Article, TaggedArticle


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

    fields = ('status', 'incumbent', 'cboe_id', 'isbe_id',
              'br_id', 'ri_id', 'link_to_candidate')
    readonly_fields = ('link_to_candidate',)


class ArticleInline(admin.TabularInline):
    model = TaggedArticle
    extra = 0
    min_num = 1

    def article_hed(self, instance):
        return instance.article.hed
    article_hed.short_description = 'hed'

    def article_date(self, instance):
        return instance.article.date
    article_date.short_description = 'date published'

    def article_source(self, instance):
        return instance.article.source
    article_source.short_description = 'source'

    fields = ('article_hed', 'article_date',
              'article_source', 'is_pinned', )
    readonly_fields = ('article_hed', 'article_date',
                       'article_source', )


@admin.register(Race)
class RaceAdmin(admin.ModelAdmin):
    model = Race
    inlines = [
        CandidateInline,
        ArticleInline,
    ]

    def num_candidates(self, obj):
        candidates = obj.candidates.all().exclude(status='inactive')
        return len(candidates)
    num_candidates.short_description = '# active candidates'

    def shorter_explainer(self, obj):
        from django.utils.html import strip_tags
        import textwrap
        link_str = textwrap.shorten(strip_tags(obj.explainer), width=60)
        return link_str
    shorter_explainer.short_description = 'Explainer'

    def num_articles(self, obj):
        articles = obj.articles.filter(is_published=True)
        return len(articles)
    num_articles.short_description = '# articles'

    def num_pinned_articles(self, obj):
        pinned_articles = obj.tagged_articles.filter(is_pinned=True)
        return len(pinned_articles)
    num_pinned_articles.short_description = '# pinned articles'

    list_display = ('__str__', 'num_candidates', 'slug',
                    'documenters_slug', 'num_articles', 'num_pinned_articles',)
    ordering = ('id',)
    readonly_fields = ('slug',)
