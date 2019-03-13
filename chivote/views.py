from apps.races.views import ResultsListView as Ancestor
# from apps.core.views import HomePageView as Ancestor


class IndexView(Ancestor):
    '''
    inherit other view and present it as the main index
    '''
    build_path = 'index.html'
    url_name = 'index'
