# Generated by Django 5.0.3 on 2024-03-25 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('_Services', '0004_service_images_delete_service_photos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ratefeedback',
            name='rate',
            field=models.CharField(choices=[('1', '1 ⭐'), ('2', '2 ⭐⭐'), ('3', '3 ⭐⭐⭐'), ('4', '4 ⭐⭐⭐⭐'), ('5', '5 ⭐⭐⭐⭐⭐')], default='0', max_length=2),
        ),
    ]
