from django.urls import path
from . import views

core_patterns = [
    path('', views.HomePageView.as_view(), name='index'),
]
