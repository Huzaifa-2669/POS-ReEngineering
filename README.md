# MERN POS – Re-engineering Overview

This project re-engineers the legacy Java Swing POS (flat-file storage) into a MERN stack web app. The target scope is identical to the legacy system—no new features beyond necessary modern equivalents (e.g., password hashing).

## Requirements (User/Business)
- Preserve legacy workflows:
  - Authentication (admin, cashier) with login/logout session logging.
  - Employee management (add/update/delete).
  - POS operations: Sale, Rental, Return (including rental returns and unsatisfactory returns).
  - Transaction and session logs.
- Web-based MERN architecture:
  - Backend: Node.js + Express + MongoDB (Mongoose).
  - Frontend: React with simple, functional UI (hooks, no complex styling).
- Data model: Mongo collections for employees, items, customers, rentals, sales, returns, session logs, temp transactions.
- Error handling: 400 for bad input, 401/403 for auth issues, 500 for unexpected errors.
- Testing: Jest (and Supertest) with minimal coverage for models, services, and routes.
- Configuration: `.env` with `MONGO_URI`, optional `PORT` (default 5000).

## Deliverables Implemented (Re-engineering Tasks)
- Backend
  - Mongoose models for employees, items, customers, rentals, sales, returns, session logs, temp transactions.
  - Services for auth (bcrypt hashing + token), employees, items, customers, rentals (late-fee logic), transactions (sale/rental/return), session logs, sales listing.
  - Controllers and routes under `/api`: auth, employees, items, customers, transactions (sale/rental/return), logs (sessions, sales). Health checks at `/health` and `/api/health`.
- Frontend
  - API client with dev default `http://localhost:5000/api` (override via `REACT_APP_API_URL`).
  - React screens: LoginPage, AdminDashboard (employee CRUD, session logs, sales list), CashierDashboard, TransactionPage (sale/rental/return cart), PaymentPage (finalize via APIs).
  - Basic styling in `App.css`; stateful navigation in `App.js`.
- Testing
  - Jest + Supertest covering multiple models (Employee, Item, Customer, Rental), services (employee, transaction), and routes (/api/auth/login, /api/items).
- Documentation
  - Forward engineering summary in `docs/05-forward-engineering.md`; change log updated in `docs/08-change-log.md`.

## Quick Start
1) Backend
   - Set `mern-pos/backend/.env`: `MONGO_URI=mongodb://127.0.0.1:27017/mern-pos` and optional `PORT`.
   - Install deps: `npm install`
   - Run: `npm run dev` (health: `http://localhost:5000/health`)
2) Frontend
   - Set `REACT_APP_API_URL` if backend not on default.
   - Install deps: `npm install`
   - Run: `npm start`

## Legacy Mapping (High Level)
- Admin Dashboard ↔ employee management and session/sales logs.
- Cashier Dashboard ↔ sale, rental, return flows.
- Legacy files → Mongo collections: employeeDatabase → employees; item/rental databases → items; userDatabase → customers/rentals; saleInvoiceRecord → sales; returnSale → returns; employeeLogfile → sessionLogs; temp.txt → tempTransactions.
