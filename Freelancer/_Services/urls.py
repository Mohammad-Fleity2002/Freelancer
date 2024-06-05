from django.urls import path
from . import views, api_views

app_name = '_Services'

urlpatterns = [
    path('add-service-form/', api_views.AddServiceFormView.as_view(),
         name='add_service_form'),
    path('search-service/', api_views.search_service,
         name='search_service'),
    path('user-profile', api_views.get_user_profile, name='get_user_profile'),
    path('user-profile-update', api_views.update_user_profile,
         name='update_user_profile'),
    path('services/<int:service_id>/title',
         api_views.get_service_title, name='get_service_title'),
    path('add-feedback/', api_views.AddFeedbackFormView.as_view(),
         name='add-feedback'),
    path('my-service/<int:id>/',
         api_views.get_myServices, name='get_myServices'),
    path('edit-service/<int:service_id>/',
         api_views.edit_service, name='edit_service'),
    path('feedbacks/<int:service_id>/',
         api_views.get_feedbacks, name='get_feedbacks'),
    path('delete-service/<int:service_id>/',
         api_views.delete_service, name='delete_service'),
    path('user-info/', api_views.user_info, name='user_info'),
    path('', views.search_service, name='search_service'),
    path('add_service', views.add_service, name='add_service'),
    path('my_services', views.my_services, name='my_services'),
    path('edit-service/<int:service_id>/',
         views.edit_service, name='edit_service'),
    path('delete-service/<int:service_id>/',
         views.delete_service, name='delete_service'),
    path('add-feedback/<int:service_id>/',
         views.add_feedback, name='add_feedback'),
    path('service-feedbacks/<int:service_id>/',
         views.service_feedbacks, name='service_feedbacks'),
    path('service_details/<int:service_id>',
         views.service_details, name='service_details')  # under development could be a function
]
