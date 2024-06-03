from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import AddServiceFormSerializer
from .forms import AddServiceForm
from django.contrib.auth.models import User
from .models import service_type
from .models import areas as Area
from .models import Service as Service
from .models import RateFeedback as Feedback
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse


class AddServiceFormView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        form = AddServiceForm()
        form_data = {
            'service_title': form['service_title'].value() or '',
            'service_desc': form['service_desc'].value() or '',
            'service_type': form['service_type'].value() or '',
            'service_location': form['service_location'].value() or '',
            'images': form['images'].value() or '',
        }
        form_serializer = AddServiceFormSerializer(data=form_data)
        form_serializer.is_valid(raise_exception=False)
        response_data = {
            'initial_data': form_serializer.initial_data,
            'choices': {
                'service_type': [{'code': st.code_type, 'title': st.type_title} for st in service_type.objects.all()],
                'service_location': [{'code': loc.code_area, 'name': loc.area_name} for loc in Area.objects.all()],
            }
        }
        print(request.user)
        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        files = request.FILES.get('images')
        print(data)
        # print(request.user)
        if files:
            data['images'] = files
        print(data['service_title'])
        form_serializer = AddServiceFormSerializer(data=data)
        if form_serializer.is_valid():
            # print(form_serializer.errors)
            type = service_type.objects.get(code_type=data['service_type'])
            area = areas.objects.get(code_area=data['service_location'])
            freelancer = User.objects.get(username='Ali')
            service = Service(service_title=data['service_title'], service_type=type,
                              service_desc=data['service_desc'], freelancer=freelancer, service_date=timezone.now(), service_location=area, images=data['images'])
            print(service)
            service.save()
            return Response({'message': 'Service added successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(form_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def search_service(request):
    if request.method == 'GET':
        service_types = service_type.objects.all()
        areas = Area.objects.all()
        data = {
            'service_types': [{'code_type': st.code_type, 'type_title': st.type_title} for st in service_types],
            'areas': [{'code_area': area.code_area, 'area_name': area.area_name} for area in areas]
        }
        print(data)
        return JsonResponse(data)

    elif request.method == 'POST':
        data = json.loads(request.body)
        service_type_code = data.get('service_type')
        area_code = data.get('area')
        print(data)
        print(service_type_code)
        print(area_code)
        services = Service.objects.filter(
            service_type=service_type_code, service_location=area_code)
        services_data = [{
            'service_id': service.service_id,
            'freelancer_name': service.freelancer.username,
            'service_title': service.service_title,
            'service_desc': service.service_desc,
            'service_image': request.build_absolute_uri(service.images.url) if service.images else None,
            'service_location': service.service_location.area_name,
            'service_type': service.service_type.type_title,
            'service_date': service.service_date
        } for service in services]
        print(services_data)
        return JsonResponse({'services': services_data})


@csrf_exempt
def get_feedbacks(request, service_id):
    if request.method == 'GET':
        feedbacks = Feedback.objects.filter(service_id=service_id)
        feedbacks_data = [{'user': feedback.user_id.username, 'comment': feedback.feedback_content,
                           'rating': feedback.rate} for feedback in feedbacks]
        return JsonResponse({'feedbacks': feedbacks_data})
