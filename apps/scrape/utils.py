import requests

### START CONFIG ###
scrape_target = 'https://chicagoelections.com/results/ap/summary.txt'
data_line_range_start, data_line_range_end = 3, 181
race_code_range_start, race_code_range_end = 0, 4
cand_code_range_start, cand_code_range_end = 4, 7
race_name_range_start, race_name_range_end = 32, 87
cand_name_range_start, cand_name_range_end = 88, 126
### END CONFIG ###


def get_page():
    return requests.get(scrape_target).content.decode()


def get_data(page):
    return page.splitlines()[data_line_range_start:data_line_range_end]


def get_race_code(line):
    race_code = line[race_code_range_start:race_code_range_end]
    return race_code


def get_cand_code(line):
    return line[cand_code_range_start:cand_code_range_end]


def get_cand_name(line):
    return line[cand_name_range_start:cand_name_range_end].strip()


def get_race_name(line):
    return line[race_name_range_start:race_name_range_end].strip()
