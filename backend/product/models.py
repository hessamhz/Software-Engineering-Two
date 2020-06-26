from django.db import models
from category import models as md

# Create your models here.
class productDetails(models.Model):
    product_name = models.CharField(max_length=200)
    product_category = models.ForeignKey(md.Category, on_delete=models.CASCADE)
    product_brand = models.CharField(max_length=50)
    product_size = models.CharField(max_length=2)
    product_image = models.ImageField(upload_to='images/',blank=True)
    product_price = models.DecimalField(max_digits=8, decimal_places=2)
    product_description = models.TextField()
    price_profile = models.ForeignKey(PriceProfile,on_delete=models.CASCADE)


    def __str__(self):
        return str(self.product_category) + '/' + self.product_name + '/' + self.product_brand

class PriceProfile(models.Model):
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=128,null=True,blank = True)
    percent = models.IntegerField(defult=0)


    def __str__(self):
        return self.title