# CarCar

Team:

* Adam Kmak - Automobile Services
* Joshua S - Automobile Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

This microservice consists of 4 models:
- customers
- salespersons
- sales
- AutomobileVOs
These models are integrated into 3 REST API methods GET, POST, DELETE
My AutomobileVO model relies on data from an existing Automobile model in another Django project.
in order to retrieve this data I use a poller script which successfully querys data using an API endpoint "...inventory-api:8000/api/automobiles"
This poller will only function if ALLOWED_HOSTS in both projects has each respective services name listed. These names can be found in docker-compose.yaml files

This microservice now consists of 6 React components on the frond end:
- CustomerForm (allows the user to create a new customer)
- CustomerList (allows the user to view a list of all customers)
- SalesForm    (allows the user to create a new Sale by selecting only unsold automobiles and corresponding customer, salesperson, and price)
- SalesList    (allows the user to view a list of all sales made by automobile vin and price)
- SalesPersonForm (allows the user to create a new Salesperson)
- SalesPersonList (allows the user to view a list of all salespersons)
- SalesPersonSalesHistory (allows the user to view a list of all sales made by specific salespersons, a useful TPI/performance tracking metric)

UI/Design is basic with some bootstrap mix-ins. Will improve tomorrow.
