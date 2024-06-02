# from typing import Any
from django import forms
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group


class login_form(forms.Form):
    email = forms.EmailField(label="Email",
                             widget=forms.EmailInput(attrs={'class': 'form-control form-control-lg'}))
    userpass = forms.CharField(label="password",
                               widget=forms.PasswordInput(attrs={'class': 'form-control form-control-lg', 'type': 'password'}))


# class SignupForm(UserCreationForm):
#     group = forms.ModelChoiceField(
#         queryset=Group.objects.filter(name__in=['Freelancers', 'Customers']))

#     class Meta:
#         model = User
#         fields = ('username', 'first_name', 'last_name', 'email',
#                   'password1', 'password2', 'group')

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields['email'].widget.attrs['class'] = 'form-control border border-dark border-1'
#         self.fields['email'].label = 'Email'
#         self.fields['email'].unique = True
#         self.fields['password1'].widget.attrs['class'] = 'form-control border border-dark border-1'
#         self.fields['password1'].label = 'Password'
#         self.fields['password2'].widget.attrs['class'] = 'form-control border border-dark border-1'
#         self.fields['password2'].label = 'Confirm Password'
#         self.fields['first_name'].widget.attrs['class'] = 'form-control border border-dark border-1'
#         self.fields['first_name'].widget.attrs['class'] = 'form-control border border-dark border-1'
#         self.fields['first_name'].label = 'First Name'
#         self.fields['username'].widget.attrs['class'] = 'form-control border border-dark border-1'
#         self.fields['username'].label = 'user Name'
#         self.fields['last_name'].widget.attrs['class'] = 'form-control border border-dark border-1'
#         self.fields['last_name'].label = 'Last Name'
#         self.fields['group'].widget.attrs['class'] = 'form-control border border-dark border-1'

class SignupForm(UserCreationForm):
    group = forms.ModelChoiceField(
        queryset=Group.objects.filter(name__in=['Freelancers', 'Customers']))

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email',
                  'password1', 'password2', 'group')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['email'].label = 'Email'
        self.fields['email'].unique = True
        self.fields['password1'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['password1'].label = 'Password'
        self.fields['password2'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['password2'].label = 'Confirm Password'
        self.fields['first_name'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['first_name'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['first_name'].label = 'First Name'
        self.fields['username'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['username'].label = 'User Name'
        self.fields['last_name'].widget.attrs['class'] = 'form-control border border-dark border-1'
        self.fields['last_name'].label = 'Last Name'
        self.fields['group'].widget.attrs['class'] = 'form-control border border-dark border-1'


class changePassForm(forms.Form):
    username = forms.CharField(label="User Name:", max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control text-dark'}))
    password1 = forms.CharField(label="Password", max_length=100, validators=[validate_password], widget=forms.PasswordInput(
        attrs={'class': 'form-control text-dark', 'type': 'password'}))
    password2 = forms.CharField(label="Confirm Password", max_length=100, widget=forms.PasswordInput(
        attrs={'class': 'form-control text-dark', 'type': 'password'}))

    def clean(self):
        cleaned_data = super().clean()
        usrname = self.cleaned_data.get('username')
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if not usrname or not password1 or not password2:
            raise forms.ValidationError('All fields are required.')
        if password2 != password1:
            raise forms.ValidationError('Passwords is not confirmed')
        return super().clean()
