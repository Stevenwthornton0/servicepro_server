
# ServicePRO (server)

This is the backend code for Brewbook, a search-based pseudo-social-media application that allows the user to search for, and review all breweries in a given city.

- [Live app](https://servicepro-app.now.sh/)
- [Link to client repo](https://github.com/Stevenwthornton0/servicepro_client)

## API Documentation
### Reviews Endpoints

## **1. GET /reviews**

Returns an array of reviews on a service page that were submitted with an id number that corresponds with that service.

### Sample query

```
/reviews/:service_id
```

### Example response
```
[
    {
        "id": 2,
        "rating": 5,
        "text": "Great service!",
        "service_id": 1,
        "date_created": "2019-10-01T16:11:11.000Z",
        "user": {
            "id": 1,
            "user_name": "dunder",
            "first_name": "Dunder",
            "last_name": "Mifflin",
            "date_created": "2019-12-22T10:38:03.831Z",
            "date_modified": null
        }
    }
]
```
- ```id - string``` - uuid of review post
- ```rating - integer``` - the score, out of five, given by the user
- ```text-string``` - any additional review the user may leave
- ```brewery_id - integer``` - the uuid of the service that the review is associated with
- ```date_created - date``` - the date the review was created
- ```user - object``` - the user who posted the review 

## **2. POST /reviews/:service_id**

The application allows users to post their reviews of different breweries for others to read.

### Example request

```
{
    service_id: 1,
    rating: 5,
    text: "Great service!",
    user: {
        id: 1,
        user_name: "dunder",
        first_name: "Dunder",
        email: 'test@email.com',
        last_name: "Mifflin",
        date_created: "2019-12-22T10:38:03.831Z",
        date_modified: null
    }

}
```

## **DELETE /reviews/:service_id/:review_id**

This endpoint allows the authorized admin to delete any reviews unwanted or innapropriate specified by the brewery_id and the id of the review itself. If no review id is found, the server responds with a status 400.

### Users Endpoints
## **GET /users/:user_name**

Returns the data for the user specified by the user_name.

If no user is found, server responds with a status 400.

### Example response
```
{
    "id": 1,
    "first_name": "Dunder",
    "last_name": "Mifflin",
    "user_name": "dunder",
    "admin": true,
    "date_created": "2019-12-22T10:38:03.831Z"
}
```

## **POST /users**

This endpoint allows users to register a new account to the server.

If not all parameters are followed, server responds with a status 400.

### Sample request
```
{
    first_name: "dunder",
    last_name: "mifflin",
    email: "email@test.com,
    user_name: "dunder",
    password: "password"
    date_created: "2019-12-22T10:38:03.831Z"
}
```

### Services Endpoints
## GET /services/:serviceType

This gets data for all the services associated with a specific service type chosen from a pre-determined list. Parameters for city and state can be added to filter the list based on location.

### Sample query
```
1. /services/travel
2. /services/mechanic?city=austin&state=texas
```

### Example Response
```
[
    {
        id: 1,
        name: 'Good Mechanic',
        email: 'test1@email.com',
        phone: 1234567890,
        city: 'Austin',
        state: 'Texas',
        about: 'Lorem Ipsum'
    },
    {
        id: 2,
        name: 'Better Mechanic',
        email: 'test2@email.com',
        phone: 1234567890,
        city: 'Austin',
        state: 'Texas',
        about: 'Lorem Ipsum'
    }
]
```

## GET /services/service/:service_id

This gets data for only one service based on given service id.

## DELETE /services/service/:service_id

Administrators are able to delete services with a button that only appears when they are logged in.

## PATCH /services/service/:service_id

Users are able to edit their registered service page only if it is associated with their user id. The option will be unavailable otherwise.

## POST /services

Users are able to register their own service / business to the server.

### Sample Request
```
{
    service-type: 'mechanic',
    name: 'Car Fixers',
    email: 'carfixers@email.com',
    phone: 1234567890,
    city: 'austin',
    state: 'texas',
    about: 'Lorem Ipsum',
    user: {
        id: 1,
        user_name: "dunder",
        first_name: "Dunder",
        email: 'test@email.com',
        last_name: "Mifflin",
        date_created: "2019-12-22T10:38:03.831Z",
    }
}
```

## Technology Stack
### Backend

- **Express** for handling API requests
- **Node** for interacting with the file system
- **Knex.js** for interfacing with the PostgresQL database
- **Postgrator** for database migration
- **Mocha, Chai, Supertest** for endpoints testing
- **JSON Web Token, bcryptjs** for user authentication / authorization