# Generated by Django 2.1.5 on 2019-02-12 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offices', '0004_auto_20190212_1224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='office',
            name='name',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='office',
            name='name_en',
            field=models.CharField(max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='office',
            name='name_es',
            field=models.CharField(max_length=40, null=True),
        ),
    ]
