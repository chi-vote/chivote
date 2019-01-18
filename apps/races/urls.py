from django.urls import path
from . import views

urlpatterns = [
  # path('', views.RaceDetailView.as_view(), name='index'),
  path('<raceId>/', views.RaceDetailView.as_view(), name='index')
]