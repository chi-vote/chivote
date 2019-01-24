from django.contrib import admin
from .models import Article, CandidateStance, Issue


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    model = Issue
    search_fields = ('name', )


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    model = Article
    # If you don't specify this, you will get a multiple select widget.
    filter_horizontal = ('candidate', 'race', 'issue',)

    def str_candidate(self, obj):
        return ', '.join([str(c) for c in obj.candidate.all()])
    str_candidate.short_description = 'Candidate(s)'

    def str_race(self, obj):
        from django.utils.safestring import mark_safe

        def rendered_link(obj):
            from django.urls import reverse
            from django.utils.html import escape

            link = reverse('admin:races_race_change', args=[obj.id])
            return f'<a href="{link}">{escape(obj.__str__())}</a>'

        # return mark_safe(', '.join([rendered_link(r) for r in obj.race.all()]))
        return ', '.join(str(r) for r in obj.race.all())
    str_race.short_description = 'Race(s)'

    def str_issue(self, obj):
        return ', '.join([str(i) for i in obj.issue.all()])
    str_issue.short_description = 'Issue(s)'

    def rendered_link(self, obj):
        from django.utils.safestring import mark_safe
        import textwrap
        link_str = textwrap.shorten(obj.link, width=60)
        return mark_safe(f'<a href="{obj.link}">{link_str}</a>')
    rendered_link.short_description = 'Link'

    list_display = ('hed', 'date', 'source',
                    'rendered_link', 'str_race', 'str_issue')
    ordering = ('-date',)


@admin.register(CandidateStance)
class StanceAdmin(admin.ModelAdmin):
    model = CandidateStance
    autocomplete_fields = ('candidate', 'issue', )

    def getrace(self, obj):
        return str(obj.candidate.race)
    getrace.short_description = 'Race'

    list_display = ('__str__', 'candidate',
                    'issue', 'getrace', 'source')
