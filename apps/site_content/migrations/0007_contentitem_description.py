# Generated by Django 2.1.5 on 2019-01-29 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('site_content', '0006_contentitem_background'),
    ]

    operations = [
        migrations.AddField(
            model_name='contentitem',
            name='description',
            field=models.CharField(blank=True, max_length=280, null=True),
        ),
    ]
