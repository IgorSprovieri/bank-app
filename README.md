# Bank App

It's a simple bank web app using mock data with json server.

## Stack

- React
- TypeScript
- Vite
- Tailwind
- CVA
- shadcn/ui
- Radix
- React Router
- React Query
- Zustand
- React Hook Form
- Zod
- Axios
- Vitest

## Running locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables (optional)**

   To set the API URL explicitly, copy the example and edit:

   ```bash
   cp .env.example .env
   ```

   In `.env`, for example:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   If you skip `.env`, the app defaults to `http://localhost:3000`.

3. **Start the mock backend (json-server)**

   In one terminal:

   ```bash
   npm run server
   ```

   The API runs at `http://localhost:3000`.

4. **Start the frontend (Vite)**

   In another terminal:

   ```bash
   npm run dev
   ```

   Open the URL Vite prints (usually `http://localhost:5173`).

5. **Run tests (Vitest)**

   ```bash
   npm test
   ```

   Vitest runs in watch mode. For a one-off run (e.g. CI):

   ```bash
   npm run test:run
   ```

**Summary:** for the app, use two terminals — `npm run server` and `npm run dev`. For tests, run `npm test` (no mock server required).

## Technical Decisions

The main decision is to use clean arch and atomic design principles, thinking in a scalable project.

The structure and your respective responsibility is:

- **presentation**
  - **components**
    - **ui** Library components, at this case using Shadcn/ui.
    - **shared** Not abstract components but reusable, how cards and others components that not exists in library.
    - **views** Only view implementation, how ListItems passing items in props.
  - **controllers** Connect the components to company rules.
  - **pages** Build the pages using controllers.

- domain
  - **services** Use cases with company rules.
  - **entities** Primary data of system.

- infra
  - **repository** External data with inversion dependency.

## Future Improvements

- The principal future improvement is using SSR to improve security and performance.
- Other improvement is create an api or use a database to store da data.

## Security Considerations

### Reverse Engineering

- **Keep secrets and rules on the server.** Anything in the Vite client (including `VITE_*` variables) ends up in the bundle. API keys, signing logic, and business rules that must stay private belong in a backend the browser never sees.
- **Use a real API with authentication and authorization.** The client should only receive data the logged-in user is allowed to see. Attackers can call your API directly; robust checks must live server-side.
- **Prefer SSR or BFF patterns for sensitive flows.** Rendering and orchestration on the server (as in the planned SSR improvement) shrinks the amount of critical logic that must exist in downloadable JS.
- **Ship production builds with minification** (Vite does this by default) and avoid `console` / debug endpoints in prod. That raises the cost of inspection but does not replace server-side controls.
- **Rate limiting, anomaly detection, and WAF** on the API limit scripted probing and abuse of discovered endpoints.

### Data Leakage

- **HTTPS only** in production so traffic cannot be read or modified in transit.
- **Least data in the client.** Do not store tokens or PII in `localStorage` when `httpOnly`, `Secure`, `SameSite` cookies (or similar) are an option; prefer short-lived tokens and refresh flows designed with your backend.
- **Validate and authorize every request** on the server; never assume the UI is the only caller. The mock `json-server` setup has no auth— a real deployment needs identity, roles, and scoped responses.
- **Encrypt data at rest** in the database and backups; separate environments so dev/mock data never mirrors real customer data.
- **Log and monitor** access to sensitive resources; alert on unusual patterns (bulk exports, geo anomalies).
- **Content-Security-Policy** and related headers reduce injection risk that could exfiltrate session or page data.
