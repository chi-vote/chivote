from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
# from django.conf.urls import include
from django.conf.urls.static import static
from apps.newsfeed.feeds import LatestArticlesFeed
from apps.races.urls import races_patterns

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

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += i18n_patterns(
    path('races/', include(races_patterns, namespace='races')),
    prefix_default_language=False
)

# Use include() to add paths from the catalog application
content_patterns = [
    path('', include('apps.core.urls')),
    path('', include('apps.site_content.urls')),
    path('rss.xml', LatestArticlesFeed()),
]

urlpatterns += content_patterns

# Use static() to add url mapping to serve static files during development (only)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
