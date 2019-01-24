from django.db import migrations
from chivote.settings.base import BASE_DIR
import csv
from apps.candidates.models import Candidate

input_file_path = BASE_DIR + '/apps/candidates/data/candidates_names.csv'


def load(apps, schema_editor):
    candidates = [x for x in csv.DictReader(
        open(input_file_path, encoding='utf-8-sig'))]
    for candidate in candidates:
        try:
            c = Candidate.objects.filter(
                cboe_id=int(float(candidate['CndID']))
            )
            c.update(
                last_name=candidate['last_name'],
                first_name=candidate['first_name'],
                middle_name=candidate['middle_name'],
                suffix=candidate['suffix'],
            )

            for i in c:
                i.save()

        except ValueError:
            pass


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0009_auto_20190124_1521'),
    ]

    operations = [
        migrations.RunPython(load)
    ]
