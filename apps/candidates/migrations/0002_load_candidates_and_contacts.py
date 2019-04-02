from django.db import migrations
from chivote.settings.base import BASE_DIR
from apps.candidates.models import Candidate, CandidateContact
from apps.offices.models import Office
from apps.races.models import Race
import csv


def clear_codes(apps,schema_editor):
    clear_candidate_codes()
    clear_race_codes()

def clear_candidate_codes():
    for candidate in Candidate.objects.all():
        candidate.cboe_results_id = None
        candidate.save()

def clear_race_codes():
    for race in Race.objects.all():
        race.cboe_results_id = None
        race.save()

def load_candidates(apps, schema_editor):
    input_file_path = BASE_DIR + '/apps/candidates/data/candidates.csv'

    candidates = [x for x in csv.DictReader(open(input_file_path))]
    for candidate in candidates:
        race = get_race(candidate)
        c = Candidate.objects.create(
            race=race,
            cboe_id=int(candidate['CndID']),
            incumbent=candidate['Incumbent'] == 'Y',
            ballot_order=int(candidate['CndOrd'])
        )
        c.save()
        make_contacts(c, candidate)


def make_contacts(candidate, row):
    contact_fields = ['Email1', 'Campaign Email (if different)', 'ResAdd1']
    contacts = dict((field, row[field]) for field in contact_fields)
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
        import ipdb
        ipdb.set_trace()
    return office.race_set.first()


def load_names(apps, schema_editor):
    input_file_path = BASE_DIR + '/apps/candidates/data/candidates_names.csv'

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
                full_name=None
            )

            for i in c:
                i.save()

        except ValueError:
            pass


def load_br_ids(apps, schema_editor):
    input_file_path = BASE_DIR + '/apps/candidates/data/br_candidates.csv'

    candidates = [x for x in csv.DictReader(open(input_file_path))]
    for candidate in candidates:
        try:
            c = Candidate.objects.filter(
                cboe_id=int(float(candidate['CndID']))
            )
            c.update(br_id=int(candidate['candidate_id']))
        except ValueError:
            pass


def load_br_data(apps, schema_editor):

    candidates = Candidate.objects.all()
    for i in range(len(candidates)):
        candidate = candidates[i]
        candidate.update_br_data()


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0001_initial'),
        ('races', '0002_load_races')
    ]

    operations = [
        migrations.RunPython(clear_codes),
        migrations.RunPython(load_candidates),
        migrations.RunPython(load_names),
        migrations.RunPython(load_br_ids),
        migrations.RunPython(load_br_data),
    ]
