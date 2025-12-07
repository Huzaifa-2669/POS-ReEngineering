# Phase 5 – Forward Engineering Notes

## Backend

- Implemented MongoDB models with timestamps and indexes: employees, items, customers, rentals, sales, returns, sessionLogs, tempTransactions.
- Services added for auth (bcryptjs hashing + simple token), employees, items (stock adjust), customers (phone-normalized lookup), rentals (create/return with late-fee math), transactions (sale/rental/return orchestration), sale listing, and session logs.
- Controllers and routes exposed under `/api`: `/auth`, `/employees`, `/items`, `/customers`, `/transactions` (sale/rental/return), `/logs` (sessions, sales).
- Configuration: `MONGO_URI` and optional `PORT` via `.env`; server boots after DB connects. Default tax rate for sales: 7%.
- Seed scripts: `npm run seed:test-users` (test admin/cashier) and `npm run seed:sample` (test users, items, customers).

## Frontend

- API client (`frontend/src/api/client.js`) wraps REST calls with a base URL of `REACT_APP_API_URL` or `http://localhost:5000/api` in development.
- React screens implemented with functional components + hooks:
  - `LoginPage` → auth flow.
  - `AdminDashboard` → employee CRUD + session log viewer, link to cashier view.
  - `CashierDashboard` → start sale/rental/return.
  - `TransactionPage` → cart builder, customer/return details.
  - `PaymentPage` → summary and final API submission.
- Simple styling in `App.css`; navigation managed in `App.js` without React Router for this phase.

## Testing

- Jest configured (backend) with mongodb-memory-server.
- Coverage now includes multiple models (Employee, Item, Customer, Rental), services (employee.service, transaction.service), and routes (/api/auth/login, /api/items via Supertest).

## Notes / Deviations

- Session token is a lightweight random string; no persistent session store yet.
- Late fees follow legacy rule: price × qty × 0.1 × days late.
- Unsatisfactory returns are limited to sale-kind items; rental returns require a customer phone.
