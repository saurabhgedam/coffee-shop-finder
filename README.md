# coffee-shop-finder
Coffee shop finder is a Node.js application project to create REST APIs to query a set of data. The application parses a CSV, stores it in a map to create an in-memory database and performs CRUD operations on it.

## Prerequisite:

- Node.js must be installed on the system.
  Download link: https://nodejs.org/en/
- HTTP client to test the web service. Postman is recommended.
  Get Postman from here: https://www.getpostman.com/apps



## Steps:
- Download or clone the git repository.
- Navigate to the root directory from command line.
- Run the 'npm install' command. This will download all the dependencies noted in package.json.
- Run the 'npm start' command. This will start the server on port 3000.

## GET:

#### Syntax: 

ht<span>tp://</span>localhost:3000/shop/{shopID}

#### Example:

ht<span>tp://</span>localhost:3000/shop/56

#### Sample Response:

{
    "id": "56",
    "name": "Chapel Hill Coffee Co.",
    "address": "670 Commercial St",
    "latitude": "37.794096040757196",
    "longitude": "-122.40423200906335"
}

## POST:

#### Request Syntax: 

ht<span>tp://</span>localhost:3000/shop

#### Request Body Syntax:
{
    "name": "",
    "address": "",
    "latitude": "",
    "longitude": ""
}

#### Example: 

ht<span>tp://</span>localhost:3000/shop

#### Request Body Sample (Raw - JSON):

{
    "name": "Spurs Cafe",
    "address": "Kane Road, Tottenham, London",
    "latitude": "31.782392430469445",
    "longitude": "-120.12997324121123"
}

#### Expected Response:

{
    "success": "Shop added with ID: 57"
}

## PUT:

#### Request Syntax: 

ht<span>tp://</span>localhost:3000/shop/{shop id}

#### Request Body Syntax:
{
    "name": "",
    "address": "",
    "latitude": "",
    "longitude": ""
}

#### Example:

ht<span>tp://</span>localhost:3000/shop/21

#### Request Body Sample (Raw-JSON):

{
    "name": "Liverpool Cafe",
    "address": "Anfield Road, Liverpool",
    "latitude": "29.782392435669456",
    "longitude": "-121.1299243241561123"
} 


#### Expected Response:
{
    "success": "Updated"
}


## DELETE:

#### Request Syntax: 

ht<span>tp://</span>localhost:3000/shop/{shop id}

#### Request Example:

ht<span>tp://</span>localhost:3000/shop/20


#### Expected Response:

{
    "success": "Shop deleted"
}

## FIND NEAREST:

#### Request Syntax: 

ht<span>tp://</span>localhost:3000/shop/locate/nearest?address= {source address} 

#### Request Example:

ht<span>tp://</span>localhost:3000/shop/locate/nearest?address=535 Mission St., San Francisco, CA 

#### Expected Response:

{
    "name": "Red Door Coffee"
}

