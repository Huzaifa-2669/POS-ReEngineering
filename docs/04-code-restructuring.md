# Phase 4 – Code & Data Restructuring Plan

## 1. Purpose

## 2. Domain Model (Conceptual Entities)

### Employee

Fields: username, position (Admin|Cashier), firstName, lastName, password
Responsibilities: authentication, role-based UI routing
Persisted in: employeeDatabase.txt
Manipulated by: POSSystem, EmployeeManagement

### Item

Fields: itemId, itemName, price, amount (stock), type (sale|rental)
Responsibilities: inventory for sales and rentals
Persisted in: itemDatabase.txt (sale), rentalDatabase.txt (rental)
Manipulated by: PointOfSale, POS, POR, POH, Inventory

### User (Customer)

Fields: phoneNumber, rentals[]
Responsibilities: identity for rentals/returns
Persisted in: userDatabase.txt
Manipulated by: Management (check/create/update)

### RentalEntry

Fields: itemId, rentalDate (MM/dd/yy), returnedFlag (boolean)
Responsibilities: track per-item rental state and due/return dates
Persisted in: userDatabase.txt (embedded per user)
Manipulated by: Management, POR, POH

### SaleInvoice

Fields: timestamp, lineItems[itemId, name, qty, extendedPrice], totalWithTax
Responsibilities: sale summary
Persisted in: saleInvoiceRecord.txt
Manipulated by: POS

### ReturnRecord

Fields: lineItems[itemId, name, qty, extendedPrice], timestamp
Responsibilities: unsatisfactory return summary
Persisted in: returnSale.txt
Manipulated by: POH

### SessionLog

Fields: employeeName, username, position, action (login|logout), timestamp
Responsibilities: audit trail for sessions
Persisted in: employeeLogfile.txt
Manipulated by: POSSystem

### TempTransaction

Fields: operationType (Sale|Rental|Return), phoneNumber?, cart[itemId→qty]
Responsibilities: resume/restore in-progress transactions
Persisted in: temp.txt (and newTemp.txt during edits)
Manipulated by: PointOfSale, POSSystem, POS/POR/POH

### Relationships

Employee 1 — uses → SessionLog*
Cashier/Admin — perform → SaleInvoice*, ReturnRecord*
User 1 — has → RentalEntry*
PointOfSale — uses → Item\*
POR/POH — update → RentalEntry, Item
POS — creates → SaleInvoice
POH — creates → ReturnRecord
POSSystem — manages → SessionLog, TempTransaction

## 3. MongoDB Schema Design

### 3.1 Collections and Fields

3.1 Collections and Fields
We will use the following collections:

employees
items
customers
rentals
sales
returns
sessionLogs
tempTransactions
General notes:

All documents include createdAt and updatedAt (managed by application or ODM).
IDs are ObjectId. Cross-collection relationships use ObjectId references.
Text and numeric fields are validated via schema constraints; enums used where applicable.
employees
Source: employeeDatabase.txt
Purpose: Store login accounts and roles.
Field Type Notes
\_id ObjectId
username string Unique, indexed
position string enum: ['admin','cashier']
firstName string
lastName string
passwordHash string Hashed (e.g., bcrypt)
createdAt Date
updatedAt Date
Indexes:

username: unique
items
Source: itemDatabase.txt, rentalDatabase.txt
Purpose: Master catalog for sale and rental items.
Field Type Notes
\_id ObjectId
legacyItemId number Original flat-file ID (unique, indexed)
name string
kind string enum: ['sale','rental']
unitPrice number
stock number Non-negative
isActive boolean Soft-delete flag
createdAt Date
updatedAt Date
Indexes:

legacyItemId: unique
kind: compound queries by type
customers
Source: userDatabase.txt
Purpose: Customer registry keyed by phone number.
Field Type Notes
\_id ObjectId
phone string Unique, indexed (E.164 or 10-digit)
name string Optional (legacy lacks name)
isActive boolean
createdAt Date
updatedAt Date
Indexes:

