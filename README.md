# Playwright Automation Exercise

End-to-end UI tests for https://www.automationexercise.com built with Playwright and TypeScript. The suite covers account registration and login flows using page objects and fixture-style test data.

## Setup
- Prereqs: Node.js 18+ and npm.
- Install dependencies: `npm install`
- Run all tests headless: `npm test`
- Run headed: `npm run test:headed`
- Playwright UI mode: `npm run test:ui`
- Reports: HTML reports are written to `playwright-report`; screenshots on failure go to `test-results`.

## Project Layout
- `playwright.config.ts` — shared test config (base URL, parallelism, retries, reporter, device).
- `pages/` — page objects encapsulating UI interactions.
- `tests/` — Playwright specs grouped by area (e.g., `tests/web/` for browser flows).
- `utils/` — helpers for data preparation.
- `test-data/` — JSON fixtures used by helpers.
- `tsconfig.json` — TypeScript configuration for the project.

## Configuration (playwright.config.ts)
- `testDir: './tests'` — root for specs.
- `fullyParallel: true` — specs can run in parallel.
- `retries: 1` — failed tests retry once.
- `reporter: 'html'` — generates HTML report after runs.
- `use.baseURL` — default `https://www.automationexercise.com`; allows `page.goto('/')`.
- `use.screenshot: 'on'` — captures screenshots for every test.
- `use.trace: 'on'` — records a trace with snapshots for each action (view with `npx playwright show-trace <trace.zip>`).
- `projects` — currently Chromium desktop via built-in `Desktop Chrome` device profile.

## Page Objects (pages/)
- `HomePage` — landing page actions.
  - `goto()` loads `/` and asserts the Automation Exercise title.
  - `openSignupLogin()` clicks the “Signup / Login” link and waits for `/login`.
- `SignupLoginPage` — registration and login form interactions.
  - `registerNewUser(user)` fills signup form, selects options, opts into newsletters, fills address/contact details, and submits.
  - `login(user)` fills login form and submits.
  - Data contracts:
    - `RegistrationUser` interface covers all registration fields (name, email, password, DOB, address, contact).
    - `ExistingUser` interface covers minimal login fields (name, email, password).
- `AccountCreatedPage` — post-registration confirmation.
  - `expectAccountCreated()` asserts the account created banner and presence of Continue link.
  - `continueToHome()` clicks Continue to return to the home page.

## Test Data Helpers (utils/testData.ts)
- Loads `test-data/users.json`.
- `getRegistrationUser()` clones `registrationUser` data and injects a timestamp into the email (via `user+<timestamp>@...`) so each registration is unique.
- `getExistingUser()` returns the static `existingUser` credentials for login scenarios.

## Fixtures (test-data/users.json)
- `registrationUser` — full dataset for creating a new user (name, password, DOB, address, contact).
- `existingUser` — minimal dataset for logging in an already-created user.

## Specs (tests/web/)
- `registration.test.ts` — Verifies a visitor can open the site, navigate to Signup/Login, complete the registration form, and see the Account Created confirmation.
- `login.test.ts` — Registers a fresh user, confirms account creation, logs out, navigates back to Signup/Login, logs in with the same credentials, and asserts the “Logged in as <name>” banner.

## TypeScript Settings (tsconfig.json)
- Targets modern ECMAScript (`ESNext`), CommonJS modules, `strict` type checking.
- `resolveJsonModule` enables JSON imports for test data.
- `types: ["@playwright/test"]` pulls in Playwright globals.
- Output is directed to `dist` (not generally used for tests, but keeps compiler happy).

## How to Extend
- Add new page interactions to the relevant page object to keep specs short and readable.
- Add new data fixtures in `test-data/` and expose them via `utils/testData.ts`.
- Create new specs under `tests/web/` and leverage the page objects for reuse.
- Update `playwright.config.ts` with additional projects (e.g., Firefox, WebKit) or context settings as needed.
