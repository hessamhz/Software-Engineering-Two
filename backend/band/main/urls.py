from django.urls import path, include
from .views import HomePageView, ProductByCategoryListView


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('by/category', ProductByCategoryListView.as_view(), name='product_cat'),
]
