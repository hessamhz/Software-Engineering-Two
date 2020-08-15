from django.db import models
from product.models import Product

class PriceProfile(models.Model):
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=128, null=True, blank=True)
    percent = models.IntegerField(default=0)
    created_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Price Profiles"


class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=500)
    is_finished = models.BooleanField(default=False)

    def __str__(self):
        return self.status

    class Meta:
        verbose_name_plural = "Orders"


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
