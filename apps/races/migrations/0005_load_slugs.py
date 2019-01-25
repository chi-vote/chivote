from django.db import migrations
from ..models import Race


def load_slugs(apps, schema_editor):

    races = Race.objects.all()
    for r in races:
        r.save()


class Migration(migrations.Migration):

    dependencies = [
        ('races', '0004_race_slug'),
    ]

    operations = [
        migrations.RunPython(load_slugs),
    ]
