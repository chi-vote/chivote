from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from modeltranslation.translator import register, TranslationOptions
from .models import Office
from .admin import OfficeAdmin


@register(Office)
class OfficeTranslationOptions(TranslationOptions):
    fields = ('name',)


class OfficeTranslationAdmin(OfficeAdmin, TranslationAdmin):
    pass


admin.site.unregister(Office)
admin.site.register(Office, OfficeTranslationAdmin)
