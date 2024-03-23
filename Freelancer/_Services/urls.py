from django.urls import path
from . import views

app_name = '_Services'

urlpatterns = [
    path('', views.search_service, name='search_service'),
    path('add_service', views.add_service, name='add_service'),
    path('my_services', views.my_services, name='my_services'),
    path('service_details/<int:service_id>',
         views.service_details, name='service_details')  # under development could be a function
]
