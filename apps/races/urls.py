from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.RaceListView.as_view(), name='race-list'),
    path('<slug>/', views.RaceDetailView.as_view(), name='race-detail'),
    # re_path(r'<slug>/(?P<section>[\w-]+)',
    # views.RaceDetailView.as_view(), name='race-detail')
    path('<slug>/<section>/', views.RaceDetailView.as_view(), name='race-detail')
    # path(r'(?P<slug>[-\w]+)/$',
    #  views.RaceDetailView.as_view(), name='race-detail')
]
