from django.shortcuts import render
from apps.questionnaires.forms import QuestionnaireForm

# Create your views here.
def questionnaire_view(request):
    form = QuestionnaireForm
    return render(request,'questionnaire.html',{'form':form})
