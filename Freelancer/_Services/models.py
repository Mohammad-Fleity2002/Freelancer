from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class service_type(models.Model):
    code_type = models.CharField(primary_key=True, max_length=20)
    type_title = models.CharField(max_length=100)

    def __str__(self):
        return str(self.type_title)


class areas(models.Model):
    code_area = models.CharField(primary_key=True, max_length=20)
    area_name = models.CharField(max_length=100)

    def __str__(self):
        return str(self.area_name)


class Service(models.Model):
    service_id = models.IntegerField(primary_key=True)
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE)
    service_type = models.ForeignKey(service_type, on_delete=models.CASCADE)
    service_desc = models.CharField(max_length=150)
    service_location = models.ForeignKey(areas, on_delete=models.CASCADE)
    service_date = models.DateField()
    deleted = models.BooleanField(default=False)
   

    def __str__(self):
        return f"{self.freelancer.username}'s {self.service_type.type_title}"


class service_photos(models.Model):
    photo_id = models.AutoField(primary_key=True)
    url_link = models.URLField()
    service = models.ForeignKey('Service', on_delete=models.CASCADE)

    def __str__(self):
        return f"Photo {self.photo_id} for Service {self.service}"


class RateFeedback(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    rate = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)])
    feedback_content = models.CharField(max_length=120)
    feedback_date = models.DateField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)



class Report(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    report_desc = models.CharField(max_length=120)
    report_date_date = models.DateField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
   
