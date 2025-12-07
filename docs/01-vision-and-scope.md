# Phase 1 – Re-engineering Vision & Scope

## 1. Legacy System Summary

- Name: Point-of-Sale System (CSE216)
- Type: Desktop Java Swing-based application
- Persistence: Plain-text file databases in `Database/`
- Main features:
  - Employee login (cashier/admin) and session logging
  - Employee management (add/update/remove)
  - POS operations: Sale, Rental, Return
  - Transaction lifecycle: cart operations, temp files, invoices, return logs

## 2. Re-engineering Goal

- Re-implement the existing POS as a **web-based MERN application**.
- Replace flat-file persistence with a **database**.
- Preserve all existing features and behaviors (no new requirements).
- Improve architecture, testability, and maintainability.

## 3. Functional Scope (Unchanged)

- Authentication with cashier/admin roles.
- Employee management (add, update, delete).
- Sales:
  - Start sale, add/remove items, finalize sale, generate sale record.
- Rentals:
  - Start rental, set return date, track rentals, mark returns.
- Returns:
  - Handle rented items and unsatisfactory items.
- Transaction logging:
  - Session logs (login/logout)
  - Sale and return logs.

## 4. Non-functional Objectives (Improvements)

- Web-based access via browser.
- REST API with clear separation of concerns (frontend vs backend).
- Use database instead of plain-text files.
- Use automated tests to validate behavior (equivalent to legacy tests).
- Keep GUI simple and elegant (no flashy extra features).

## 5. Constraints

- Requirements **must not change**.
- No new major features beyond what exists.
- Must pass the **legacy behavioral tests** (reinterpreted in the MERN stack).
- Simple, clean UI suitable for CSE216 context.
- Use MERN stack: Node.js + Express + MongoDB + React.

## 6. Deliverables (High Level)

- Complete set of documentation:
  - Legacy analysis (inventory, reverse engineering)
  - Refactoring & restructuring decisions
  - Data model transformation (files → DB)
  - New architecture & implementation details
  - Migration and testing strategy
- Fully working MERN POS app matching legacy behavior.

## 7. Technology Stack (Target System)

- Frontend:
  - React (TypeScript optional; JS acceptable)
  - React Router for navigation
- Backend:
  - Node.js (LTS)
  - Express.js
- Database:
  - MongoDB (with Mongoose ODM)
- Testing:
  - Backend: Jest + Supertest
  - Frontend: Jest + React Testing Library (optional but recommended)
- Tooling:
  - Git + GitHub/GitLab
  - VS Code / WebStorm / IntelliJ for MERN
  - Postman / Thunder Client for API testing
  - draw.io / diagrams.net for diagrams

## 8. Target Architecture Overview

- Client (React)

  - Presents Admin and Cashier views.
  - Communicates with backend via RESTful JSON APIs.

- Server (Node + Express)

  - Routes: `/auth`, `/employees`, `/items`, `/transactions`, `/rentals`, `/returns`, `/logs`, etc.
  - Layers:
    - Controller layer: Express route handlers.
    - Service layer: business logic mirroring Java classes like `POSSystem`, `POS`, `POR`, `POH`, `EmployeeManagement`, `Management`.
    - Data access layer (DAL): Mongoose models & queries for collections.

- Database (MongoDB)
  - Collections that correspond to legacy file concepts:
    - `employees` (from `employeeDatabase.txt`)
    - `items` (from `itemDatabase.txt`)
    - `rentals` / `users` (from `rentalDatabase.txt`, `userDatabase.txt`)
    - `sessions` (from `employeeLogfile.txt`)
    - `sales` (from `saleInvoiceRecord.txt`)
    - `returns` (from `returnSale.txt`)

## 9. Legacy → MERN Mapping (High Level)

- `Register` (Java main class)
  → React app entry (`App.jsx`) + Express server entry (`server.js`)

- `Login_Interface`
  → React `LoginPage` component + `/auth/login` endpoint

- `Admin_Interface`
  → React `AdminDashboard` + endpoints under `/employees`, `/logs`

- `Cashier_Interface`
  → React `CashierDashboard` + endpoints under `/transactions`, `/items`

- `Transaction_Interface`
  → React `TransactionPage` + `/transactions` API (create, update, finalize)

- `Payment_Interface`
  → React `PaymentPage` + backend logic to compute totals and finalize sale/rental

- `POSSystem`
  → Node service modules: `posSystemService.js`

  - Handles login/logout, session logs, temp restoration, etc.

- `PointOfSale`, `POS`, `POR`, `POH`
  → Node service modules: `pointOfSaleService.js`, `saleService.js`, `rentalService.js`, `returnService.js`

- `EmployeeManagement`
  → Node `employeeService.js` + `Employee` Mongoose model

- `Management`
  → Node `rentalManagementService.js` + `User` / `Rental` Mongoose models

- Flat files in `Database/`
  → MongoDB collections specified above.

## 10. Repository Layout

- `legacy-pos-java/` – Original Java Swing POS with flat-file persistence.
- `mern-pos/backend/` – Node.js + Express REST API.
- `mern-pos/frontend/` – React-based web UI.
- `docs/` – Project documentation (per phase).
