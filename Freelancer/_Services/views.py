from django.shortcuts import render
from .models import service_type, Service
from .models import areas as Areas


def search_service(request):
    if request.method == 'GET':
        service_types = service_type.objects.all()
        areas = Areas.objects.all()  # Fetch all areas
        return render(request, '_Services/search_service.html', {'service_types': service_types, 'areas': areas})
    elif request.method == 'POST':
        service_type_code = request.POST.get('service_type')
        # Assuming the name of the field in the form is 'area'
        area_code = request.POST.get('area')
        services = Service.objects.filter(
            service_type__code_type=service_type_code, service_location=area_code)
        return render(request, '_Services/search_results.html', {'services': services})
