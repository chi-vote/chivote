import logging, requests
from celery import shared_task
from .models import Candidate
from ..races.models import Race
logger = logging.getLogger(__name__)
from chivote.settings.base import IL_SUNSHINE_API_URL
from django.utils import timezone

@shared_task
def update_br_candidate(obj_id, publish=True):
    obj = Candidate.objects.get(pk=obj_id)

    try:
        logger.info(f"update_br_candidate task has received {obj}")
        obj.update_br_data()
        obj.save(publish=publish)
    except Exception:
        logger.error("Task error: update_br_candidate", exc_info=True)


@shared_task
def update_br_candidates_all():
    candidates = Candidate.objects.all()
    races = Race.objects.all()

    try:
        logger.info(
            f"update_br_candidates_all task has received {len(candidates)} candidates")
        for candidate in candidates:
            obj_id = candidate.pk
            update_br_candidate(obj_id, publish=False)
            # don't publish so we send 53 publish_object tasks, not 190
        for race in races:
            race.save()
    except Exception:
        logger.error("Task error: update_br_candidates_all", exc_info=True)


@shared_task
def update_ri_candidates_all():
    ri_response = requests.get(IL_SUNSHINE_API_URL).json()
    if ri_response['meta']['code'] == 200:
        ri_all_candidates_data = ri_response['objects']
        for candidate in Candidate.objects.all():
            ri_committees = [x for x in ri_all_candidates_data if x['committee_id'] == candidate.isbe_id]     
            if ri_committees and len(ri_committees) == 1:
                ri_committee = ri_committees[0]
                candidate.ri_cash_on_hand = ri_committee['cash_on_hand']
                candidate.ri_funds_raised_this_cycle = ri_committee['total_funds_raised']
                candidate.ri_last_updated = timezone.now()
                candidate.save()
            else:
                logger.info('ambiguous ri lookup for candidate id ' + str(candidate.id))

