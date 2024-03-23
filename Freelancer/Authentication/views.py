from django.shortcuts import render, redirect
from datetime import datetime
from django.urls import reverse
from django.utils.http import quote
from django.contrib.auth import login, logout
from .forms import login_form, SignupForm, changePassForm
from django.views.decorators.cache import never_cache
from django.db.models import Q
from django.contrib import messages
from django.contrib.auth.models import User


@never_cache
def login_user(request):
    if request.user.is_authenticated:
        return redirect('/')
    MyForm = login_form(request.POST)
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['userpass']
        try:
            user = User.objects.get(Q(email=email))
        except User.DoesNotExist:
            user = None
        if user is not None:
            if user.check_password(password):
                login(request, user)
                return redirect('/')
            else:
                messages.success(request, ("wrong password"))
                # return render(request, "Authentication/Login.html", {"form": MyForm, "message": "wrong password"})
        else:
            messages.success(request, ("email doesn't exist"))
            # return render(request, "Authentication/Login.html", {"form": MyForm, "message": "email doesn't exist"})
    return render(request, "Authentication/Login.html", {"form": MyForm})


# @never_cache
# def logout_user(request):
#     logout(request)
#     messages.success(request, "Logged Out Successfully")

#     # Create a response object
#     response = HttpResponse()

#     # Set headers to prevent caching
#     response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
#     response['Pragma'] = 'no-cache'
#     response['Expires'] = '0'

#     # Redirect the user to the login page
#     response['Location'] = '/login/'
#     response.status_code = 302

#     return response

@never_cache
def logout_user(request):
    logout(request)
    messages.success(request, ("You were logged out!"))
    return redirect('/')


@never_cache
def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            group = form.cleaned_data['group']
            user.groups.add(group)
            login(request, user)
            return redirect('/')
    else:
        form = SignupForm()
    return render(request, 'Authentication/Signup.html', {'form': form})
# pass@123 Ali user@gmail.com
# test@123 Mohammad mohammadfleity2002@gmial.com
# test@123 Freelancer mourice@gmail.com


@never_cache
def changePassword(request):
    if request.method == "POST":
        myForm = changePassForm(request.POST)
        if myForm.is_valid():
            usrname = myForm.cleaned_data['username']
            password1 = myForm.cleaned_data['password1']
            # password2 = myForm.cleaned_data['password2']
            try:
                u = User.objects.get(username=usrname)
                User.set_password(u, password1)
                User.save(u)
                messages.success(
                    request, ("password changed successfully"))
                return redirect('Authentication:login')
            except User.DoesNotExist:
                messages.error(
                    request, ("attempts faild!"))
    else:
        myForm = changePassForm()
    return render(request, 'Authentication/changePassword.html', {'form': myForm})
