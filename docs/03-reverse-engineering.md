# Phase 3 – Reverse Engineering & Design Recovery (Legacy POS)

## 1. Purpose

## 2. High-Level Architecture (Legacy System)

## 2. High-Level Architecture (Legacy System)

The legacy POS follows a loose 3-layer structure with:

- A **Swing-based UI layer** for all screens.
- A **service/domain layer** that implements POS logic, employee and rental management.
- A **flat-file persistence layer** under `Database/` for all data.

![Legacy Architecture](diagrams/legacy-architecture.png)

## 3. Use Case Diagram & Description

## 3. Use Case Diagram & Description

![Legacy Use Cases](diagrams/legacy-usecases.png)

UC1: Login

Actors: Admin, Cashier
Summary: User enters username/password; system validates against employeeDatabase.txt via POSSystem.logIn and opens role-based UI; login event appended to employeeLogfile.txt.
UC2: Logout

Actors: Admin, Cashier
Summary: User logs out; POSSystem.logOut appends a logout record with timestamp to employeeLogfile.txt and returns to the login screen.
UC3: Manage Employees

Actor: Admin
Summary: Admin adds, updates, deletes employees via EmployeeManagement; employeeDatabase.txt is read/written using a rewrite buffer.
UC4: View Cashier UI

Actor: Admin
Summary: Admin opens the cashier workflow screen to initiate sales, rentals, and returns; preserves current session.
UC5: Add Employee

Actor: Admin
Summary: Admin creates a new employee record (Admin/Cashier) with first/last name and password; appended to employeeDatabase.txt.
UC6: Update Employee

Actor: Admin
Summary: Admin modifies position, name, or password; employeeDatabase.txt is rewritten via a temp file to persist changes.
UC7: Remove Employee

Actor: Admin
Summary: Admin deletes an employee by username; employeeDatabase.txt is rewritten without the removed record.
UC8: Start Sale

Actor: Cashier
Summary: Initiates sale flow; creates/uses temp.txt for in-progress cart state until finalized or canceled.
UC9: Add Item to Cart

Actor: Cashier
Summary: Adds item by ID and quantity; UI shows running totals; temp.txt updated with itemId amount pairs.
UC10: Remove Item from Cart

Actor: Cashier
Summary: Removes item/adjusts quantity; rewrites temp via newTemp.txt then replaces temp.txt.
UC11: Apply Coupon

Actor: Cashier
Summary: Applies discount code if found in couponNumber.txt; total adjusted accordingly.
UC12: Finalize Payment

Actor: Cashier
Summary: Completes payment (cash/electronic); triggers POS/POR/POH endPOS depending on operation; clears temp files.
UC13: Generate Sale Invoice

Actor: System (triggered by Cashier)
Summary: POS writes sale details to saleInvoiceRecord.txt (timestamp, per-item lines, total with tax).
UC14: Start Rental

Actor: Cashier
Summary: Initiates rental flow; prompts for phone; validates/creates user in userDatabase.txt; temp state maintained in temp.txt.
UC15: Create/Find Customer by Phone

Actor: Cashier
Summary: Checks userDatabase.txt for phone; creates a new record if missing; becomes the key for rental entries.
UC16: Record Rental Items

Actor: Cashier
Summary: Adds rental items by ID/qty from rentalDatabase.txt; inventory decremented accordingly.
UC17: Confirm Rental & Return Date

Actor: Cashier
Summary: On finalize, system appends entries itemId,MM/dd/yy,false to userDatabase.txt and shows return date in UI.
UC18: Start Return

Actor: Cashier
Summary: Initiates return flow; chooses between rented items return or unsatisfactory returns; temp state maintained.
UC19: Return Rented Items

Actor: Cashier
Summary: Returns rental items for a given phone; increments rentalDatabase.txt inventory; marks entries returned=true in userDatabase.txt.
UC20: Return Unsatisfactory Items

Actor: Cashier
Summary: Processes store-policy returns of non-rental items; increments itemDatabase.txt inventory.
UC21: Compute Fees/Late Charges

Actor: System (triggered by Cashier)
Summary: Calculates late fees based on days late and item price; fees shown in payment/confirmation screen.
UC22: Generate Return Log

Actor: System (triggered by Cashier)
Summary: Appends unsatisfactory return details to returnSale.txt (per-item lines, separators) upon finalize.

## 4. Class Diagrams

### Core POS / Transaction Subsystem

![Legacy POS Core](diagrams/legacy-pos-core.png)

This diagram shows:

- `PointOfSale` as an abstract base for `POS` (Sale), `POR` (Rental), `POH` (Return).
- `POSSystem` as the entry point for authentication and session logging, as well as temp transaction continuation.
- `Item` as the fundamental domain object for cart operations.

## 5. Design Observations & Code Smells

### 5.1 Strengths

Distinct transaction classes (POS, POR, POH) extend a shared workflow (PointOfSale), enabling reuse of cart, totals, and temp handling.
UI views are modular (Login, Admin, Cashier, Transaction, Payment), each encapsulating its own event handling and navigation.
Persistence is consistently located under Database/ with predictable file names (employees, users, items, rentals, logs, invoices, temp), simplifying inventory analysis and migration planning.
Inventory management uses a singleton (Inventory) with clear read/update flows, reducing duplicate file IO in transaction classes.

### 5.2 Weaknesses / Smells

#### a) Flat-File Persistence and String Parsing

