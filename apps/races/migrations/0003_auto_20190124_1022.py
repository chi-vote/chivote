# Generated by Django 2.1.5 on 2019-01-24 16:22

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('races', '0002_load_races'),
    ]

    operations = [
        migrations.AlterField(
            model_name='race',
            name='explainer',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
