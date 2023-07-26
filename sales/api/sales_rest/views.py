from django.shortcuts import render
from django.db import transaction
from common.json import ModelEncoder
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
import requests
import json
from .models import Salesperson, Customer, Sale, AutomobileVO
# Create your views here.



class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ['first_name', 'last_name', 'employee_id', 'id']

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ['first_name', 'last_name', 'address', 'phone_number', 'id']

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold', 'id']

    def default(self, o):
        if isinstance(o, self.model):
            return o.to_dict()
        else:
            return super().default(o)

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ['automobile', 'salesperson', 'customer', 'price', 'id']
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

@require_http_methods(["GET", "POST"])
def salespeople_list_view(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else: # POST
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET"])
def salesperson_detail_view(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response
    else: # DELETE
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                {"message": "Salesperson deleted successfully"},
                status=200
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Salesperson does not exist"}, status=404)
        

@require_http_methods(["GET", "POST"])
def customers_list_view(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:  # POST
        try:
            data = json.loads(request.body)
            new_customer = Customer.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                address=data['address'],
                phone_number=data['phone_number'],
            )
            return JsonResponse(
                new_customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Exception as e:
            response = JsonResponse({"message": "Could not create the customer. Error: " + str(e)})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET"])
def customer_detail_view(request, id):
    try:
        customer = Customer.objects.get(pk=id)
    except ObjectDoesNotExist:
        response = JsonResponse({"message": "Customer does not exist"})
        response.status_code = 404
        return response

    if request.method == "GET":
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:  # DELETE
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                {"message": "Customer deleted successfully"},
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"}, status=404)
        



@require_http_methods(["GET", "POST"])
@transaction.atomic 
def sales_list_view(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            auto = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(pk=content["salesperson"])
            customer = Customer.objects.get(pk=content["customer"])

            # Assign the object instances to the respective keys
            content['automobile'] = auto
            content['salesperson'] = salesperson
            content['customer'] = customer

            # Create the Sale instance
            sale = Sale.objects.create(**content)
            # Set 'sold' attritbute to True 
            response = requests.put(
                f'http://inventory-api:8000/api/automobiles/{auto.vin}/',
                json={'sold': True}
            )
            if response.status_code != 200:
                raise Exception("Failed to update the Automobile's sold status")

            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )


        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid AutomobileVO VIN"},
                status=400,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson id"},
                status=400,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer id"},
                status=400,
            )



@require_http_methods(["DELETE", "GET"])
def sale_detail_view(request, id):
    try:
        sale = Sale.objects.get(pk=id)
    except ObjectDoesNotExist:
        response = JsonResponse({"message": "Sale does not exist"})
        response.status_code = 404
        return response

    if request.method == "GET":
        return JsonResponse(sale.to_dict(), safe=False)
    else:  # DELETE
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse({"message": "Sale deleted successfully"}, safe=False)
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Sale does not exist"}, status=404)
