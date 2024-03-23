from django import forms
from .models import service_type, areas, Service


class SearchForm(forms.Form):
    service_type = forms.ModelChoiceField(queryset=service_type.objects.all(
    ), widget=forms.Select(attrs={'class': 'form-control'}))
    area = forms.ModelChoiceField(queryset=areas.objects.all(
    ), widget=forms.Select(attrs={'class': 'form-control'}))


class AddServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['service_title', 'service_desc',
                  'service_type', 'service_location', 'images']

