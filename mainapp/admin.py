from django.contrib import admin
from mainapp import models

admin.site.register(models.Author)


# @admin.register(models.Author)
# class AuthorAdmin(admin.ModelAdmin):
#     pass
