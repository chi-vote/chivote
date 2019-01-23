from django.db import migrations
from chivote.settings.base import BASE_DIR
import csv
from apps.candidates.models import Candidate

input_file_path = BASE_DIR + '/apps/candidates/data/br_candidates.csv'


def load(apps, schema_editor):
    candidates = [x for x in csv.DictReader(open(input_file_path))]
    for candidate in candidates:
        try:
            c = Candidate.objects.filter(
                cboe_id=int(float(candidate['CndID']))
            )
            c.update(br_id=int(candidate['candidate_id']))
        except ValueError:
            pass


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0004_load_candidates_and_contacts'),
    ]

    operations = [
        migrations.RunPython(load)
    ]
