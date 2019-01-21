from django.contrib import admin
from apps.races.models import Race

class RaceAdmin(admin.ModelAdmin):
    model = Race

admin.site.register(Race, RaceAdmin)

