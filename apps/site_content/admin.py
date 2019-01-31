from django.contrib import admin
from apps.site_content.models import ContentItem


class ContentAdmin(admin.ModelAdmin):
    model = ContentItem
    list_display = ('title', 'slug', 'is_published')
    ordering = ('slug',)


admin.site.register(ContentItem, ContentAdmin)
