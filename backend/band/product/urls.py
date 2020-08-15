from django.urls import path, include
from .views import AddToCartView, WhatIsInisde, ProductByCategoryListView, ProductDetailView


urlpatterns = [
    path('products/', ProductByCategoryListView.as_view(), name='products'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product_detail'),
    path('add/<int:pk>/', AddToCartView.as_view(), name='add_to_cart'),
    path('what/', WhatIsInisde.as_view(), name='what')
]
