from django.contrib import admin
from .models import Article, CandidateStance, Issue, TaggedArticle
from adminsortable2.admin import SortableAdminMixin


@admin.register(Issue)
class IssueAdmin(SortableAdminMixin, admin.ModelAdmin):
    model = Issue
    # list_display = ('name', 'issue_order')
    search_fields = ('name', )
    ordering = ('issue_order',)


class TaggedArticleInline(admin.TabularInline):
    model = TaggedArticle
    extra = 0
    # filter_horizontal = ("race",)
    fields = ('race',)
    verbose_name = 'race'
    verbose_name_plural = 'race(s)'


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    model = Article
    inlines = (TaggedArticleInline,)
    # If you don't specify this, you will get a multiple select widget.
    filter_horizontal = ('candidates', 'issues',)

    def str_candidates(self, obj):
        return ', '.join([str(c) for c in obj.candidates.all()])
    str_candidates.short_description = 'Candidate(s)'

    def str_races(self, obj):
        from django.utils.safestring import mark_safe

        def rendered_link(obj):
            from django.urls import reverse
            from django.utils.html import escape

            link = reverse('admin:races_race_change', args=[obj.id])
            return f'<a href="{link}">{escape(obj.__str__())}</a>'

        # return mark_safe(', '.join([rendered_link(r) for r in obj.race.all()]))
        return ', '.join(str(r) for r in obj.races.all())
    str_races.short_description = 'Race(s)'

    def str_issues(self, obj):
        return ', '.join([str(i) for i in obj.issues.all()])
    str_issues.short_description = 'Issue(s)'

    def rendered_link(self, obj):
        from django.utils.safestring import mark_safe
        import textwrap
        link_str = textwrap.shorten(obj.link, width=60)
        return mark_safe(f'<a href="{obj.link}">{link_str}</a>')
    rendered_link.short_description = 'Link'

    list_display = ('hed', 'date', 'source',
                    'rendered_link', 'str_races', 'str_candidates', 'str_issues', 'is_published', )
    ordering = ('-date',)
    list_filter = ('races',)


@admin.register(CandidateStance)
class StanceAdmin(admin.ModelAdmin):
    model = CandidateStance
    autocomplete_fields = ('candidate', 'issue', )

    def getrace(self, obj):
        return str(obj.candidate.race)
    getrace.short_description = 'Race'

    list_display = ('__str__', 'candidate',
                    'issue', 'getrace', 'source', 'is_published')
