"""
scrape utilities for parsing Chicago Board of Elections data
see data:
    https://chicagoelections.com/results/ap/summary.txt
and layout:
    https://chicagoelections.com/results/ap/text_layout.txt
"""
import requests
import json
from apps.candidates.models import Candidate
from apps.races.models import Race
from chivote.settings.base import BASE_DIR

### START CONFIG ###
# est time window: 19:20 TUE - ~0200 WED
tue_scrape_target = 'https://chicagoelections.com/ap/summary.txt'
# est time window: ~0200 WED - all votes counted (+ pre-elex testing)
wed_scrape_target = 'https://chicagoelections.com/results/ap/summary.txt'

scrape_target = wed_scrape_target

lookup_json_path = BASE_DIR + '/apps/scrape/lookup.json'

# skip 
data_line_range_start = 3

race_code_range_start, race_code_range_end = 0, 4
race_name_range_start, race_name_range_end = 32, 87

cand_name_range_start, cand_name_range_end = 88, 126
cand_code_range_start, cand_code_range_end = 0, 7

cand_vote_range_start, cand_vote_range_end = 11, 18

race_elig_precinct_range_start, race_elig_precinct_range_end = 7, 11
race_comp_precinct_range_start, race_comp_precinct_range_end = 18, 22

### END CONFIG ###


def get_page(target=scrape_target):
    return requests.get(target).content.decode()


def get_data(page=get_page()):
    return page.splitlines()[data_line_range_start:]


def get_race_code(line):
    race_code = line[race_code_range_start:race_code_range_end]
    return race_code


def get_cand_code(line):
    return line[cand_code_range_start:cand_code_range_end]


def get_cand_name(line):
    return line[cand_name_range_start:cand_name_range_end].strip()


def get_race_name(line):
    return line[race_name_range_start:race_name_range_end].strip()


def get_cand_vote_total(line):
    return int(line[cand_vote_range_start:cand_vote_range_end])


def set_cand_vote_total(line, amt):
    """
    for testing:
    replaces results with 
    zeroed out dummy data
    """
    new_amt = str(amt).zfill(cand_vote_range_end - cand_vote_range_start)
    new_line = line[:cand_vote_range_start] + \
        new_amt + line[cand_vote_range_end:]
    return new_line


def get_race_eligible_precincts(line):
    # the total number of precincts in the ward/city
    return int(line[race_elig_precinct_range_start:race_elig_precinct_range_end])


def get_race_completed_precincts(line):
    # how many precincts are reporting
    return int(line[race_comp_precinct_range_start:race_comp_precinct_range_end])


def make_lookup_json(data=get_data()):
    """
    use scraped cboe_results_id
    to look up chi.vote name
    and also sanity check cboe_results_name
    {cboe_results_id:
        {
        'chi_vote_name':'XXXXX',
        'cboe_results_name':'YYYYYY'
        },
    }
    """
    lookup = {'races': dict(), 'candidates': dict()}
    for line in get_data():
        # add candidates
        cboe_cand_results_code = get_cand_code(line)
        cboe_cand_results_name = get_cand_name(line)
        try:
            candidate = Candidate.objects.get(
                cboe_results_id=cboe_cand_results_code)
        except Exception as e:
            print(e)
            import ipdb
            ipdb.set_trace()
        lookup['candidates'][cboe_cand_results_code] = {
            'chi_vote_name': candidate.full_name if not candidate.incumbent else candidate.full_name+'*',
            'cboe_results_name': cboe_cand_results_name,
        }
        # add races, if not added already
        cboe_race_results_code = get_race_code(line)
        if cboe_race_results_code in lookup['races']:
            continue
        cboe_race_results_name = get_race_name(line)
        race = Race.objects.get(cboe_results_id=cboe_race_results_code)

        lookup['races'][cboe_race_results_code] = {
            'chi_vote_name': race.results_slug,
            'cboe_results_name': cboe_race_results_name,
        }

    # write out
    lookup_file = open(lookup_json_path, 'w', encoding='utf-8')
    json.dump(lookup, lookup_file, ensure_ascii=False)
    lookup_file.close()
