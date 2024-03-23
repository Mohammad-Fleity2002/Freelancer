from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from .forms import SearchForm, AddServiceForm
from .models import service_type, Service
from .models import areas as Areas


def search_service(request):
    form = SearchForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            service_type_code = form.cleaned_data['service_type']
            area_code = form.cleaned_data['area']
            services = Service.objects.filter(
                service_type=service_type_code, service_location=area_code)
            return render(request, '_Services/search_results.html', {'services': services, 'form': form})
    else:
        service_types = service_type.objects.all()
        areas = Areas.objects.all()
        return render(request, '_Services/search_service.html', {'service_types': service_types, 'areas': areas, 'form': form})

# def search_results(request):
#     pass


def add_service(request):
    if request.method == 'POST':
        form = AddServiceForm(request.POST)
        if form.is_valid():
            service = form.save(commit=False)
            service.freelancer = request.user
            service.service_date = timezone.now()
            service.save()
            return redirect('/search/my_services')
    else:
        form = AddServiceForm()
    return render(request, '_Services/add_service.html', {'form': form})


def my_services(request):
    user_services = Service.objects.filter(freelancer=request.user)
    return render(request, '_Services/my_service.html', {'services': user_services})


def service_details(request):
    return render(request, '_Services/service_detail.html')
