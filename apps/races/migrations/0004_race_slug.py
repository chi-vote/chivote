# Generated by Django 2.1.5 on 2019-01-25 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('races', '0003_auto_20190124_1022'),
    ]

    operations = [
        migrations.AddField(
            model_name='race',
            name='slug',
            field=models.SlugField(default='null-slug', max_length=250),
            preserve_default=False,
        ),
    ]
