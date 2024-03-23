from django.contrib import admin
from .models import service_type, Service, areas ,  RateFeedback, Report
# Register your models here.
admin.site.register(service_type)
admin.site.register(Service)
admin.site.register(areas)
admin.site.register(RateFeedback)
admin.site.register(Report)


