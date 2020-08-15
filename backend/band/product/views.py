from django.shortcuts import render, HttpResponse

from product.models import Product
from category.models import Category

# adding to Cart View
from django.views.generic import TemplateView, ListView, View

class AddToCartView(View):

    def get(self, request, *args, **kwargs):
        request.session['cart'] = self.kwargs.get('pk')
        return HttpResponse('idk man')

class WhatIsInisde(View):

    def get(self, request, *args, **kwargs):
        session_cart = request.session['cart']
        return render(request, 'session-test.html', {'session_cart': session_cart})


class ProductByCategoryListView(ListView):
    # context_object_name = 'related_products'
    template_name = 'products.html'

    def get(self, request, *args, **kwargs):
        related_products = {}
        cr = Category.objects.all()
        for c in cr:
            pr = Product.objects.filter(category=c)
            if len(pr):
                related_products[c.name] = pr
        return render(request, self.template_name, {'related_products': related_products})


class ProductDetailView(View):
    # context_object_name = 'related_products'
    template_name = 'model.html'

    def get(self, request, *args, **kwargs):
        key = self.kwargs.get('pk')
        try:
            pr = Product.objects.get(pk=key)
            return render(request, self.template_name, {'product': pr})
        except Product.DoesNotExist:
            return HttpResponse("Product Does Not Exist")
