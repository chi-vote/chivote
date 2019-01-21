# Generated by Django 2.1.5 on 2019-01-21 02:48

from django.db import migrations
from chivote.settings.base import BASE_DIR
from apps.candidates.models import Candidate, CandidateContact
from apps.offices.models import Office
from apps.races.models import Race
import csv

input_file_path = BASE_DIR + '/apps/candidates/data/candidates.csv'

def load(apps,schema_editor):
    candidates = [x for x in csv.DictReader(open(input_file_path))]
    for candidate in candidates:
        race = get_race(candidate)
        c = Candidate.objects.create(
                race = race,
                name = candidate['CndNme'],
                cboe_id = int(candidate['CndID']),
                incumbent = candidate['Incumbent'] == 'Y',
                ballot_order = int(candidate['CndOrd'])
                )
        c.save()
        make_contacts(c,candidate)


def make_contacts(candidate, row):
    contact_fields = ['Email1','Campaign Email (if different)','ResAdd1']
    contacts = dict((field,row[field]) for field in contact_fields)
    for contact_field in contacts:
        if contacts[contact_field]:
            if 'email' in contact_field.lower():
                contact_type = 'email'
            elif 'add' in contact_field.lower():
                contact_type = 'home address'
            else:
                pass
            cc = CandidateContact.objects.create(
                    candidate=candidate,
                    contact_type=contact_type,
                    contact_value=contacts[contact_field]
                    )
            cc.save()

def get_race(candidate):
    office_name = candidate['OffNme'].lower()
    if 'mayor' in office_name:
        office = Office.objects.get(name='Mayor')
    elif 'clerk' in office_name:
        office = Office.objects.get(name='Clerk')
    elif 'treasurer' in office_name:
        office = Office.objects.get(name='Treasurer')
    elif 'alderman' in office_name:
        ward = candidate['DstHdr']
        office = Office.objects.get(name='Ward ' + ward + ' Alderman')
    else:
        import ipdb; ipdb.set_trace()
    return office.race_set.first()



class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0003_auto_20190121_0248'),
    ]

    operations = [
            migrations.RunPython(load)
    ]