Broad scattering of file IO across multiple classes; responsibilities overlap:
Employee DB read/write in EmployeeManagement; auth and logs in POSSystem; user rentals in Management; invoices/returns in POS/POH; temp handling in POS/POR/POH and PointOfSale.
Pervasive split(" ") parsing with positional assumptions:
Employee names forced into two tokens; malformed lines silently continue; item parsing trusts exact token order.
Mixed date formats and no validation (userDatabase uses MM/dd/yy, logs use yyyy-MM-dd HH:mm:ss.SSS).
Ad-hoc rewrite buffers (newEmployeeDatabase.txt, newTemp.txt) and file delete/rename patterns risk corruption on error.

#### b) God Classes / High Responsibility Classes

POSSystem owns authentication, employee list loading, login/logout logging, and temp transaction detection/restoration.
Management owns user phone lookup, user creation, rental append logic, rental return status updates, and late-fee date math.
PointOfSale mixes UI-adjacent concerns (coupon validation, tax prompt remnants) with persistence and business rules.

#### c) Tight Coupling Between UI and Services

UI directly controls service orchestration and persistence assumptions:
Admin and Cashier UIs reconstruct service instances and re-open views on each action.
Transaction and Payment UIs pass raw IDs/phones, select databases by filename, and branch on workflow strings (“Sale”, “Rental”, “Return”).
UI performs validation (e.g., phone digit/length checks) instead of centralizing it in a service layer.

#### d) Error Handling and Robustness

Exceptions frequently print to stdout and continue; inconsistent resource management and partial cleanups.
Temp recovery relies on reading a type header and optional phone line with weak validation; missing or extra lines can break flows.
Inventory updates assume presence and correctness of items; no safeguards for negative stock, duplicate IDs, or overflow.

#### e) Limited Test Coverage

Only a basic unit test exists for Employee getters.
No tests cover inventory updates, temp recovery, rentals/returns logic, fee calculation, or file rewrite safety.

#### f) Platform/Path Assumptions

OS detection code is commented or partial; path handling relies on hardcoded strings; Windows support is incomplete.

### 5.3 Opportunities for Improvement in MERN

#### Layered Architecture

Controllers: REST endpoints for auth, employees, inventory, sales, rentals, returns, logs.
Services: cohesive modules (authService, employeeService, inventoryService, salesService, rentalService, returnService, sessionLogService).
Data Access: Mongoose models with schemas for Employee, Item, User, RentalEntry, SaleInvoice, ReturnRecord, SessionLog, Coupon.
Domain Modeling and Validation

Explicit schemas with required fields, types, indexes, and constraints.
Centralized validation (e.g., phone formats, item existence, stock checks, rental flags, dates).
Replace positional file parsing with structured models and DTOs.
Workflow Decoupling

React/SPA communicates only via REST; no direct file IO or persistence logic in UI.
Use clear state machines for transaction flows (Sale/Rental/Return) with recoverable states stored in DB (e.g., TempTransaction collection).
Reliability and Observability

Transactional updates (e.g., decrement stock and write invoice atomically).
Standard logging and error handling middleware; structured logs instead of free-text lines.
Tests:
Unit tests for services (inventory adjustments, rental append/return flag updates, fee calculation).
API tests (Supertest) for end-to-end flows.
Seed and migration tests verifying legacy → DB transformation.
Data Migration

ETL scripts to parse legacy files with defensive rules:
Strict token parsing, fallback handling for malformed entries, audit logs.
Reconstruct entities:
Employees from employeeDatabase; Items from itemDatabase and rentalDatabase; Users and RentalEntries from userDatabase; Invoices/Returns from saleInvoiceRecord/returnSale; SessionLogs from employeeLogfile; Coupons from couponNumber.

## 6. Legacy → MERN Design Mapping (Refined)

### POSSystem

Node services: authService, sessionLogService, tempTransactionService
Collections: employees, sessionLogs, tempTransactions
Endpoints: POST /api/auth/login, POST /api/auth/logout, GET/POST /api/sessions, GET/POST /api/transactions/temp
PointOfSale, POS, POR, POH

Node: transactionService with Sale/Rental/Return handlers
Collections: items, rentals, sales, returns
Endpoints:
Sales: POST /api/transactions/sales
Rentals: POST /api/transactions/rentals
Returns: POST /api/transactions/returns
EmployeeManagement

Node: employeeService + Employee model
Collections: employees
Endpoints: GET/POST/PUT/DELETE /api/employees
Management

Node: customerService, rentalService + User, RentalEntry models
Collections: users, rentals
Endpoints: GET/POST /api/customers, PUT /api/rentals/status, GET /api/rentals/return-date
Database/\*.txt → MongoDB

Explicit schemas, indexes, validation
Mappings:
employeeDatabase.txt → employees
userDatabase.txt → users (phone) + rentals (itemId, date, returnedFlag)
itemDatabase.txt/rentalDatabase.txt → items (type: sale|rental, stock)
saleInvoiceRecord.txt → sales (line items, totals, timestamps)
returnSale.txt → returns (unsatisfactory)
employeeLogfile.txt → sessionLogs
temp.txt → tempTransactions (resumable state)
Backend structure (target)
Normalize to 3NF.

api/ (Express routes)
services/ (auth, employees, transactions, rentals, returns, sessions)
models/ (Employee, User, Item, RentalEntry, Sale, Return, SessionLog, TempTransaction)
tests/ (unit + API)
