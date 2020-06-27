from django.contrib import admin

from . model import Category
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    model = Category

admin.site.register(Category, CategoryAdmin)
