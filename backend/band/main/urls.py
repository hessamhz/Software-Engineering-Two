from django.urls import path, include
from .views import HomePageView, ProductByCategoryListView, OrderTrackingView


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('order/track', OrderTrackingView.as_view(), name='track'),
    # path('by/category', ProductByCategoryListView.as_view(), name='product_cat'),
]
