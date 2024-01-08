from django.contrib import admin
from django.urls import path,include     
from rest_framework import routers       
from article import views as article_views 

router = routers.DefaultRouter()                   
router.register(r'article', article_views.ArticleView, 'article')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
