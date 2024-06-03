# from django.urls import path, include
# from . import views

# app_name = 'Authentication'

# urlpatterns = [
#     path('', views.login_user, name='login'),
#     path('signup', views.signup, name='signup'),
#     path('changePassword', views.changePassword, name='changePassword'),
#     path('logout_user', views.logout_user, name='logout')
# ]
from django.urls import path
from .api_views import login_view, SignupFormView, logout_view, ChangePasswordView, get_csrf_token, user_info

urlpatterns = [
    # path('signup/', SignupView.as_view(), name='api_signup'),
    path('login/', login_view, name='api_login'),
    path('logout/', logout_view, name='api_logout'),
    path('user-info/', user_info, name='user_info'),
    path('signup-form/', SignupFormView.as_view(), name='signup_form'),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),
    path('change-password/', ChangePasswordView,
         name='change_password'),
]
