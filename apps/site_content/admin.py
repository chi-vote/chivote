from django.contrib import admin
from apps.site_content.models import ContentItem


class ContentAdmin(admin.ModelAdmin):
    model = ContentItem

admin.site.register(ContentItem, ContentAdmin)
