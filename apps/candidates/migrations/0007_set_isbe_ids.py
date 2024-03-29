# Generated by Django 2.1.5 on 2019-02-12 23:09
from django.db import migrations
from chivote.settings.base import BASE_DIR
from apps.candidates.models import Candidate
import csv

### START CONFIG ###
data_dir = BASE_DIR + '/apps/candidates/data/'
data_infile_path = data_dir + 'candidate_committee_lookup.csv'
### END CONFIG ###

def update(apps,schema_editor):
    data_infile = open(data_infile_path)
    data_csv = [x for x in csv.DictReader(data_infile)]
    for row in data_csv:
        candidates = Candidate.objects.filter(cboe_id=row['CBOE_ID'])
        if candidates and len(list(candidates)) == 1:
            candidate = candidates[0]
            if row['Committee_ID'] and row['Committee_ID'] != 'NULL' and row['Committee_Type'] == 'Candidate Committee':
                candidate.isbe_id = row['Committee_ID']
            try:
                candidate.save()
            except:
                import ipdb; ipdb.set_trace()

class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0006_auto_20190212_1719'),
        #('candidates', '0005_auto_20190131_1225'),
    ]

    operations = [
            migrations.RunPython(update)
    ]
