from django.contrib import admin
from apps.places.models import Place

class PlaceAdmin(admin.ModelAdmin):
    model= Place

admin.site.register(Place, PlaceAdmin)
