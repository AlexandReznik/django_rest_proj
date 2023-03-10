from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Author, Project, ToDo


# class AuthorModelSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = Author
#         fields = '__all__'


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = ('name_of_project',)


class ToDoSerializerBase(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    task = ProjectModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
