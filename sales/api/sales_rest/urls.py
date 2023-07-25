from django.urls import path
from .views import salespeople_list_view, salesperson_detail_view, customers_list_view, customer_detail_view, sales_list_view, sale_detail_view


urlpatterns = [
    path('salespeople/', salespeople_list_view, name='salespeople_list_view'),
    path('salespeople/<int:id>/', salesperson_detail_view, name='salesperson_detail_view'),
    path('customers/', customers_list_view, name="customers_list_view"),
    path('customers/<int:id>/', customer_detail_view, name="customer_detail_view"),
    path('sales/', sales_list_view, name="sales_list_view"),
    path('sales/<int:id>/', sale_detail_view, name="sale_detail_view"),
]