phone: unique
rentals
Source: userDatabase.txt (entries per customer), rental workflows
Purpose: Track item rentals per customer.
Field Type Notes
\_id ObjectId
customerId ObjectId ref: customers
itemId ObjectId ref: items (kind='rental')
quantity number
rentedAt Date From transaction time
dueDate Date Derived policy or UI-return date
returned boolean
returnedAt Date Nullable
cashierId ObjectId ref: employees
notes string Optional
createdAt Date
updatedAt Date
Indexes:

customerId
itemId
returned (for outstanding queries)
sales
Source: saleInvoiceRecord.txt
Purpose: Persist sale transactions and line items.
Field Type Notes
\_id ObjectId
cashierId ObjectId ref: employees
items [Subdoc] [{ itemId: ObjectId, quantity: number, unitPrice: number, lineTotal: number }]
subtotal number Sum of lineTotals
taxAmount number Computed per policy
totalAmount number subtotal + tax
createdAt Date Sale timestamp
updatedAt Date
Indexes:

cashierId
createdAt (time-range reports)
returns
Source: returnSale.txt (unsatisfactory returns) and rental returns (fees)
Purpose: Persist return transactions (unsatisfactory and rental).
Field Type Notes
\_id ObjectId
type string enum: ['unsatisfactory','rental']
cashierId ObjectId ref: employees
customerId ObjectId ref: customers (nullable for unsatisfactory)
items [Subdoc] [{ itemId: ObjectId, quantity: number, unitPrice: number, lineTotal: number }]
feeAmount number For rental returns (late fees), else 0
createdAt Date
updatedAt Date
Indexes:

type
customerId
createdAt
sessionLogs
Source: employeeLogfile.txt
Purpose: Audit login/logout events.
Field Type Notes
\_id ObjectId
employeeId ObjectId ref: employees
action string enum: ['login','logout']
timestamp Date
message string Optional full text
createdAt Date
Indexes:

employeeId
action
timestamp
tempTransactions
Source: temp.txt (and newTemp.txt)
Purpose: Persist in-progress transactions for recovery.
Field Type Notes
\_id ObjectId
type string enum: ['sale','rental','return']
cashierId ObjectId ref: employees
customerId ObjectId ref: customers (nullable for sale/unsatisfactory)
items [Subdoc] [{ itemId: ObjectId, quantity: number }]
context object Arbitrary metadata (e.g., return subtype, coupon)
expiresAt Date Optional TTL for cleanup
createdAt Date
updatedAt Date

### 3.2 Relationships and Indexes

Indexes:

cashierId
customerId
type
expiresAt (TTL index recommended)
Relationship overview:

sales.items[].itemId → items.\_id
rentals.itemId → items.\_id; rentals.customerId → customers.\_id; rentals.cashierId → employees.\_id
returns.customerId → customers.\_id (nullable); returns.items[].itemId → items.\_id
sessionLogs.employeeId → employees.\_id
tempTransactions.cashierId → employees.\_id; tempTransactions.customerId → customers.\_id
Validation and constraints:

Enforce numeric domains (quantity ≥ 1, stock ≥ 0, prices ≥ 0).
Enforce enums for type/position.
Use unique indexes for username (employees) and phone (customers).
Consider compound indexes for analytics (e.g., createdAt + cashierId).

## 4. Legacy Data Files → MongoDB Collections Mapping

