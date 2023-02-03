import graphene
from graphene_django import DjangoObjectType
from mainapp.models import Project, ToDo


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = ('id', 'name_of_project', 'description', 'created_at')


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    project_by_name = graphene.Field(
        ProjectType, name_of_project=graphene.String(required=True))

    def resolve_project_by_name(root, info, name_of_project):
        try:
            return Project.objects.get(name_of_project=name_of_project)
        except Project.DoesNotExist:
            return None

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
