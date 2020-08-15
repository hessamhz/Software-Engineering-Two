from django.db import models
from category.models import Category
from main.models import PriceProfile

# Image Location Function should be Written here:


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField()
    profile = models.ForeignKey(PriceProfile, on_delete=models.CASCADE, null=True, blank=True)
    created_date = models.DateTimeField()
    def __str__(self):
        return f"{self.name} / {self.category}"

