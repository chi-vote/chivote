from django.urls import path
from . import views

urlpatterns = [
  path('<candidateId>/', views.CandidateDetailView.as_view(), name='index')
]