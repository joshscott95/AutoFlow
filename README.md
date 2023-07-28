# CarCar
```
 ________   ________   ________   ________   ________   ________
|\   ____\ |\   __  \ |\   __  \ |\   ____\ |\   __  \ |\   __  \
\ \  \___| \ \  \|\  \\ \  \|\  \\ \  \___| \ \  \|\  \\ \  \|\  \
 \ \  \     \ \   __  \\ \   _  _\\ \  \     \ \   __  \\ \   _  _\
  \ \  \____ \ \  \ \  \\ \  \\  \|\ \  \____ \ \  \ \  \\ \  \\  \|
   \ \_______\\ \__\ \__\\ \__\\ _\ \ \_______\\ \__\ \__\\ \__\\ _\
    \|_______| \|__|\|__| \|__|\|__| \|_______| \|__|\|__| \|__|\|__|

```
Team:
**Adam K** - Service
**Joshua S** - Sales

## How to Run this App

**Pre-reqs: Git, Docker**
​
1. Fork the repository; clone its files to your local machine using the terminal command below:
    - `git clone <<Clone with HTTPS link>>`
​
2. Build and run the project with the following Docker commands in your terminal:
    ```
    docker volume create beta-data
    docker-compose build
    docker-compose up
    ```
3. Verify that each Docker container is running; there should be (7) in total:
    - database-1
    - react-1
    - inventory-api-1
    - service-api-1
    - service-poller-1
    - sales-api-1
    - sales-poller-1
​
4. You can view the CarCar web app in your browser @ http://localhost:3000/.
​
## Diagram
 - Put diagram here
​
# API Documentation

## URLs and Ports

1. CarCar Web App:
    - http://localhost:3000/

2. Inventory API:
    - http://localhost:8100/api/

3. Service API:
    - http://localhost:8080/api/

4. Sales API:
    - http://localhost:8090/api/

## Inventory Microservice

For this microservice, we utilized the following models (and properties) listed below:
1. Model: 'Manufacturer'
    - name
2. Model: 'VehicleModel'
    - name
    - picture_url
    - manufacturer (foreign-key)
3. Model: 'Automobile'
    - color
    - year
    - vin
    - sold
    - model (foreign-key)

The Inventory microservice is integrated to both the Service and Sales microservices through their respective pollers (service-poller-1, sales-poller-1). This helps with the scalability of each microservice and simplifies the management of each database. Overall, this microservice is designed to help dealerships manage a varied and dynamic inventory while communicating changes to both its Service and Sales branches.

### Inventory API

**Manufacturers**
```
+--------------------------------+--------+----------------------------------------------+
|             Action             | Method |                     URL                      |
+--------------------------------+--------+----------------------------------------------+
| List Manufacturers             | GET    | http://localhost:8100/api/manufacturers/     |
| Create a manufacturer          | POST   | http://localhost:8100/api/manufacturers/     |
| Get a Specific Manufacturer    | GET    | http://localhost:8100/api/manufacturers/:id/ |
| Update a Specific Manufacturer | PUT    | http://localhost:8100/api/manufacturers/:id/ |
| Delete a Specific Manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/ |
+--------------------------------+--------+----------------------------------------------+
+--------------------------------+--------+----------------------+
|             Action             | Method | JSON Body - Example  |
+--------------------------------+--------+----------------------+
| Create a Manufacturer          | POST   | {"name": "Chrysler"} |
| Update a Specific Manufacturer | PUT    | {"name": "Honda"}    |
+--------------------------------+--------+----------------------+
```
**Models**
```
+---------------------------------+--------+---------------------------------------+
|             Action              | Method |                  URL                  |
+---------------------------------+--------+---------------------------------------+
| List Vehicle Models             | GET    | http://localhost:8100/api/models/     |
| Create a Vehicle Model          | POST   | http://localhost:8100/api/models/     |
| Get a Specific Vehicle Model    | GET    | http://localhost:8100/api/models/:id/ |
| Update a Specific Vehicle Model | PUT    | http://localhost:8100/api/models/:id/ |
| Delete a Specific Vehicle Model | DELETE | http://localhost:8100/api/models/:id/ |
+---------------------------------+--------+---------------------------------------+
+----------------------------------+----------+---------------------------------------------------------+
|             Action               |  Method  |                   JSON Body - Example                   |
+----------------------------------+----------+---------------------------------------------------------+
| Create a Vehicle Model           | POST     |  { "name": "Sebring",                                   |
|                                  |          |    "picture_url": "<Insert URL>", "manufacturer_id": 1} |
| Update a Specific Vehicle Model  | PUT      |  { "name": "Civic",                                     |
|                                  |          |    "picture_url": "<Insert URL>", "manufacturer_id": 2} |
+----------------------------------+----------+---------------------------------------------------------+
```
**Automobiles**
```
+------------------------------+--------+---------------------------------------------+
|            Action            | Method |                     URL                     |
+------------------------------+--------+---------------------------------------------+
| List Automobiles             | GET    | http://localhost:8100/api/automobiles/      |
| Create an Automobile         | POST   | http://localhost:8100/api/automobiles/      |
| Get a Specific Automobile    | GET    | http://localhost:8100/api/automobiles/:vin/ |
| Update a Specific Automobile | PUT    | http://localhost:8100/api/automobiles/:vin/ |
| Delete a Specific Automobile | DELETE | http://localhost:8100/api/automobiles/:vin/ |
+------------------------------+--------+---------------------------------------------+
+-------------------------------+----------+----------------------------------------------+
|            Action             |  Method  |              JSON Body - Example             |
+-------------------------------+----------+----------------------------------------------+
| Create an Automobile          | POST     |  {"color": "red", "year": 2012,              |
|                               |          |   "vin": "1C3CC5FB2AN120174", "model_id": 1} |
| Update a Specific Automobile  | PUT      |  {"color": "blue", "year": 2014,             |
|                               |          |   "vin": "1C3CC5FB2AN120174", "model_id": 2} |
+-------------------------------+----------+----------------------------------------------+
```
## Service microservice

