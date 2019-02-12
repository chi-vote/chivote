from django.urls import path
from . import views

site_content_patterns = [
    path('<slug>/', views.ContentItemDetailView.as_view(), name='page-detail'),
]
