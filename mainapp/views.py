from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Author, Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ToDoSerializerBase, ProjectModelSerializerBase
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .filters import ProjectFilter, ToDoFilter
from rest_framework.pagination import LimitOffsetPagination
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework import permissions


# class AuthorModelViewSet(ModelViewSet):
#     queryset = Author.objects.all()
#     serializer_class = AuthorModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # filterset_fields = ['name_of_project', 'created_at']
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return ProjectModelSerializerBase
        return ProjectModelSerializer


class ProjectListAPIView(ListAPIView, ModelViewSet):
    renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_class = ToDoFilter
    # filterset_fields = ['task', 'created_at']
    pagination_class = ToDoLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoModelSerializer
        return ToDoSerializerBase

    def delete(self, request, pk):
        task = get_object_or_404(ToDo, pk=pk)
        task.deleted = True
        task.save()
