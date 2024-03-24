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


def add_service(request):
    if not request.user.groups.filter(name='Freelancers').exists():
        return redirect('/')
    if request.method == 'POST':
        form = AddServiceForm(request.POST, request.FILES)
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
    if not request.user.groups.filter(name='Freelancers').exists():
        return redirect('/')
    user_services = Service.objects.filter(freelancer=request.user)
    return render(request, '_Services/my_service.html', {'services': user_services})


def service_details(request):
    if not request.user.groups.filter(name='Freelancers').exists():
        return redirect('/')
    return render(request, '_Services/service_detail.html')


def edit_service(request, service_id):
    if not request.user.groups.filter(name='Freelancers').exists():
        return redirect('/')
    try:
        service = Service.objects.get(service_id=service_id)
        if service.freelancer != request.user:
            return redirect('/')
        if request.method == 'POST':
            form = AddServiceForm(
                request.POST, request.FILES, instance=service)
            if form.is_valid():
                form.save()
                return redirect('/search/my_services')
        else:
            form = AddServiceForm(instance=service)
        return render(request, '_Services/edit_service.html', {'form': form})
    except Service.DoesNotExist:
        return redirect('/')


def delete_service(request, service_id):
    if not request.user.groups.filter(name='Freelancers').exists():
        return redirect('/')
    service = get_object_or_404(Service, service_id=service_id)
    if service.freelancer != request.user:
        return redirect('/')
    if request.method == 'POST':
        if service.images:
            service.images.delete()
        service.delete()
        return redirect('/search/my_services')
    return render(request, '_Services/delete_service_confirm.html', {'service': service})
