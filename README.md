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

This is all I've completed so far.