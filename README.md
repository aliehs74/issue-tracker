# Task Management System

A frontend technical assignment implementation — a simple Issue Tracker built with React, TypeScript, Redux (without Redux Toolkit), React Router, Material UI, and SCSS, powered by a mock API using json-server.

---

## Tech Stack

* **React 19** + **TypeScript** (strict mode, no `any`)
* **Classic Redux** (`createStore` + `applyMiddleware`) with `redux-thunk` for async operations
* **React Router v7**
* **Material UI v7**
* **SCSS Modules** for custom styling alongside MUI
* **react-hook-form** + **zod** for forms and validation (with a custom resolver — explained in `ARCHITECTURE.md`)
* **Axios** for API communication
* **React Toastify** for create/update/delete notifications
* Custom **Jalali calendar & date picker** (built without third-party date libraries)

---

## Requirements

* Node.js `18+`

---

## Installation & Running

```bash
# install dependencies
npm install

# start mock API (port 3001)
npm run server

# start development server (port 3000)
npm run dev
```

Then open:

```text id="e3g1t8"
http://localhost:3000
```

in your browser.

---

## Environment Variables

API base URL is loaded from `.env`:

```env id="7kc9n2"
VITE_API_BASE_URL="http://localhost:3001"
```

Update it if your json-server runs on another port.

---

## Available Scripts

```bash
npm run build     # type-check + production build
npm run preview   # preview production build
npm run lint      # run ESLint
```

---

## Project Structure

```text id="3jp4w1"
src/
  components/
    common/         reusable shared components
    issues/         issue-related components
  hooks/            reusable hooks
  pages/            route-level pages
  redux/
    actions/        actions + thunks
    reducers/       reducers + state types
    actionTypes.ts  action constants
    store.ts        Redux store setup
  services/         API layer
  styles/           MUI theme + global styles
  types/            shared domain types
  utils/            helper functions
  constants/        centralized UI text
```

### Structure Notes

* Shared UI components are inside `common`
* Domain-specific components are inside `issues`
* API calls are isolated in `services`
* Utility logic is kept in `utils`
* Type definitions are separated into `.types.ts` files beside their related files

Example:

```text id="5mx2k7"
IssueForm.tsx
IssueForm.types.ts
```

For more details about architectural decisions, check `ARCHITECTURE.md`.

---

## Implemented Features

### Issue List

* Search by title and description
* `300ms` debounced search input
* Filter by:

  * status
  * priority
  * assignee
* Sort by:

  * created date
  * due date
* Server-side pagination using json-server

---

### Responsive UI

Issue list has two layouts:

* **Desktop:** table view
* **Mobile:** card view

This improves usability across devices.

---

### Loading States

Includes:

* Skeleton loading for list
* Empty state
* Error state

Skeleton layout matches the real table size to prevent layout shifting.

---

### Issue Details

Displays:

* assignee
* due date
* created date
* issue status
* issue priority

with clear visual structure.

---

### Create & Edit Issue

Reusable form component with:

* field validation
* error messages
* shared create/edit logic

Built using:

* `react-hook-form`
* `zod`

---

### Jalali Date Picker

A custom Jalali date picker is used for selecting due dates.

Behavior:

* default value for new issues = today
* selected Jalali date converts to Gregorian ISO before saving

---

### Delete Confirmation

Issue deletion requires confirmation before removing data.

---

### Toast Notifications

Shows success/error feedback for:

* create
* update
* delete

using React Toastify.

---

### Overdue Highlighting

Issues with expired due dates and unfinished status are visually highlighted.

---

### Persistent Mock Data

All CRUD operations are performed on `db.json` through json-server.

Data remains after page refresh.
