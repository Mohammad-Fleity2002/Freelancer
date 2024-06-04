from rest_framework import serializers
from .models import service_type, areas, Service, RateFeedback
from django.contrib.auth.models import User


class AddServiceFormSerializer(serializers.ModelSerializer):
    service_type = serializers.ChoiceField(choices=[(
        stype.code_type, stype.type_title) for stype in service_type.objects.all()])
    service_location = serializers.ChoiceField(
        choices=[(area.code_area, area.area_name) for area in areas.objects.all()])

    class Meta:
        model = Service
        fields = ['service_title', 'service_desc',
                  'service_type', 'service_location', 'images']

    def is_valid(self, raise_exception=False):
        is_valid = super().is_valid()
        service = self.initial_data.get('service_title')
        if is_valid:
            if Service.objects.filter(service_title=service).exists():
                self.errors['service_title'] = ['title should be unique']
                if raise_exception:
                    raise serializers.ValidationError(self.errors)
                return False
        return is_valid

    def create(self, validated_data):
        service = Service.objects.create(**validated_data)
        return service


class addFeedbackSerializer(serializers.Serializer):

    feedback_content = serializers.CharField(required=True)
    rate = serializers.CharField(required=True)
    service_id = serializers.IntegerField()

    def is_valid(self, raise_exception=False):
        is_valid = super().is_valid(raise_exception=raise_exception)

        return is_valid

    def create(self, validated_data):
        feedback = RateFeedback.objects.create(**validated_data)
        return feedback
