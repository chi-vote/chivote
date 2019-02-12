from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from modeltranslation.translator import register, TranslationOptions
from .models import ContentItem
from .admin import ContentAdmin


@register(ContentItem)
class ContentTranslationOptions(TranslationOptions):
    fields = ('slug', 'title', 'description', 'content', 'helmet',)


class ContentTranslationAdmin(ContentAdmin, TranslationAdmin):
    # group_fieldsets = True
    pass


admin.site.unregister(ContentItem)
admin.site.register(ContentItem, ContentTranslationAdmin)
