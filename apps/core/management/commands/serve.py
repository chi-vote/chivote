'''
references:
https://docs.djangoproject.com/en/2.1/howto/custom-management-commands/
http://masnun.com/2015/09/29/python-django-running-multiple-commands-in-subprocesses.html
https://simpleisbetterthancomplex.com/tutorial/2018/08/27/how-to-create-custom-django-management-commands.html
'''

from django.core.management.base import BaseCommand

from subprocess import Popen
from sys import stdout, stdin, stderr
import time
import os
import signal


class Command(BaseCommand):
    help = 'Run all commands'

    devCommands = [
        'yarn --cwd ./frontend start',
        'python manage.py livereload --settings=chivote.settings.local',
        'python manage.py runserver --settings=chivote.settings.local',
    ]

    prodCommands = [
        'yarn --cwd ./frontend build',
        'python manage.py build --settings=chivote.settings.production',
        'python manage.py buildserver --settings=chivote.settings.production'
    ]

    def add_arguments(self, parser):
        parser.add_argument('--production', action='store_true',
                            help='Start production server')

    def handle(self, *args, **kwargs):
        is_prod = kwargs['production']

        proc_list = []

        if is_prod:
            commands = self.prodCommands
        else:
            commands = self.devCommands

        for command in commands:
            print(f"$ {command}")
            proc = Popen(command, shell=True, stdin=stdin,
                         stdout=stdout, stderr=stderr)
            proc_list.append(proc)

        try:
            while True:
                time.sleep(10)
        except KeyboardInterrupt:
            for proc in proc_list:
                os.kill(proc.pid, signal.SIGKILL)
