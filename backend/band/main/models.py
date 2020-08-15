from django.db import models


class PriceProfile(models.Model):
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=128, null=True, blank=True)
    percent = models.IntegerField(default=0)
    created_date = models.DateTimeField()
    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Price Profiles"
