import requests
import json
import pytz
import boto3
import logging
from datetime import datetime
from .utils import lookup_json_path, scrape_target,\
    get_race_code, get_cand_code, get_race_name, get_cand_name,\
    get_cand_vote_total, get_race_eligible_precincts,\
    get_race_completed_precincts, set_cand_vote_total,\
    get_page, get_data

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


### START CONFIG ###
results_output_path = '/tmp/results.json'
timestamp_format = '%Y-%m-%dT%H:%M:%S%z'
# s3_bucket_name = 'chi.vote.app.stage' # switch to prod on elex nite
s3_bucket_name = 'chi.vote.app.prod'  # switch to prod on elex nite
### END CONFIG ###

# helps translate cboe race, cand codes
# into proper chi.vote style
lookup_json = json.load(open(lookup_json_path))


def scrape_results(upload=True):
    # if data fails to load,
    # pass exception to logger
    try:
        data = get_data(get_page(scrape_target))
        results = transform_results(data)
        write_results(results, results_output_path)

        if upload:
            upload_results(results_output_path)

        return results

    except KeyboardInterrupt:
        raise
    except Exception as e:
        logger.error(e)
        raise Exception


def get_time():
    try:
        from bs4 import BeautifulSoup
        from dateutil.parser import parse

        response = requests.get(
            'https://chicagoelections.com/results/ap/results.htm')
        soup = BeautifulSoup(response.content, features="html.parser")
        last_updated = soup.find(
            id='ResultsContainer').get_text().split('Last Updated: ')[1]

        return parse(last_updated).astimezone(pytz.timezone('US/Central'))
    except Exception as e:
        logger.error(e)
        # fail gracefully


def transform_results(data):
    latest = get_time()

    # collect results
    results = {
        'contest_headers': ["name", "prs_rpt", "prs_tot", "vote_tot"],
        'cand_headers': ["name", "vote_cnt", "vote_pct"],
        'datetime': latest.strftime(timestamp_format),
        'timestamp': int(latest.replace(microsecond=0).timestamp()),
        'contests': {},
        "cand_classes": ["", "amt", "amt append-bar"],
    }
    # TODO The current code is super dependent on ^this^ not changing. Brittle!

    # loop through scraped data
    # and append to results
    races = []  # keeps track of which results are in

    for row in data:
        # parse data from page,
        # row by row
        race_code = get_race_code(row)
        cv_race_name = lookup_json['races'][race_code]['chi_vote_name']

        cand_code = get_cand_code(row)
        cv_cand_name = lookup_json['candidates'][cand_code]['chi_vote_name']

        cand_vote_total = get_cand_vote_total(row)

        comp_precincts = get_race_completed_precincts(row)  # reporting
        elig_precincts = get_race_eligible_precincts(row)  # total

        # adds race-level data
        # to results['contests']
        if race_code not in results['contests']:
            results['contests'][race_code] = {
                'meta': [cv_race_name, comp_precincts, elig_precincts],
                'cands': []
            }

        # adds candidate-level data
        # to results['contests'][race]['candidates']
        results['contests'][race_code]['cands'].append(
            [cv_cand_name, cand_vote_total])

    # calc percentages and add to results
    if 'vote_pct' in results['cand_headers']:
        for key in results['contests']:
            cand_items = results['contests'][key]['cands']
            cand_votes = [x[1] for x in cand_items]
            total_votes = sum(cand_votes)

            results['contests'][key]['meta'] += [total_votes]

            for cand_item in cand_items:
                votes = cand_item[1]
                cand_item += [_calc_percent(votes, total_votes)]

            # sort by vote total
            cand_items = cand_items.sort(key=_sort_by_vote, reverse=True)
    else:
        pass

    # import sys
    # sys.stdout.write(str(results))
    return results


def _sort_by_vote(val):
    return val[1]


def _calc_percent(val, total):
    '''
    Helper function to get pct of total votes as a string.
    '''
    if (total > 0):
        return "%.1f%%" % (val/total * 100)
    else:
        return "N/A"


def write_results(results, path):
    # write out
    with open(path, 'w') as jsonfile:
        json.dump(results, jsonfile)


def upload_results(path):
    # upload to s3
    s3 = boto3.resource('s3')
    results_json_wb = open(path, 'rb')
    logger.info('uploading results')
    s3.Bucket(name=s3_bucket_name).put_object(
        Key='results.json',
        Metadata={'Content-Type': 'text/json'},
        Body=results_json_wb)
