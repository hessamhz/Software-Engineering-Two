from django.shortcuts import render
from django.views.generic import TemplateView, ListView, View

from product.models import Product
from category.models import Category
# Create your views here.


class HomePageView(TemplateView):
    template_name = 'index.html'


class ProductByCategoryListView(ListView):
    # context_object_name = 'related_products'
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        """
        cat = self.request.GET.get('category')
        return Product.objects.filter(
            category__name=cat
        )
        """
        related_products = {}
        cr = Category.objects.all()
        for c in cr:
            pr = Product.objects.filter(category=c)
            if len(pr):
                related_products[c.name] = pr
        return render(request, self.template_name, {'related_products': related_products})
