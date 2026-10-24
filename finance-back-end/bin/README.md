# Finance Management Backend (Spring Boot)

A Java 17 / Spring Boot REST API for creating, reading, updating and deleting income/expense transactions.

## Requirements
- JDK 17
- MySQL 8.x (or a compatible MySQL server)
- Spring Tool Suite 4
- Postman

## 1. Create the database
Log into MySQL and run:

```sql
CREATE DATABASE finance_db;
```

Set the database username/password before starting the app. The defaults in `application.properties` are username `root` and password `change_me`. Prefer environment variables:
- Windows PowerShell: `$env:DB_USERNAME="root"; $env:DB_PASSWORD="your_actual_password"`
- Linux/macOS: `export DB_USERNAME=root; export DB_PASSWORD='your_actual_password'`

Do not commit real database passwords to Git.

## 2. Import into STS
1. Extract the ZIP.
2. Open STS.
3. Choose **File > Import > Maven > Existing Maven Projects**.
4. Select the extracted `finance-backend-ready` folder (the folder containing `pom.xml`).
5. Click **Finish**, then right-click project > **Maven > Update Project**.
6. Wait for dependencies to download.
7. Open `src/main/java/com/finance/FinanceBackendApplication.java`.
8. Right-click > **Run As > Spring Boot App**.

The console should show that the application started on port 8080. MySQL must be running and credentials must be correct.

## 3. Postman base URL
`http://localhost:8080/api/transactions`

For every JSON request, choose **Body > raw > JSON** and send `Content-Type: application/json`.

### Create a transaction
- Method: POST
- URL: `http://localhost:8080/api/transactions`
- Body:

```json
{
  "description": "Monthly salary",
  "amount": 50000.00,
  "type": "INCOME",
  "category": "Salary",
  "transactionDate": "2026-10-22"
}
```
Expected: `201 Created`, with the saved record and generated `id`.

### Get all transactions
- Method: GET
- URL: `http://localhost:8080/api/transactions`
- Expected: `200 OK` and a JSON array.

### Get one transaction
- Method: GET
- URL: `http://localhost:8080/api/transactions/1`
- Expected: `200 OK`; unknown IDs return `404 Not Found`.

### Update a transaction
- Method: PUT
- URL: `http://localhost:8080/api/transactions/1`
- Body (all fields required):

```json
{
  "description": "October salary",
  "amount": 52000.00,
  "type": "INCOME",
  "category": "Salary",
  "transactionDate": "2026-10-22"
}
```
Expected: `200 OK`.

### Delete a transaction
- Method: DELETE
- URL: `http://localhost:8080/api/transactions/1`
- Expected: `204 No Content`.

### Test validation
Send POST with amount `0` or omit `description`. Expected: `400 Bad Request` with field-level validation details.

## Request flow
Postman -> TransactionController -> TransactionService -> TransactionRepository -> MySQL
Response returns through the same layers to Postman.

## Important security note
`SecurityConfig` permits all requests so local Postman testing works without credentials. This is **not production security**. Before deployment, add authentication/authorization, restrict CORS if needed, use HTTPS, and move schema changes to database migrations.
