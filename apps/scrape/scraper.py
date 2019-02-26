import requests
import json
import pytz
import boto3
import logging
from datetime import datetime
from apps.scrape.utils import lookup_json_path, get_data,\
    get_race_code, get_cand_code, get_race_name, get_cand_name,\
    get_cand_vote_total, get_race_eligible_precincts,\
    get_race_completed_precincts

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


### START CONFIG ###
results_output_path = '/tmp/results.json'
timestamp_format = '%Y-%m-%dT%H:%M:%S%z'
s3_bucket_name = 'chi.vote.app.prod'  # switch to prod on elex nite
### END CONFIG ###

now = datetime.now().astimezone(pytz.timezone('US/Central'))

# if data fails to load,
# pass exception to logger


try:
    data = get_data()
except Exception(e):
    logger.error(e)

# helps translate cboe race, cand codes
# into proper chi.vote style
lookup_json = json.load(open(lookup_json_path))

# collect results
results = {
    'contest_headers': ["name", "prs_rpt", "prs_tot"],
    'cand_headers': ["name", "vote_cnt"],
    'datetime': now.strftime(timestamp_format),
    'timestamp': int(now.replace(microsecond=0).timestamp()),
    'contests': {},
    "cand_classes": ["", "amt append-bar"],
}


def scrape_results():
    # loop through scraped data
    # and append to results
    races = []  # keeps track of which results are in
    for row in data:
        # parse data from page,
        # row by row
        race_name = get_race_name(row)
        race_code = get_race_code(row)
        cv_race_name = lookup_json['races'][race_code]['chi_vote_name']

        cand_name = get_cand_name(row)
        cand_code = get_cand_code(row)
        try:
            cv_cand_name = lookup_json['candidates'][cand_code]['chi_vote_name']
        except Exception as e:
            logger.error(e)

        cand_vote_total = get_cand_vote_total(row)

        comp_precincts = get_race_completed_precincts(row)  # reporting
        elig_precincts = get_race_eligible_precincts(row)  # total

        # adds race-level data
        # to results['contests']
        if race_name not in races:
            results['contests'][race_code] = {
                'meta': [cv_race_name, comp_precincts, elig_precincts],
                'cands': []
            }
            # don't process this top-level race data next time
            races.append(race_name)

        # adds candidate-level data
        # to results['contests'][race]['candidates']
        results['contests'][race_code]['cands'].append(
            [cv_cand_name, cand_vote_total]
        )

    # write out
    results_json_file = open(results_output_path, 'w')
    json.dump(results, results_json_file)
    results_json_file.close()

    # upload to s3
    s3 = boto3.resource('s3')
    results_json_wb = open(results_output_path, 'rb')
    logger.info('uploading results')
    s3.Bucket(name=s3_bucket_name).put_object(
        Key='results.json',
        Metadata={'Content-Type': 'text/json'},
        Body=results_json_wb)
