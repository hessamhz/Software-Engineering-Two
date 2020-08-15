from django.shortcuts import render
from django.views.generic import TemplateView, ListView, View

from product.models import Product
from category.models import Category
from .models import Order
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


class OrderTrackingView(TemplateView):
    template_name = 'track_order.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['track_code_valid'] = 0
        tracking_code = self.request.GET.get('track_code')
        if not tracking_code: return context

        try:
            tracking_code = int(tracking_code)
            o = Order.objects.get(pk=tracking_code)
            context['track_code_valid' ] = 1
        except Exception as e:
            context['track_code_valid' ] = 2
            print("Error:", e, tracking_code)

        return context
