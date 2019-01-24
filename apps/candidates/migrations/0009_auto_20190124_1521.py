# Generated by Django 2.1.5 on 2019-01-24 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0008_auto_20190124_1416'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='first_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='candidate',
            name='full_name',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='candidate',
            name='last_name',
            field=models.CharField(default='last_name', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='candidate',
            name='middle_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='candidate',
            name='suffix',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
