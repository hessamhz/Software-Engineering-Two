from django.db import models

# Create your models here.
class productDetails(models.Model):
    product_name = models.CharField(max_length=200)
    product_category = models.ForeignKey(productCategory, on_delete=models.CASCADE)
    product_brand = models.CharField(max_length=50)
    product_size = models.CharField(max_length=2)
    product_image = models.ImageField(upload_to='images/',blank=True)
    product_price = models.DecimalField(max_digits=8, decimal_places=2)
    product_description = models.TextField()

    def __str__(self):
        return str(self.product_category) + '/' + self.product_name + '/' + self.product_brand
