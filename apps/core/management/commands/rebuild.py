'''
references:
https://docs.djangoproject.com/en/2.1/howto/custom-management-commands/
http://masnun.com/2015/09/29/python-django-running-multiple-commands-in-subprocesses.html
https://simpleisbetterthancomplex.com/tutorial/2018/08/27/how-to-create-custom-django-management-commands.html
'''

from django.core.management.base import BaseCommand

import subprocess
from subprocess import Popen
from sys import stdout, stdin, stderr
import time
import os
import signal


class Command(BaseCommand):
    help = 'Run all commands'

    commands = [
        'pipenv install',
        'yarn --cwd ./frontend install',
        'yarn --cwd ./frontend build',
        'python manage.py migrate',
        'python manage.py collectstatic --no-input',
    ]

    def handle(self, *args, **kwargs):
        proc_list = []

        for command in self.commands:
            print(f"$ {command}")
            proc = subprocess.run(command, shell=True, stdin=stdin,
                                  stdout=stdout, stderr=stderr)
            proc_list.append(proc)

        # try:
        #     while True:
        #         time.sleep(10)
        # except KeyboardInterrupt:
        #     for proc in proc_list:
        #         os.kill(proc.pid, signal.SIGKILL)
