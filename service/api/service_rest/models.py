from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()

class Appointment(models.Model):

    created = "created"
    finished = "finished"
    canceled = "canceled"

    status_choices = [(created, "created"), (finished, "finished"), (canceled, "canceled"),]

    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=status_choices, default=created)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        "Technician",
        related_name="appointments",
        on_delete=models.PROTECT,
    )
