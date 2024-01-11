from rest_framework import serializers,viewsets
from website.models import Website

class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Website   
        fields = '__all__'

class WebsiteView(viewsets.ModelViewSet):  
    serializer_class = WebsiteSerializer   
    queryset = Website.objects.all()
