#Authorization Express Api

##Public routes:

> POST **/api/v1/login**
  - Request:
    - BODY:
      - username
		  - password
  - Response:
    - Status:
    
>      400 - Bad Request
        Params may be missing        
      401 - Unauthorized
        User isn't valid      
      200 - Success
        Valid request
         - Body:
          - token
          - user
          - date

---

> POST **/api/v1/signup**
  - Request:
    - BODY:
      - username
		  - password
      - email
  - Response:
    - Status:
    
>      400 - Bad Request
        Params may be missing        
      409 - Conflict
        User may already exists on the system
      200 - Success
        Valid request
         - Body:
          - DB Object
