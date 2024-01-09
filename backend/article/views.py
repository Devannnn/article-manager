from rest_framework import serializers,viewsets
from article.models import Article
from tag.models import Tag
from tag.views import TagSerializer

class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Article   
        fields = '__all__'

    def create(self, validated_data):
        tags_data = self.context['request'].data.get('tags', [])
        validated_tags = []
        for tag_data in tags_data:
            try:
                tag_id = tag_data.get('id')
                tag_object = Tag.objects.get(id=tag_id)
                validated_tags.append(tag_object)
            except Tag.DoesNotExist:
                pass
        validated_data['tags'] = validated_tags
        return super().create(validated_data)

    
class ArticleView(viewsets.ModelViewSet): 
    serializer_class = ArticleSerializer   
    queryset = Article.objects.all()