For this microservice, we utilized the following models (and properties) listed below:
1. Model: 'Technician'
    - first_name
    - last_name
    - employee_id
2. Model: 'Appointment'
    - date_time
    - reason
    - status
    - vin
    - customer
    - technician (foreign-key)
    - vip
3. Model: 'Automobile VO'
    - vin
    - sold

We were able to integrate with the Inventory microservice through the ‘AutomobileVO’ model (value object) containing both vin and sold properties. Our microservice's poller (service-poller-1) pings the Inventory's Automobile API @ "http://project-beta-inventory-api-1:8000/api/automobiles/" every 60 seconds to look for any new (or updated) data.

Ultimately, this setup (along with the 'vip' property on the 'Appointment' model) allows us to determine if a customer's vehicle was in our inventory (meaning it has been sold). It also allows us to avoid any synchronization issues that may occur from attempting to maintain 'Automobile' entities over multiple databases.

### Service API
```
+--------------------------------------+--------+----------------------------------------------------+
|                Action                | Method |                        URL                         |
+--------------------------------------+--------+----------------------------------------------------+
| List Technicians                     | GET    | http://localhost:8080/api/technicians/             |
| Create a Technician                  | POST   | http://localhost:8080/api/technicians/             |
| Delete a Specific Technician         | DELETE | http://localhost:8080/api/technicians/:id/         |
| List Appointments                    | GET    | http://localhost:8080/api/appointments/            |
| Create an Appointment                | POST   | http://localhost:8080/api/appointments/            |
| Delete an Appointment                | DELETE | http://localhost:8080/api/appointments/:id/        |
| Set Appointment Status to 'canceled' | PUT    | http://localhost:8080/api/appointments/:id/cancel/ |
| Set Appointment Status to 'finished' | PUT    | http://localhost:8080/api/appointments/:id/finish/ |
+--------------------------------------+--------+----------------------------------------------------+
+---------------------------------------+----------+---------------------------------------------------+
|                Action                 |  Method  |                JSON Body - Example                |
+---------------------------------------+----------+---------------------------------------------------+
| Create a Technician                   | POST     |  {"first_name": "John", "last_name": "Appleseed", |
|                                       |          |   "employee_id": "jappleseed"}                    |
|                                       |          |                                                   |
| Create an Appointment                 | POST     |  {"date_time": "2011-11-04T00:10:00",             |
|                                       |          |   "reason": "Brake Replacement",                  |
|                                       |          |   "vin": "1C3CC5FB2AN120174",                     |
|                                       |          |   "customer": "Jane Appleseed",                   |
|                                       |          |   "technician": 1}                                |
|                                       |          |                                                   |
| Set Appointment Status to 'canceled'  | PUT      |  N/A - body should be empty.                      |
| Set Appointment Status to 'finished'  | PUT      |  N/A - body should be empty.                      |
+---------------------------------------+----------+---------------------------------------------------+
```
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

### Sales API
    - Put Sales API documentation here

## Value Objects
    - Inventory Microservice
        -- None
    - Service Microservice
        -- Model: 'AutomobileVO'
            --- Properties: 'vin', 'sold'
            --- This VO allows us to determine if a customer's appointment is eligible for VIP discounts, etc.
