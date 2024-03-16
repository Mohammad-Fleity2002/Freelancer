from django.urls import path, include
from . import views

app_name = 'Authentication'

urlpatterns = [
    path('', views.login_user, name='login'),
    path('signup', views.signup, name='signup'),
    path('changePassword', views.changePassword, name='changePassword'),
    path('logout_user', views.logout_user, name='logout')
]
