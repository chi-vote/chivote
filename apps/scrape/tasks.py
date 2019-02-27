from apps.scrape.scraper import scrape_results
from celery import shared_task

@shared_task
def run_scraper():
    scrape_results()
