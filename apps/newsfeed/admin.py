from django.contrib import admin
from .models import Article, CandidateStatement, Issue


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    model = Issue


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    model = Article
    # If you don't specify this, you will get a multiple select widget.
    filter_horizontal = ('candidate', 'race', 'issue',)


@admin.register(CandidateStatement)
class StatementAdmin(admin.ModelAdmin):
    model = CandidateStatement
    autocomplete_fields = ('candidate',)
    filter_horizontal = ('issue',)
