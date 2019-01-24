from django.contrib import admin
from apps.newsfeed.models import Article, CandidateStatement, Issue
# from apps.candidates.models import Candidate
# from apps.races.models import Race


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    model = Issue


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    model = Article
    # If you don't specify this, you will get a multiple select widget.
    filter_horizontal = ('race',)


@admin.register(CandidateStatement)
class StatementAdmin(admin.ModelAdmin):
    model = CandidateStatement
