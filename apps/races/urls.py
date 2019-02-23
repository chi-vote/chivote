from django.conf.urls.i18n import i18n_patterns
from django.urls import include, path
from . import feeds, views

races_patterns = ([
    path('', views.RaceListView.as_view(), name='race-list'),
    path('<slug>/', views.RaceDetailView.as_view(), name='race-detail'),
    path('<slug>/rss.xml', feeds.RaceFeed()),
    path('<slug>/<section>/', views.RaceDetailView.as_view(),
         name='race-detail-section'),
], 'races')

results_patterns = [
    path('', views.ResultsListView.as_view(), name='results-list')]

# urlpatterns = [
#     path('races/', include(races_patterns, namespace='races')),
# ]
