import requests
import json
import pytz
import boto3
import logging
from datetime import datetime
from apps.scrape.utils import lookup_json_path, get_data,\
    get_race_code, get_cand_code, get_race_name, get_cand_name,\
    get_cand_vote_total, get_race_eligible_precincts,\
    get_race_completed_precincts, set_cand_vote_total

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


### START CONFIG ###
results_output_path = '/tmp/results.json'
timestamp_format = '%Y-%m-%dT%H:%M:%S%z'
#s3_bucket_name = 'chi.vote.app.stage' # switch to prod on elex nite
s3_bucket_name = 'chi.vote.app.prod' # switch to prod on elex nite
data_line_range_start, data_line_range_end = 3, 181
### END CONFIG ###

# helps translate cboe race, cand codes
# into proper chi.vote style
lookup_json = json.load(open(lookup_json_path))

scrape_target = 'https://chicagoelections.com/results/ap/summary.txt'

def get_page():
    return requests.get(scrape_target).content.decode()


def get_data(page=get_page()):
    return page.splitlines()[data_line_range_start:data_line_range_end]




def scrape_results():
    # if data fails to load,
    # pass exception to logger
    try:
        data = get_data()
        # data[0] = set_cand_vote_total(data[0], 10)
        # data[2] = set_cand_vote_total(data[2], 20)
        results = transform_results(data)
        logger.info(results['contests']['0010']['cands'][0])
        write_results(results, results_output_path)
        upload_results(results_output_path)
    except KeyboardInterrupt:
        raise
    except Exception as e:
        logger.error(e)
        raise Exception


def transform_results(data):
    now = datetime.now().astimezone(pytz.timezone('US/Central'))

    # collect results
    results = {
        'contest_headers': ["name", "prs_rpt", "prs_tot", "vote_tot"],
        'cand_headers': ["name", "vote_cnt", "vote_pct"],
        'datetime': now.strftime(timestamp_format),
        'timestamp': int(now.replace(microsecond=0).timestamp()),
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
        try:
            cv_cand_name = lookup_json['candidates'][cand_code]['chi_vote_name']
        except Exception as e:
            logger.error(e)

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
        results['contests'][race_code]['cands'].append([cv_cand_name, cand_vote_total])
     
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
    import sys; sys.stdout.write(str(results))
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
