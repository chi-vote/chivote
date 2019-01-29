from django.contrib import admin
from .models import Office


@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    model = Office
