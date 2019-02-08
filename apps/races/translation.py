from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from modeltranslation.translator import register, TranslationOptions
from .models import Race
from .admin import RaceAdmin


@register(Race)
class RaceTranslationOptions(TranslationOptions):
    fields = ('explainer',)


class RaceTranslationAdmin(RaceAdmin, TranslationAdmin):
    pass


admin.site.unregister(Race)
admin.site.register(Race, RaceTranslationAdmin)
