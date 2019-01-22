from django.urls import path
from . import views

urlpatterns = [
    # path('', views.RaceDetailView.as_view(), name='index'),
    path('<pk>/', views.RaceDetailView.as_view(), name='race-detail'),
    path('', views.RaceListView.as_view(), name='race-list'),
]
