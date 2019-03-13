from celery import shared_task


@shared_task
def run_scraper():
    from .scraper import scrape_results

    scrape_results()


def assign_winners():
    from operator import itemgetter
    from .scraper import scrape_results
    from apps.races.models import Race

    results = scrape_results(upload=False)

    contest_headers = results['contest_headers']
    cand_headers = results['cand_headers']

    idx_total_votes = contest_headers.index('vote_tot')
    idx_cand_votes = cand_headers.index('vote_cnt')
    idx_cand_name = cand_headers.index('name')

    for key, val in results['contests'].items():
        meta, cands = itemgetter('meta', 'cands')(val)

        total_votes = meta[idx_total_votes]

        race = Race.objects.get(cboe_results_id=key)

        # does the candidate with the most votes have >50%?
        sorted_cands = sorted(cands, reverse=True,
                              key=itemgetter(idx_cand_votes))
        top_cand = sorted_cands[0]
        has_winner = top_cand[idx_cand_votes] / total_votes > .5

        # get top cand if has_winner, else top two
        top_cands = [top_cand] if has_winner else sorted_cands[:2]

        top_cand_names = list(
            map(lambda x: x[idx_cand_name].replace('*', ''), top_cands))

        top_cand_objs = race.candidates.filter(
            full_name__in=top_cand_names)

        # winner? set the top cand to elected
        if has_winner:
            cand_obj = top_cand_objs.first()
            cand_obj.status = 'elected'
            cand_obj.save(publish=False)

        # no winner? set the top cands to runoff
        else:
            for cand_obj in top_cand_objs:
                cand_obj.status = 'runoff'
                cand_obj.save(publish=False)

        race.save(publish=True)
