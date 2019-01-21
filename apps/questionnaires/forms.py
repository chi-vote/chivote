from django import forms
from apps.questionnaires.models import Question

questions = dict((x.question_slug, x.question_text)
                 for x in Question.objects.all())
yes_no_choices = (('Yes', 'Yes'), ('No', 'No'))


class QuestionnaireForm(forms.Form):
    imp_issue = forms.CharField(max_length=280, label=questions['imp_issue'])
    rent_ctrl = forms.MultipleChoiceField(
        label=questions['rent_ctrl'], choices=yes_no_choices)
    """ald_pre = forms.CharField(label=questions['ald_pre'],choices=yes_no_choices)
    school_bd = forms.CharField(label=questions['school_bd'],choices=yes_no_choices)
    pension = forms.CharField(label=questions['pension'],choices=yes_no_choices)
    cpd_acct = forms.CharField(label=questions['cpd_acct'],choices=yes_no_choices)
    term_limit = forms.CharField(label=questions['term_limit'],choices=yes_no_choices)
    fair_maps = forms.CharField(label=questions['fair_maps'],choices=yes_no_choices)
    cba = forms.CharField(label=questions['cba'],choices=yes_no_choices)
    tif = forms.CharField(label=questions['tif'],choices=yes_no_choices)"""
