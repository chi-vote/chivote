# Generated by Django 2.1.5 on 2019-01-18 22:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('candidates', '0001_initial'),
        ('races', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='race',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='races.Race'),
        ),
    ]