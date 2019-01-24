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


@admin.register(CandidateStance)
class StanceAdmin(admin.ModelAdmin):
    model = CandidateStance
    autocomplete_fields = ('candidate', 'issue', )