4. Legacy Files → Mongo Collections Mapping
   Legacy File New Mongo Collection Purpose Key Transformations
   employeeDatabase.txt employees Employee accounts and roles Split tokens into structured fields; hash passwords; enforce unique username; normalize position to enum
   itemDatabase.txt items Sale inventory catalog Map itemId→legacyItemId; parse name/price/stock; add kind='sale'; add isActive flag
   rentalDatabase.txt items Rental inventory catalog Map itemId→legacyItemId; parse name/price/stock; set kind='rental'; add isActive flag
   userDatabase.txt customers, rentals Customer phones and rental entries Split header and lines; create customers by phone; expand rental triplets into rentals docs with returned flags and dates
   saleInvoiceRecord.txt sales Historical sale transactions Group blocks by timestamp; parse item lines; compute subtotal/tax/total; attach cashierId if available
   returnSale.txt returns Unsatisfactory return transactions Group blocks between blank separators; parse item lines; label type='unsatisfactory'
   employeeLogfile.txt sessionLogs Login/logout audit trail Parse free-text into structured fields (employeeId, action, timestamp, message)
   couponNumber.txt coupons (optional) Valid coupon codes One code per doc; add metadata (active, createdAt)
   Database/temp.txt tempTransactions In-progress transaction state Read type header and optional phone; itemId/qty pairs → items subdocs; add TTL index for cleanup
   Database/newEmployeeDatabase.txt n/a (ETL input) Rewrite buffer during employee updates Ignore post-migration; only used for legacy rewrite safety
   Database/newTemp.txt n/a (ETL input) Rewrite buffer during temp edits Ignore post-migration; only used for legacy rewrite safety

## 5. Legacy Classes → MERN Backend Structure

### 5.1 Node Services

We will introduce the following service modules in `mern-pos/backend/src/services`:

- `authService.js`

  - Login, logout, JWT/session management (if used).
  - Uses `employees` and `sessionLogs` collections.

- `employeeService.js`

  - CRUD operations on employees.
  - Mirrors `EmployeeManagement` behavior.

- `itemService.js`

  - CRUD and lookup operations for items.
  - Mirrors how items are used in POS/POR/POH.

- `transactionService.js`

  - High-level orchestration of Sale/Rental/Return.
  - Uses `items`, `customers`, `rentals`, `sales`, `returns`, `tempTransactions`.

- `rentalService.js`

  - Specific rental logic (create rental, check due date, mark returned).
  - Mirrors `Management` + `POR` behavior.

- `customerService.js`

  - Customer/user lookup and creation.
  - Mirrors `Management.checkUser` and `createUser`.

- `sessionLogService.js`
  - Writes login/logout logs.
  - Mirrors `POSSystem.logInToFile` and `logOut`.

### 5.2 Express Controllers / Routes

Planned routes (under `/api`):

- `/auth`

  - `POST /login`
  - `POST /logout`

- `/employees`

  - `GET /`
  - `POST /`
  - `PUT /:id`
  - `DELETE /:id`

- `/items`

  - `GET /`
  - `POST /`
  - `PUT /:id`
  - `DELETE /:id`

- `/customers`

  - `GET /:phone`
  - `POST /` (create new customer)

- `/transactions`

  - `POST /sale` – mirrors `POS` flow
  - `POST /rental` – mirrors `POR` flow
  - `POST /return` – mirrors `POH` flow

- `/logs`
  - `GET /sessions` – view session logs (admin)

### 5.3 React Screens Mapping

- `LoginPage`

  - Uses `/api/auth/login`, `/api/auth/logout`.

- `AdminDashboard`

  - Uses `/api/employees`, `/api/logs/sessions`.

- `CashierDashboard`

  - Navigates to `TransactionPage` for Sale/Rental/Return.

- `TransactionPage`

  - Uses `/api/items` to list/add items.
  - Calls `/api/transactions/sale`, `/api/transactions/rental`, `/api/transactions/return`.

- `PaymentPage`
  - Shows final totals; completes the transaction by calling the appropriate endpoint.

## 6. Refactoring Plan (Design-Level)

### 6.1 Problems in Legacy Design

#### God classes (POSSystem, Management)

Centralize multiple responsibilities (authentication, logging, temp recovery, customer lookup, rental logic, date math), increasing coupling and reducing cohesion.

#### Flat-file persistence and brittle parsing

Space-delimited records with positional assumptions; ad-hoc rewrite buffers; no schema enforcement; inconsistent date formats; high risk of data corruption.

#### Tight UI ↔ service coupling

Swing interfaces directly invoke service logic and persistence with file-format awareness; weak separation of concerns; hard to test and evolve.

#### Weak test coverage

