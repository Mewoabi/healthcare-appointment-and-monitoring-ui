# health-client

An **Angular 21** single-page app for a healthcare management & monitoring product —
**patient**, **doctor**, and **admin** experiences in one shell. Standalone components,
signal-based stores, lazy routes, and a clean separation between the UI and the data
layer through small per-domain API contracts.

The app ships with a **built-in mock API** that runs entirely in memory and seeds itself
with realistic data, so it can be developed, demoed, and run **without any backend at
all**. When you want to talk to a real REST service, switch the configuration with one
flag — every component, store, guard, and interceptor stays unchanged.

> **Default mode is mock.** Just `npm install && npm start` and the app boots with no
> external dependencies.

---

## Tech stack

- **Angular 21** (standalone components, signals, lazy routes, control flow `@if/@for`)
- **TypeScript 5.9**, **RxJS 7**
- **SCSS** — bespoke styles, no UI framework
- **Vitest** for unit tests
- **Angular CLI** + `@angular/build` (esbuild)

---

## What it does

Three roles, one shell. Routing under `/patient`, `/doctor`, and `/admin` (see
`src/app/app.routes.ts`); the user's role decides what they can navigate to.

### Patient

- Dashboard (next appointment, latest vitals, quick actions)
- Appointments — book, reschedule, cancel
- Vitals — log new readings, see history with trend charts and alert flags
- Find a doctor — list, filter by specialization, view bookable slots, book
- Profile — DOB, gender, blood group, allergies, chronic conditions, emergency contact, insurance

### Doctor

