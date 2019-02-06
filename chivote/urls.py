"""chivote URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import RedirectView
from django.conf.urls import include

from apps.newsfeed.feeds import LatestArticlesFeed

urlpatterns = [
    path('admin/', admin.site.urls),
]

# Use include() to add paths from the catalog application
urlpatterns += [
    path('', include('apps.core.urls')),
    path('races/', include('apps.races.urls')),
    path('', include('apps.site_content.urls')),
    # path('candidates/', include('apps.candidates.urls')),
    path('latest/feed/', LatestArticlesFeed()),
    # path('questionnaire/', include('apps.questionnaires.urls'))
]

# Use static() to add url mapping to serve static files during development (only)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
