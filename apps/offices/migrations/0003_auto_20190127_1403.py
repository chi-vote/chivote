# Generated by Django 2.1.5 on 2019-01-27 20:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('offices', '0002_load_offices'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='office',
            options={'ordering': ['id']},
        ),
    ]
