from django.urls import path
from . import views

app_name = '_Services'

urlpatterns = [
   path('', views.search_service, name='search_service'),
   path('search_results', views.search_service, name='search_results')
   
    # path('signup', views.signup, name='signup'),
]
