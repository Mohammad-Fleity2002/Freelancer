from django.shortcuts import render, redirect
from django.views.decorators.cache import never_cache


def home(request):
    return render(request, "home.html")


@never_cache
def handler404(request, *args, **kwargs):
    return redirect('/')


@never_cache
def handler500(request, *args, **kwargs):
    return redirect('/')
