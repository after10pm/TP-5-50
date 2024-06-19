# Generated by Django 5.0.6 on 2024-06-17 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_alter_subscription_unique_together'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='user',
            new_name='user_id',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='user',
            new_name='user_id',
        ),
        migrations.AlterField(
            model_name='comment',
            name='date_posted',
            field=models.DateField(default='2024-06-17', verbose_name='Date Posted'),
        ),
        migrations.AlterField(
            model_name='post',
            name='publish_date',
            field=models.DateField(default='2024-06-17', verbose_name='registration_date'),
        ),
        migrations.AlterField(
            model_name='user',
            name='registration_date',
            field=models.DateField(default='2024-06-17', verbose_name='registration_date'),
        ),
    ]
