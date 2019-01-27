from django.urls import path
from . import views

urlpatterns = [
    path('<slug>/', views.ContentItemDetailView.as_view(), name='page-detail'),
]
