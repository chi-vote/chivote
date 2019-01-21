from django.db import models
from apps.candidates.models import Candidate

# Create your models here.
class Question(models.Model):
    question_slug = models.CharField(max_length=50)
    question_text = models.CharField(max_length=1000)
    def __str__():
        return self.question_text

class Response(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete=models.CASCADE)
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    text_response = models.TextField()

