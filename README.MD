<!-- PROJECT LOGO -->
<br />

  ![koneksyslogo](https://koneksys.com/img/favicon.png){width=50 height=50}

  <h3 align="center">Koneksys Backend Exercise</h3>

  <p align="center">
    Coding Exercise for NodeJS Backend Developer
    <br />
    <a href="#markdown-header-usage"><strong>Explore the docs »</strong></a>
    <br />
    <br />


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#markdown-header-about-the-project)
  * [Built With](#markdown-header-built-with)
* [Getting Started](#markdown-header-getting-started)
  * [Prerequisites](#markdown-header-prerequisites)
  * [Installation](#markdown-header-installation)
  * [PM2 Instruction](#markdown-header-pm2-instructions)
* [Usage](#markdown-header-usage)
  * [For Manufacturers](#markdown-header-for-manufacturers)
  * [For Equipments](#markdown-header-for-equipments)
* [Meet the Developer](#markdown-header-meet-the-developer)




<!-- ABOUT THE PROJECT -->
## About The Project

Project built for Koneksys. A simple NodeJS REST application that automatically deploys using BitBucket Pipelines on a cloud server.


### Built With

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [PG Library](https://node-postgres.com/) 
* [PM2](https://pm2.keymetrics.io/)
* [BitBucket Pipelines](https://bitbucket.org/product/features/pipelines)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm
```bash
npm install npm@latest -g
```

* yarn
```bash
npm install -g yarn
```
### Installation
 
1. Clone the repo
```bash
git clone git@bitbucket.org:sanjaybaskaran01/koneksys.git
```
2. Install NPM packages
```bash
yarn install
```
3. Configure .env
```env
PGUSER = ""
PGPASSWORD = ""
HOST = ""
DATABASE = ""
PGPORT = 5432
```
4. Running app in development mode
```bash
yarn dev
```
5. Build the app
```bash
yarn build
``` 
6. Running the app
```bash
yarn start
```

### PM2 Instructions

pm2-config.json
```
{
    "apps": [
        {
            "name": "koneksys-backend",
            "script": "./dist/app.js",
            "time": true,
            "log_date_format": "YYYY-MM-DD HH:mm Z",
            "error_file": "./logs/err.log",
            "out_file": "./logs/out.log"
        }
    ]
}
```
1. To start the app
```bash
pm2 start pm2-config.json
```
2. To stop the app
```bash
pm2 stop pm2-config.json
```
3. To restart the app
```bash
pm2 restart pm2-config.json
```


<!-- USAGE EXAMPLES -->
## Usage

### For Manufacturers

------------------------------------------------------------------------------------------

#### Create or update a manufacturer, list all manufacturers


 <code>GET</code> <code><b>/manufacturer</b></code> <code>(Lists all the manufacturers)</code>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","data":[<Array of manufacturer data>]}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

> ```bash
>  curl --location --request GET 'http://137.184.53.72:3001/manufacturer'
> ```






 <code>POST</code> <code><b>/manufacturer</b></code> <code>(Inserts a new manufacturer into database)</code>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string   | Name of the Manufacturer  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","id":<UUID of created manufacturer>}`                                |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |

##### Example cURL

```bash
curl --location --request POST 'http://137.184.53.72:3001/manufacturer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Elves"
}'
```




 <code>PUT</code> <code><b>/manufacturer/{ID}</b></code> <code>(Updates the name of the manufacturer)</code>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `ID` |  required | UUID   | The specific UUID of manufacturer        |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","updatedData":<Updated data>}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

```bash

curl --location --request PUT 'http://137.184.53.72:3001/manufacturer/9a8cfe2b-161c-4994-a8ed-a732dd3b4656' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Dwarves"
}'

```



------------------------------------------------------------------------------------------

#### Read or Delete a manufacturer



  <code>GET</code> <code><b>/manufacturer/{ID}</b></code> <code>(Reads Manufacturer data by its defined uuid property)</code>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `ID` |  required  | UUID         | The specific UUID unique idendifier                  |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","data":<manufacturer data of UUID>}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

> ```bash
>  curl --location --request GET 'http://137.184.53.72:3001/manufacturer/80f39157-dbb9-4463-95a9-9b690d32bbce'
> ```





  <code>DELETE</code> <code><b>/manufacturer/{ID}</b></code> <code>(Deletes manufacturer data by its defined uuid property)</code>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `ID` |  required  | UUID         | The specific UUID unique idendifier                  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success",deletedData:<manufacturer data that got deleted>}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |



##### Example cURL

> ```bash
>  curl --location --request DELETE 'http://137.184.53.72:3001/manufacturer/179cc5e8-d2e7-4fdd-96c4-0443b89b48f7'
> ```



------------------------------------------------------------------------------------------


#### List all equipments of the manufacturer



  <code>GET</code> <code><b>/{name}/equipment</b></code> <code>(gets all the equipments of manufacturer by its name)</code>

##### Parameters

> | name   |  type      | data type      | description                                                  |
> |--------|------------|----------------|--------------------------------------------------------------|
> | `name` |  required  | string         | The Specified name of the manufacturer                  |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","data":[<Array of all the equipments of the particular manufacturer>]}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

> ```bash
>  curl --location --request GET 'http://137.184.53.72:3001/Humans/equipment'
> ```



------------------------------------------------------------------------------------------

### For Equipments

------------------------------------------------------------------------------------------

#### Create or update an equipment, list all equipments


 <code>GET</code> <code><b>/equipment</b></code> <code>(Lists all the manufacturers)</code>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","data":[<Array of equipment data>]}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

> ```bash
>  curl --location --request GET 'http://137.184.53.72:3001/equipment'
> ```




 <code>POST</code> <code><b>/</b></code> <code>(Inserts a new equipment into database)</code>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | model      |  required | string   | Model of the equipment  |
> | serialNumber      |  required | string   | Unique Serial Number of the equipment  |
> | manufacturer_id      |  required | UUID   | The specific UUID unique idendifier of manufacturer |



##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","id":<UUID of created equipment>}`                                |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |

##### Example cURL

```bash

curl --location --request POST 'http://137.184.53.72:3001/equipment' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model":"Long Battle Bow",
    "serialNumber":"000001A",
    "manufacturer_id":"80f39157-dbb9-4463-95a9-9b690d32bbce""
}'

```




 <code>PUT</code> <code><b>/equipment/{ID}</b></code> <code>(Updates the name,specifiedModel, of the equipment)</code>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `ID` |  required | UUID   | The specific UUID of equipment to update        |
> | `model` |  required | string   | Updated model name        |
> | `serialNumber` |  required | string   | Updated serialNumber         |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","updatedData":<Updated data>}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

```bash

curl --location --request PUT 'http://137.184.53.72:3001/equipment/3bc06fe7-bc77-4b56-9b7d-70d67e77f9ce' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model":"Shield of Gondor",
    "serialnumber":"000001B"
}'
```



------------------------------------------------------------------------------------------

#### Read or Delete a equipment



  <code>GET</code> <code><b>/equipment/{ID}</b></code> <code>(Reads equipment data by its defined uuid property)</code>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `ID` |  required  | UUID         | The specific UUID unique idendifier to get                  |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","data":<equipment data of UUID>}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

> ```bash
> curl --location --request GET 'http://137.184.53.72:3001/equipment/3bc06fe7-bc77-4b56-9b7d-70d67e77f9ce'
> ```





  <code>DELETE</code> <code><b>/equipment/{ID}</b></code> <code>(Deletes equipment data by its defined uuid property)</code>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `ID` |  required  | UUID         | The specific UUID unique idendifier to delete                  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success",deletedData:<equipment data that got deleted>}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |



##### Example cURL

> ```bash 
>  curl --location --request DELETE 'http://137.184.53.72:3001/equipment/b2ae8c14-2e13-4079-a7bf-ef1076ea52f6'
> ```



------------------------------------------------------------------------------------------


#### List all equipments of the equipment



  <code>GET</code> <code><b>/{model name}/equipment</b></code> <code>(gets all the equipments of equipment by its name)</code>

##### Parameters

> | name   |  type      | data type      | description                                                  |
> |--------|------------|----------------|--------------------------------------------------------------|
> | `model name` |  required  | string         | The Specified model name of the equipment                  |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","data":<Manufacturer Owner of the model>}`                                                         |
> | `500`         | `application/json`                | `{"status":"failure","message":<error message>}`                            |


##### Example cURL

> ```bash
> curl --location --request GET 'http://137.184.53.72:3001/the%20anduril%20sword/manufacturer'
> ```



------------------------------------------------------------------------------------------

## Meet the Developer

<p> Hey everybody! My name is Sanjay Kumar Baskaran, I'm extremely grateful to have this opportunity to apply for this position. I learnt a lot while building this project 😀 </p>

<table>
  <tr>
    <td align="center"><a href="https://github.com/sanjaybaskaran01"><img src="https://avatars.githubusercontent.com/u/72266283?v=4" width="100px;" alt=""/><br /><sub><b>Sanjay Baskaran</b></sub></a><br /></td>
</tr>
</table>