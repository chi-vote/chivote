from django.conf import settings


def app_context(request):
    '''
    return the value you want as a dictionnary. you may add multiple values in there.
    '''
    try:
        CHIVOTE_URL_PREFIX = settings.CHIVOTE_URL_PREFIX
    except AttributeError:
        CHIVOTE_URL_PREFIX = ''
    return {'CHIVOTE_URL_PREFIX': CHIVOTE_URL_PREFIX}
