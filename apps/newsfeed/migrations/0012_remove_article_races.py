# Generated by Django 2.1.5 on 2019-02-12 23:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('newsfeed', '0011_auto_20190212_1658'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='races',
        ),
    ]
