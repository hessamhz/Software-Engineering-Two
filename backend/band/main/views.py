from django.shortcuts import render
from django.views.generic import TemplateView, ListView

from product.models import Product
# Create your views here.
class HomePageView(TemplateView):
    template_name = 'index.html'


class ProductByCategoryListView(ListView):
    model = Product
    context_object_name = 'related_products'
    template_name = 'product_category.html'

    def get_queryset(self):
        cat = self.request.GET.get('category')
        return Product.objects.filter(
            category__name=cat
        )
