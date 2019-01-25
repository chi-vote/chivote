from django.urls import path
from . import views

urlpatterns = [
    path('', views.RaceListView.as_view(), name='race-list'),
    path('<slug>/', views.RaceDetailView.as_view(), name='race-detail'),
]
