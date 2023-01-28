from .models import Project, ToDo
from .views import ProjectModelViewSet
from django.contrib.auth.models import User
from mixer.backend.django import mixer
from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase


class TestAuthorViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name_of_project': 'Python',
                                                  'description': 'Make a user model'}, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name_of_project': 'Python',
                                                  'description': 'Make a user model'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        project = Project.objects.create(
            name_of_project='Python', description='Make a user model')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(
            name_of_project='Python', description='Make a user model')
        client = APIClient()
        admin = User.objects.create_superuser('addmin', 'admin@admin.com',
                                              'admin1234567')
        client.login(username='addmin', password='admin1234567')
        response = client.put(f'/api/projects/{project.id}/', {'name_of_project': 'Грин',
                                                               'description': '1880'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name_of_project, 'Грин')
        self.assertEqual(project.description, '1880')
        client.logout()


class TestBookViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(
            name_of_project='Python', description='Make a user model')
        task = ToDo.objects.create(task=project, task_content='Make a class')
        admin = User.objects.create_superuser('admin3', 'admin@admin.com',
                                              'admin12345')
        self.client.login(username='admin3', password='admin12345')
        response = self.client.put(
            f'/api/tasks/{task.id}/', {'task': task.task.id, 'task_content': 'Руслан и Людмила'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task = ToDo.objects.get(id=task.id)
        self.assertEqual(task.task_content, 'Руслан и Людмила')

    def test_edit_mixer(self):
        # project = Project.objects.create(
        #     name_of_project='Python', description='Make a user model')
        # task = ToDo.objects.create(task=project, task_content='Make a class')
        task = mixer.blend(ToDo)
        admin = User.objects.create_superuser('admin3', 'admin@admin.com',
                                              'admin12345')
        self.client.login(username='admin3', password='admin12345')
        response = self.client.put(
            f'/api/tasks/{task.id}/', {'task': task.task.id, 'task_content': 'Руслан и Людмила'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task = ToDo.objects.get(id=task.id)
        self.assertEqual(task.task_content, 'Руслан и Людмила')

    def test_get_detail(self):
        task = mixer.blend(ToDo, task_content='Python jhghf')
        response = self.client.get(f'/api/tasks/{task.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_book = json.loads(response.content)
        self.assertEqual(response_book['task_content'], 'Python jhghf')

    def test_get_detail_author(self):
        task = mixer.blend(ToDo, task__name_of_project='test proj')
        response = self.client.get(f'/api/tasks/{task.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_task = json.loads(response.content)
        self.assertEqual(response_task['task']['name_of_project'], 'test proj')
