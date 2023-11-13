## API Reference

## URL

_Server_

```
http://localhost:3000
```

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## RESTful endpoints

### POST /create/employee/:subType

> Create employee or project

_Request Header_

```
not needed
```

_Request Body_

### New Employee

```
{
    "name": "<string>",
    "salary": <number>,
    "married": <boolean>,
    "divisi": "<string>",
    "status": "<string>"
}
```

_Response (200)_

```
{
    "data": [<data_employee>],
    "status": "Success"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" is required"
}
```

### New Project

```
{
    "name": "<string>",
    "deadline": "<string>",
    "clientName": "<string>",
    "project": "<string>",
    "status": "<string>"
}
```

_Response (200)_

```
{
    "data": [<data_project>],
    "status": "Success"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" is required"
}
```

### POST /create/companyList

> Create Company

_Request Header_

```
not needed
```

_Request Body_

#### New Company

```
{
    "name": "<string>",
    "description": "<string>"
}
```

_Response (200)_

```
{
    "data": [<data_company>],
    "status": "Success"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"description\" is required"
}
```

### GET /all/:type

#### Employee list

```http
    GET /all/employee/divisi
```

#### Project List

```http
    GET /all/employee/projectList
```

#### Get List Detail by employee name

```http
    GET /all/employee/:subType/:name
```

#### Get List Employee Subtype by Status

```http
    GET /all/employee/:subType/status/:status
```

#### Get List Company

```http
    GET /all/companyList
```

### PUT /edit/employee/:subType/:name

> Update by name

_Request Params_

```
/employee/<sub_type>/<company_or_employee_name>
```

_Request Header_

```
not needed
```

_Request Body Employee_

```
{
    "name": "<string>",
    "salary": <number>,
    "married": <boolean>,
    "divisi": "<string>",
    "status": "<string>"
}
```

_Request Body Project_

```
{
    "name": "<string>",
    "deadline": "<string>",
    "clientName": "<string>",
    "project": "<string>",
    "status": "<string>"
}
```

_Response (200)_

```
{
    "data": [
        <employee_or_project_list>
    ],
    "message": "Success"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Data Not Found"
}
```

### DELETE /all/employee/:subType/:name

> Delete by project or employee name

_Request Params_

```
/<type_name>/<sub_type>/<name>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<sub_type_list>],
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Data Not Found"
}
```

---

### DELETE /all/companyList/:name

> Delete by company name

_Request Params_

```
/<name>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<company_list>],
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Data Not Found"
}
```

---
