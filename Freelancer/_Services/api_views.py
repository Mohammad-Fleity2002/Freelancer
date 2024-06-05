from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import AddServiceFormSerializer, addFeedbackSerializer
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
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


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
            area = Area.objects.get(code_area=data['service_location'])
            # freelancer = User.objects.get(username='Ali')
            freelancer = request.user
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


@csrf_exempt
def get_myServices(request, id):
    if request.method == 'GET':
        services = Service.objects.filter(freelancer=id)
        services_data = [{'service_id': service.service_id,
                          'freelancer_name': service.freelancer.username,
                          'service_title': service.service_title,
                          'service_desc': service.service_desc,
                          'service_image': request.build_absolute_uri(service.images.url) if service.images else None,
                          'service_location': service.service_location.area_name,
                          'service_type': service.service_type.type_title,
                          'service_date': service.service_date
                          } for service in services]
        return JsonResponse({'services': services_data})


class AddFeedbackFormView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        form = addFeedbackSerializer()
        print(form.data)
        return Response(form.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        print(data)
        form_serializer = addFeedbackSerializer(data=data)
        if form_serializer.is_valid():
            # print(form_serializer.errors)
            service = Service.objects.get(service_id=data['service_id'])
            customer = request.user
            # freelancer = User.objects.get(username='Ali')
            feedback = Feedback(service=service, user_id=customer,
                                feedback_content=data['feedback_content'], rate=data['rate'], feedback_date=timezone.now())
            print(feedback.feedback_content)
            feedback.save()
            return Response({'message': 'Feedback added successfully'}, status=status.HTTP_201_CREATED)
        else:
            print(form_serializer.errors)
            return Response(form_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def edit_service(request, service_id):
    if request.method == 'GET':
        try:
            service = Service.objects.get(service_id=service_id)
        except Service.DoesNotExist:
            return JsonResponse({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

        services_data = {
            'service_id': service.service_id,
            'freelancer_name': service.freelancer.username,
            'service_title': service.service_title,
            'service_desc': service.service_desc,
            'service_image': request.build_absolute_uri(service.images.url) if service.images else None,
            'service_location': service.service_location.area_name,
            'service_type': service.service_type.type_title,
            'service_date': service.service_date,
            'service_types': [{'code_type': st.code_type, 'type_title': st.type_title} for st in service_type.objects.all()],
            'areas': [{'code_area': area.code_area, 'area_name': area.area_name} for area in Area.objects.all()]
        }
        return JsonResponse({'service': services_data})

    elif request.method == 'POST':
        service = Service.objects.get(service_id=service_id)

        service_title = request.POST.get(
            'service_title', service.service_title)
        service_desc = request.POST.get('service_desc', service.service_desc)
        service_type_title = request.POST.get(
            'service_type', service.service_type.type_title)
        service_location_name = request.POST.get(
            'service_location', service.service_location.area_name)
        images = request.FILES.get('images', service.images)

        try:
            service_type_instance = service_type.objects.get(
                type_title=service_type_title)
        except service_type.DoesNotExist:
            return JsonResponse({'error': 'Invalid service type'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            service_location_instance = Area.objects.get(
                area_name=service_location_name)
        except Area.DoesNotExist:
            return JsonResponse({'error': 'Invalid service location'}, status=status.HTTP_400_BAD_REQUEST)

        service.service_title = service_title
        service.service_desc = service_desc
        service.service_type = service_type_instance
        service.service_location = service_location_instance
        service.images = images
        service.save()

        return Response({'message': 'Service updated successfully'}, status=status.HTTP_200_OK)


@require_http_methods(["GET"])
def user_info(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'User ID not provided'}, status=400)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

    user_data = {
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }
    return JsonResponse(user_data)


@api_view(['DELETE'])
def delete_service(request, service_id):
    try:
        service = Service.objects.get(service_id=service_id)
        service.delete()
        return Response({'message': 'Service deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_service_title(request, service_id):
    try:
        service = Service.objects.get(service_id=service_id)
        return Response({'title': service.service_title}, status=status.HTTP_200_OK)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_user_profile(request):
    user_id = request.query_params.get('user_id')
    try:
        user = User.objects.get(id=user_id)
        user_data = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        }
        return Response({'user': user_data}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_user_profile(request):
    user_id = request.query_params.get('user_id')
    data = request.data
    print(data)
    try:
        user = User.objects.get(id=user_id)
        user.username = data.get('username', user.username)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = data.get('email', user.email)
        user.save()
        return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
