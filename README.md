# Meetus Task

## Goals

Implement a login form in Next.js following the provided Figma design and back-end API.

- After login, users access a dashboard with a logout option.

## Normal Scenario

1. User opens [http://localhost:3000](http://localhost:3000).
2. System checks for saved authentication and token expiration.
3. If not authenticated, displays login form:
   - **Fields:**
     - E-Mail (string)
     - Password (string)
   - **Actions:**
     - Login button (disabled if fields are empty or email is invalid)
4. User enters credentials and clicks Login:
   - E-Mail: `dev.aert@gmail.com`
   - Password: `helloworld`
5. System calls login API:
   - **URL:** `https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token`
   - **Method:** POST
   - **Headers:** `Content-Type: application/json`
   - **Body:**
     ```json
     {
       "email": "<E-Mail>",
       "password": "<Password>",
       "isEmployee": true
     }
     ```
   - **Response:**
     ```json
     {
     	 "token": "...",
     	 "refresh": "...",
     	 ...
     }
     ```
6. System stores the token in an HTTP Only Cookie.
7. System calls user info API:
   - **URL:** `https://api-yeshtery.dev.meetusvr.com/v1/user/info`
   - **Method:** GET
   - **Headers:**
     - `Content-Type: application/json`
     - `Authorization: Bearer <Saved Token Value>`
   - **Body:**
     ```json
     {
       "email": "<E-Mail>",
       "password": "<Password>",
       "isEmployee": true
     }
     ```
   - **On success:** Stores user ID and name.
   - **On failure:** Returns to login form.
8. Dashboard displays:
   - **Data:**
     - ID (from user info)
     - Name (from user info)
   - **Actions:**
     - Logout button
9. On logout, user is logged out and returned to login form.

## Exceptional Scenarios

- Invalid email or empty password:
  - Show validation errors.
  - Clear errors on field change.

## Non-Goals

- No need for JWT/Refresh token handling (401 handled by backend).
- No need for dashboard design beyond a simple layout.

## Evaluation Criteria

- Figma to HTML/CSS conversion
- Next.js code organization
- Proper authentication token saving and expiration handling
- Git usage
- Adherence to requirements
