# Generated by Django 2.1.5 on 2019-03-12 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0008_candidate_cboe_results_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='status',
            field=models.CharField(choices=[('elected', 'Elected'), ('runoff', 'Runoff'), ('candidate', 'Candidate'), ('inactive', 'Inactive')], default='candidate', max_length=25),
        ),
    ]
