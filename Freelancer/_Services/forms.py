from django import forms
from .models import service_type, areas, Service, RateFeedback


class SearchForm(forms.Form):
    service_type = forms.ModelChoiceField(queryset=service_type.objects.all(
    ), widget=forms.Select(attrs={'class': 'form-control'}), label="Service type")
    service_location = forms.ModelChoiceField(queryset=areas.objects.all(
    ), widget=forms.Select(attrs={'class': 'form-control'}), label="service location")

    class Meta:
        model = Service
        fields = ['service_type', 'service_location']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['service_type'].choices = [('', 'Select a service type')] + [
            choice for choice in self.fields['service_type'].choices if choice[0] != ''
        ]
        self.fields['service_location'].choices = [('', 'Select your perefered location')] + [
            choice for choice in self.fields['service_location'].choices if choice[0] != ''
        ]
        self.fields['service_type'].widget.attrs.update({
            'class': 'form-control border border-dark border-1 form-select'
        })
        self.fields['service_location'].widget.attrs.update({
            'class': 'form-control border border-dark border-1 form-select'
        })


class AddServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['service_title', 'service_desc',
                  'service_type', 'service_location', 'images']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['service_title'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['service_title'].label = 'Service Title'
        self.fields['service_title'].widget.attrs['placeholder'] = 'Enter your service title'
        self.fields['service_desc'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['service_desc'].label = 'Service Description'
        self.fields['service_desc'].widget.attrs['placeholder'] = 'Enter your service description'
        # self.fields['service_type'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['service_type'].choices = [('', 'Select a service type')] + [
            choice for choice in self.fields['service_type'].choices if choice[0] != ''
        ]
        self.fields['service_type'].widget.attrs.update({
            'class': 'form-control border border-dark border-1 form-select'
        })
        self.fields['service_location'].choices = [('', 'Select a service location')] + [
            choice for choice in self.fields['service_location'].choices if choice[0] != ''
        ]
        self.fields['service_location'].widget.attrs.update({
            'class': 'form-control border border-dark border-1 form-select'
        })

        # self.fields['service_location'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['images'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['images'].label = 'Service Images'


class AddFeedbackForm(forms.ModelForm):
    class Meta:
        model = RateFeedback
        fields = ['rate', "feedback_content"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['rate'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['rate'].label = 'Rate'
        self.fields['rate'].widget.attrs['placeholder'] = 'Enter your rating on 5'
        self.fields['feedback_content'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['feedback_content'].label = 'Your feedback'
        self.fields['feedback_content'].widget.attrs['placeholder'] = 'Enter your feedback'
