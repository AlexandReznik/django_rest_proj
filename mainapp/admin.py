from django.contrib import admin
from mainapp import models as mainapp_models

admin.site.register(mainapp_models.Author)


# @admin.register(models.Author)
# class AuthorAdmin(admin.ModelAdmin):
#     pass
