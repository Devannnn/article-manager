from rest_framework import serializers,viewsets
from article.models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article   
        fields = '__all__'

class ArticleView(viewsets.ModelViewSet):  
    serializer_class = ArticleSerializer   
    queryset = Article.objects.all()
