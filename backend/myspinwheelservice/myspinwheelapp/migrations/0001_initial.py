# Generated by Django 5.1.2 on 2024-10-14 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GlobalVoteCount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trump_vote_count', models.IntegerField(default=0)),
                ('kamala_vote_count', models.IntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserVoteCount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trump_vote_count', models.IntegerField(default=0)),
                ('kamala_vote_count', models.IntegerField(default=0)),
                ('user_id', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
