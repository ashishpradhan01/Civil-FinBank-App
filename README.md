# Civil-FinLoan App

Civil Finloan is an application for Finance Management. This application lets the user view the details of various loan types, apply for an enquiry, calculate the interest amount for the specific loan and make a request on money remittance.

<img src="https://github.com/ashishpradhan01/RiseNews-MVVM-App/blob/adding_country_chips/Light_App_Icon.png?raw=true" alt="Raise News Application" width="220" height="250">

## SpringBoot API's

### Role Base Access - ADMIN, USER

### Authentication (URLs are allowed for anyone):

#### Base Endpoints : `/api/v1/auth`

#### Register, Login & Update user profile:

```http
  POST /register
  POST /login
  POST /update
```

### Service

#### Base Endpoints : `/api/v1/services`

```http
 GET / [Get all services](Allowed)
 GET /{id} [Get a service by id])(Only Login user)
 POST / [Create a service](Only Admin)
 POST /{id}/detail [Create detail for a service](Only Admin)
```

### Members

#### Base Endpoints : `/api/v1/members`

```http
 GET /{id} [Get a user]
 PUT /{id} [Update a user])
```