Minimal unit tests (e.g., Employee getters); no coverage for transaction flows, inventory consistency, rental/return rules, or error paths.

### 6.2 How MERN Architecture Fixes Them

**Flattened responsibilities → layered services**

- Decompose POSSystem into authService, sessionLogService, tempTransactionService.
- Decompose Management into customerService, rentalService.
- Result: higher cohesion, lower coupling, clearer ownership.

**Flat files → structured MongoDB**

- Replace text files with Mongoose collections (employees, items, customers, rentals, sales, returns, sessionLogs, tempTransactions).
- Enforce schemas, enums, unique indexes; eliminate brittle parsing.

**UI coupling → REST API**

- React → Express controllers → services → Mongoose → MongoDB.
- Decouples presentation from persistence; enables reusable services.

**Stronger testability**

- Unit tests (Jest) isolate services; integration tests (Supertest) verify end-to-end workflows.
- Structured logging and error-handling improve observability.

## Data Migration Strategy

### Scope and sources:

Migrate legacy flat files in employeeDatabase.txt, itemDatabase.txt, rentalDatabase.txt, userDatabase.txt, saleInvoiceRecord.txt, returnSale.txt, employeeLogfile.txt, couponNumber.txt, Database/temp.txt into MongoDB collections defined in the schema design.

### ETL approach:

Write idempotent Node.js ETL scripts that parse space-delimited lines and transform them into validated DTOs for collections (employees, items, customers, rentals, sales, returns, sessionLogs, tempTransactions).
Normalize fields (e.g., item names, dates) and enforce constraints (unique username/phone; non-negative stock; enums for types).

### Key transformations:

Hash legacy passwords from employees using bcrypt; map positions to ['admin','cashier'].
Split item catalogs into unified items with kind='sale' or 'rental' using legacy IDs from itemDatabase.txt and rentalDatabase.txt.
Expand userDatabase.txt rental triplets (itemId, MM/dd/yy, flag) into rentals documents linked by customerId and itemId; create customers per phone.
Parse sales from saleInvoiceRecord.txt blocks (timestamp, item lines, total) and returns from returnSale.txt with type='unsatisfactory'; derive totals consistently.
Convert session logs in employeeLogfile.txt to structured sessionLogs with action and timestamp.

### Safety and verification:

Operate on copies; keep raw backups.
Log skipped/malformed lines; produce a migration report with counts per file and per collection.
Run post-migration consistency checks (e.g., item stock ≥ 0; references resolvable).

### Rollback plan:

Use transactional bulk writes where possible; otherwise, stage data in temp collections and promote upon verification.

## Implementation Roadmap for Next Phase

### Backend scaffolding (Express + Mongoose):

Initialize Node.js project and define models for employees, items, customers, rentals, sales, returns, sessionLogs, tempTransactions.
Implement services: authService, sessionLogService, inventoryService, salesService, rentalService, returnService, customerService.
ETL scripts:
Build parsers for each legacy file; implement validators and transformation functions; seed Mongo with sample subsets first.
API endpoints:
Auth: POST /auth/login; logs: GET /logs/session
Employees: CRUD routes replacing EmployeeManagement
Inventory: GET/PUT for stock; unify sale/rental catalogs (maps Inventory.updateInventory)
Transactions: POST /sales, POST /rentals, POST /returns; temp recovery: GET/POST /tempTransactions
Frontend stubs:
Minimal React views mirroring legacy flows (Login, Admin, Cashier, Transaction, Payment) without direct file IO.
Testing:
Jest unit tests for services; Supertest integration tests for core routes; fixtures derived from small slices of Database/\*.txt.
DevOps:
Add environment config (.env), Docker Compose for Mongo, and seed scripts; set up linting and CI to run tests and ETL dry-runs.
Migration dry-run:
Execute ETL on a copy of Database/, validate counts and indexes, and reconcile sample flows against legacy outputs from POS.endPOS and POH.endPOS.
Documentation updates:
Record mapping decisions and edge cases in Documentation/, and update TASKS with progress checkpoints.
