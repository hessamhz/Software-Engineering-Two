from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    created_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name