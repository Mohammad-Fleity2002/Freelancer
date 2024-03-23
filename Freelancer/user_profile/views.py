from django.shortcuts import render, redirect
from django.contrib.auth.models import User

def view_profile(request):
    if request.user.is_authenticated:
        user = request.user
        return render(request, 'user_profile/view_profile.html', {'user': user})
    else:
        return redirect('/')  
