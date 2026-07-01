# ARCHITECTURE.md

## Project Structure

The project is organized by **technical layers** (`components`, `pages`, `redux`, `services`, `types`, `utils`).
Inside `components`, files are grouped by domain (`issues`, `common`).

For a single-domain task management system, this structure keeps the codebase simple and readable without adding the extra complexity of a full feature-based architecture.

The `services` layer is the only place responsible for API communication using Axios and json-server. Components and reducers never call Axios directly.

---

## State Management

Global state for issues (list, selected item, filters, sorting, pagination, and async states) is managed with **classic Redux** using:

* `createStore`
* `combineReducers`
* `applyMiddleware(thunk)`

Redux Toolkit was intentionally avoided because it was restricted by the task requirements.

### Structure

### `actionTypes.ts`

Contains string constants for action types.
This follows the traditional Redux pattern and helps avoid typo-related bugs.

### `actions/issuesActions.ts`

Contains:

* Simple action creators
* Async thunks for API requests

Each async flow follows the standard lifecycle:

`*_REQUEST → *_SUCCESS → *_FAILURE`

This pattern is used for:

* fetching issue list
* fetching single issue
* creating
* updating
* deleting

`AppThunk` is typed using `ThunkAction` to keep `dispatch` and `getState` fully type-safe.

### `reducers/issuesReducer.ts`

Uses a single reducer for the issue domain.

It keeps three separate async states:

* `listStatus`
* `detailStatus`
* `mutationStatus`

This prevents UI conflicts between loading the list and performing create/update/delete operations.

Filters, sorting, and pagination are also stored in Redux instead of local component state because they directly represent API query parameters and should persist when navigating back to the list page.

### Why Redux Thunk Was Kept

Redux here is not used as a full data cache.

Only the current page of data (default 10 items) is stored in `items`.

Whenever the user:

* opens the issue list page
* changes filters
* changes pagination

the app fetches fresh data from the API.

Redux only stores:

* current query state
* current page results

This allows the user to return to the list page and continue from the same state.

The detail page also fetches data separately by ID.

Using local React state was possible, but the task explicitly required global state management with Redux.

---

## API Layer

`services/issuesApi.ts` builds query parameters based on **json-server v1 beta**.

Used patterns:

* `_page` / `_per_page` for server-side pagination
* `_sort=-field` for descending sorting
* direct field filters (`status`, `priority`, `assignee`)

Search is implemented using:

* `title:contains`
* `description:contains`

inside `_where` conditions.

The reason for this is explained below.

json-server v1 returns paginated results as:

```ts
{
  data,
  items,
  pages
}
```

This response is normalized inside the service layer so the rest of the app only works with:

```ts
{
  issues,
  pagination
}
```

---

## Forms & Validation

Forms are built using `react-hook-form`.

Validation uses:

* `zod`
* a custom resolver (`utils/validation.ts`)

A shared schema is used for both create and edit forms.

Instead of building two separate forms, one reusable `IssueForm` component handles both cases.

This keeps validation logic and UI in one place.

---

## UI & Responsive Design

The UI is built with Material UI.

A custom theme is defined in `styles/theme.ts` with:

* custom palette
* custom typography
* RTL support

Issue list rendering:

* **Desktop:** table layout
* **Mobile (`sm` breakpoint):** stacked cards

This improves usability for touch devices.

SCSS Modules are only used for layouts that are harder to manage with MUI’s `sx` prop, such as the filter bar.

---

## UX Decisions

### Toast Notifications

Success and error messages for:

* create
* update
* delete

are shown using React Toastify.

This provides immediate feedback independent of page navigation.

### Debounced Search

Search input is connected to filter state using a `300ms` debounce (`useDebouncedValue`) to avoid sending a request on every keystroke.

### Overdue Indicator

Issues with a past due date and a status other than `Done` are highlighted with an error color.

---

## Additional Technical Decisions

### Custom Resolver Instead of `@hookform/resolvers/zod`

The installed resolver version was incompatible with Zod v4.

Instead of returning field errors, it threw a raw `ZodError`, so validation messages were not displayed.

Since package versions were locked in `package.json`, a lightweight custom resolver was implemented using `schema.safeParse`.

This maps errors directly into the format expected by react-hook-form.

---

### Explicit ID Generation

json-server v1 beta generates random string IDs if no `id` is provided during `POST`.

This caused inconsistency with existing numeric IDs in `db.json` and broke detail-page routing.

To solve this:

1. Fetch the highest existing ID
2. Generate the next numeric ID manually
3. Send it in the request body

---

### Search Strategy

The generic `q=` parameter is unreliable in newer json-server beta versions.

Instead, documented `:contains` operators are used inside `_where` for more reliable OR-based searching.

---

### Jalali Calendar

Adding new libraries was not allowed.

Because of that, Gregorian ↔ Jalali conversion was implemented manually in `utils/jalali.ts` using a mathematical conversion algorithm.

A custom date picker was built using MUI Popover.

Internal values are always stored as Gregorian ISO dates. Only the displayed format is Jalali.

---

### Centralized Persian Text

All UI labels, validation messages, and static Persian texts are stored in a single object inside `constants/text.ts`.

Assignee names remain in `services/issuesApi.ts` because they are considered data, not UI text.

---

### Type Separation

Every component or logic file with custom props or state keeps its types in a separate `.types.ts` file.

Examples:

* `IssueForm.tsx` → `IssueForm.types.ts`
* `issuesActions.ts` → `issuesActions.types.ts`

This keeps UI logic and type definitions separated for better maintainability.
