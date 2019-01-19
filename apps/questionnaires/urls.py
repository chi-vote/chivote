from django.urls import path

from apps.questionnaires.views import questionnaire_view

urlpatterns = [
        path('questionnaire',questionnaire_view)
        ]
