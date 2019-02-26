from django.urls import path
from . import views

core_patterns = [
    path('home/', views.HomePageView.as_view(), name='home')
]