- Dashboard (today's overview)
- Calendar (week view) and Today's schedule
- Patients (list of patients with appointments with this doctor, last visit, alert flags)
- Availability — weekly recurring slots, slot duration, active toggle
- Profile — license, specialization, hospital, fee, bio

### Admin

- Dashboard with system stats (users, appointments, critical vitals, pending doctors, …)
- Users — search / filter, activate / deactivate
- Doctor approvals
- Audit log
- Settings

### Cross-cutting

- **Auth** with JWT persisted in `localStorage`, `APP_INITIALIZER` rehydrates the session on reload, `authGuard` protects the shell
- **Auth interceptor** attaches `Authorization: Bearer <token>` to API calls
- **Error interceptor** clears auth and redirects to `/auth` on `401`
- **Notifications** (in-app) with unread badge
- **Booking modal** with bookable-slot lookup
- **Tweaks panel** for visual debugging during development

---

## Project layout

```
health-client/
├── angular.json
├── package.json
├── tsconfig*.json
├── public/                                 ← static assets copied to /
└── src/
    ├── index.html, main.ts, styles.scss
    ├── environments/
    │   ├── environment.ts                  ← used by `ng build` (production by default)
    │   ├── environment.development.ts      ← `--configuration=development` → real backend
    │   └── environment.mock.ts             ← `--configuration=mock` → in-memory mock (default)
    └── app/
        ├── app.config.ts                   ← provideRouter, provideHttpClient, provideApi, AuthStore APP_INITIALIZER
        ├── app.routes.ts                   ← lazy routes for /auth and the shell
        ├── app.ts, app.html, app.scss
        ├── core/
        │   ├── api/
        │   │   ├── api.providers.ts        ← swap point: binds *_API tokens to Mock* or Http* by environment.useMockApi
        │   │   ├── auth.api.ts             ← AUTH_API InjectionToken + interface
        │   │   ├── appointment.api.ts, doctor.api.ts, patient.api.ts, vital.api.ts,
        │   │   ├── notification.api.ts, admin.api.ts, availability.api.ts
        │   │   ├── http/                   ← Http* implementations (REST calls, ApiResponse unwrap)
        │   │   │   ├── adapters.ts
        │   │   │   ├── http-auth.api.ts, http-appointment.api.ts, http-doctor.api.ts, …
        │   │   └── mock/                   ← Mock* implementations (in-memory, observable + delay)
        │   │       ├── seeds.ts            ← deterministic seed data
        │   │       ├── mock-auth.api.ts, mock-appointment.api.ts, …
        │   ├── http/
        │   │   ├── auth.interceptor.ts     ← attaches Bearer token to apiBaseUrl requests
        │   │   ├── error.interceptor.ts    ← 401 → clearAuth + redirect /auth
        │   │   └── api-response.ts         ← unwraps the ApiResponse / PageResponse envelopes
        │   ├── auth/
        │   │   └── auth.guard.ts           ← canActivate: AuthStore.isAuthed()
        │   ├── stores/                     ← signal stores per domain (load*/mutate*/loading/error)
        │   │   ├── auth.store.ts, appointment.store.ts, vital.store.ts, doctor.store.ts,
        │   │   ├── patient.store.ts, notification.store.ts, admin.store.ts, availability.store.ts
        │   ├── models/                     ← shared types (AuthUser, Doctor, Patient, Appointment, VitalRecord, …)
        │   └── util/format.ts              ← date / time / number formatters, TODAY constant
        ├── layout/
        │   └── shell/                      ← top bar, side nav, role-aware menu, notifications dropdown
        ├── features/
        │   ├── auth/                       ← /auth: login + register
        │   ├── patient/                    ← dashboard, appointments, vitals, find-doctor, profile
        │   ├── doctor/                     ← dashboard, calendar, patients, availability, profile
        │   ├── admin/                      ← dashboard, users, approvals, audit, settings
        │   ├── modals/booking-modal/       ← shared booking flow
        │   └── tweaks-panel/               ← visual tweaks panel (dev aid)
        └── shared/                         ← status-tag, trend-chart, …
```

---

## Quick start

```bash
npm install
npm start          # ng serve, defaults to the `mock` configuration → http://localhost:4200
```

Open [http://localhost:4200](http://localhost:4200). The app boots against an in-memory
mock API with realistic seed data and a small simulated network delay
(`mockLatencyMs: 280`). Every screen works.

### Demo logins (mock mode)

Password is `demo` for all three:

| Role | Email |
|---|---|
| Patient | `maren.h@example.com` |
| Doctor | `aokonkwo@polaris.health` |
| Admin | `admin@polaris.health` |

You can use the app this way indefinitely — no database, no Docker, no other process.

---

## Available scripts

| Command | What it does |
|---|---|
| `npm start` | `ng serve` — **mock by default** (configured in `angular.json`) |
| `npm run start:mock` | Explicit mock mode (`ng serve --configuration=mock`) |
| `npm run start:dev` | Real-backend mode (`ng serve --configuration=development`) — requires a REST API at `apiBaseUrl` |
| `npm run build` | `ng build` — production build using `environment.ts` |
| `npm run watch` | `ng build --watch --configuration development` |
| `npm test` | Vitest unit tests |

---

## Switching between mock and real API

There is **one** swap point: the `useMockApi` flag in the active environment file.
`src/app/core/api/api.providers.ts` reads it once at startup and binds every domain API
token to either the `Mock*` or `Http*` implementation:

```ts
export function provideApi(): EnvironmentProviders {
  const useMock = environment.useMockApi;
  return makeEnvironmentProviders([
    { provide: AUTH_API,         useClass: useMock ? MockAuthApi         : HttpAuthApi },
    { provide: APPOINTMENT_API,  useClass: useMock ? MockAppointmentApi  : HttpAppointmentApi },
    { provide: VITAL_API,        useClass: useMock ? MockVitalApi        : HttpVitalApi },
    { provide: DOCTOR_API,       useClass: useMock ? MockDoctorApi       : HttpDoctorApi },
    { provide: PATIENT_API,      useClass: useMock ? MockPatientApi      : HttpPatientApi },
    { provide: NOTIFICATION_API, useClass: useMock ? MockNotificationApi : HttpNotificationApi },
    { provide: ADMIN_API,        useClass: useMock ? MockAdminApi        : HttpAdminApi },
    { provide: AVAILABILITY_API, useClass: useMock ? MockAvailabilityApi : HttpAvailabilityApi },
  ]);
}
```

Components and stores depend on the **interfaces** (`AuthApi`, `AppointmentApi`, …),
never on a concrete implementation, so the switch is transparent to the rest of the app.

### The three environment files

| File | `useMockApi` | `apiBaseUrl` | When used |
|---|---|---|---|
| `environment.mock.ts` | **`true`** | `http://localhost:8080/api` (unused in mock) | `npm start` (default), `npm run start:mock`, `ng serve --configuration=mock` |
| `environment.development.ts` | `false` | `http://localhost:8080/api` | `npm run start:dev`, `ng serve --configuration=development` |
| `environment.ts` | `false` | `http://localhost:8080/api` | Production builds (`ng build`) — set `apiBaseUrl` to your deployed API |

Angular CLI's `fileReplacements` (in `angular.json`) substitutes the active env file for
`environment.ts` at build time.

### Pointing at a different API host

For dev:

1. Edit `src/environments/environment.development.ts` → set `apiBaseUrl` to your URL.
2. Run `npm run start:dev`.

For production: edit `src/environments/environment.ts` (or wire your CI to write it) and
run `npm run build`.

The backend must allow your origin in CORS (typically `http://localhost:4200` for dev).

---

## Architecture in one paragraph

Routes are lazy-loaded standalone components. Each feature reads from a **signal store**
(`AuthStore`, `AppointmentStore`, `VitalStore`, `DoctorStore`, `PatientStore`,
`NotificationStore`, `AdminStore`, `AvailabilityStore`) which exposes `loading`, `error`
and domain signals plus `load*` / mutate methods. Stores depend on **API interfaces**
injected via `InjectionToken`s (`AUTH_API`, `APPOINTMENT_API`, …) — at startup,
`provideApi()` binds each token to either an `Http*` class (real backend, with
`HttpClient` + interceptors that attach JWT and unwrap the API envelope) or a `Mock*`
class (in-memory state, returns observables with a configurable latency). `AuthStore`
persists the JWT in `localStorage` and is rehydrated by an `APP_INITIALIZER`; the
`authGuard` keeps unauthenticated users on `/auth`; the error interceptor force-logs-out
on `401`. There is no global state framework — Angular signals are the single source of
truth.

---

## Configuration values

`environment.{mock,development,ts}` exports:

```ts
export const environment = {
  production: false | true,
  useMockApi: true | false,
  apiBaseUrl: string,    // e.g. 'http://localhost:8080/api'
  mockLatencyMs: number, // simulated delay for mock observables
} as const;
```

`mockLatencyMs` only affects mock mode. Set it to `0` for instant responses while
testing, or higher to feel network-like delays.

---

## Tests

```bash
npm test
```

Uses Vitest via the Angular CLI test builder. Place specs next to the file they cover
(`*.spec.ts`).

---

## Building for production

```bash
npm run build
```

Outputs to `dist/`. The production config uses `environment.ts` — make sure
`apiBaseUrl` there points at your deployed backend, and that the backend allows your
origin in CORS. The build enforces budgets:

- initial bundle: warn at **500 kB**, error at **1 MB**
- per-component styles: warn at **4 kB**, error at **8 kB**

---

Project conventions:

- **Standalone components** only.
- SCSS for styles (configured as the default schematic style).
- Component selector prefix: `app`.
- Keep components dumb where possible; let stores do the work.
