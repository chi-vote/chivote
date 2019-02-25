import requests, json, pytz
from datetime import datetime
from apps.scrape.utils import lookup_json_path, get_data,\
        get_race_code, get_cand_code, get_race_name, get_cand_name,\
        get_cand_vote_total, get_race_eligible_precincts,\
        get_race_completed_precincts


### START CONFIG ###
results_output_path = '/tmp/results.json'
timestamp_format = '%Y-%m-%dT%H:%M:%SZ'
### END CONFIG ###

now = datetime.now().astimezone(pytz.timezone('US/Central'))

# if data fails to load, 
# pass exception to logger
def log_exception(timestamp,exception):
    pass

try:
    data = get_data()
except Exception(e):
    log_exception(now,e)

# helps translate cboe race, cand codes
# into proper chi.vote style
lookup_json = json.load(open(lookup_json_path))

# collect results
results = {
    'meta':{
        'timestamp':now.strftime(timestamp_format)
        },
    'contests': []
    }

# loop through scraped data
# and append to results
races = [] # keeps track of which results are in
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
        print(e)
        import ipdb; ipdb.set_trace()
    cand_vote_total = get_cand_vote_total(row)

    comp_precincts = get_race_completed_precincts(row) # reporting
    elig_precincts = get_race_eligible_precincts(row) # total

    # adds race-level data
    # to results['contests']
    if race_name not in races:
        results['contests'].append(
                {
                    cv_race_name:
                        {
                            'eligible_precincts':elig_precincts,
                            'completed_precincts':comp_precincts,
                            'candidates': []
                        }
                }
            )
        # don't process this top-level race data next time
        races.append(race_name)
    
    
    # adds candidate-level data 
    # to results['contests'][race]['candidates'] 
    results['contests'][-1][cv_race_name]['candidates'].append(
            {
                cv_cand_name: cand_vote_total
            }
        )

# write out
results_json_file = open(results_output_path,'w') 
json.dump(results,results_json_file)
