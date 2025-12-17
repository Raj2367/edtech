# EdTech Course Manager

EdTech Course Manager** built to demonstrate secure CRUD operations, SSR/SSG, accessibility, testing discipline, and real‑world engineering considerations using **Next.js (App Router) + TypeScript + Express + MongoDB**.

This project is intentionally designed to go **beyond a basic CRUD app** and showcase architectural thinking, scalability, security, and maintainability — aligned with modern industry expectations.

---

## 1. Motivation

EdTech platforms in the real world require:

* Secure authentication & authorization
* Role‑based access (Instructor vs Student)
* Server‑side rendering for performance & security
* Scalable APIs and databases
* Automated testing
* Clean UI with accessibility considerations

**EdTech Course Manager** was built to simulate these constraints and demonstrate how to design, build, and reason about a real system — from ideation to deployment.

---

## 2. High Level Design (HLD)

```
┌────────────────────────────┐
│        Next.js App         │
│  (SSR / SSG / Client UI)  │
│                            │
│  • Public pages (SSG/ISR)  │
│  • Protected dashboard     │
│  • Server Actions          │
└──────────────┬─────────────┘
               │ HttpOnly Cookies
               ▼
┌────────────────────────────┐
│       Express API           │
│   (TypeScript, REST)        │
│                              │
│  • Auth & Authorization     │
│  • Secure CRUD APIs         │
│  • Validation & Middleware  │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│        MongoDB              │
│  (Users, Courses, Lessons) │
└────────────────────────────┘
```

### Design Principles

* Stateless backend (easy horizontal scaling)
* SSR for security‑sensitive pages
* Client components only where UX demands
* Clear separation of concerns

---

## 3. Technology Stack

### Frontend

* **Next.js (App Router)** – SSR, SSG, ISR, Server Actions
* **TypeScript** – Type safety & maintainability
* **Tailwind CSS** – Utility‑first, responsive UI

### Backend

* **Node.js + Express** – REST API
* **TypeScript** – Strong API contracts
* **MongoDB + Mongoose** – Flexible schema & scalability

### Testing

* **Jest + Supertest** – Backend unit & integration tests
* **Jest + React Testing Library** – Frontend unit tests

### Deployment

* **Express API** → Render
* **Next.js App** → Vercel

---

## 4. Key Features

### Authentication & Authorization

* JWT‑based authentication
* HttpOnly cookies (XSS‑safe)
* Role‑based access control

  * Instructor
  * Student

### Course Management (CRUD)

* Create, read, update, delete courses
* SEO‑friendly slug generation
* Instructor‑only mutation

### Lesson Management (CRUD)

* Lessons scoped to courses
* Instructor‑only access
* Extendable for videos, quizzes, markdown

### Rendering Strategy

* **SSR** – Dashboard & protected routes
* **SSG / ISR** – Public course listing
* **Dynamic imports** – Code splitting for heavy forms

### Accessibility

* Semantic HTML elements
* Accessible form labels & inputs
* Keyboard‑friendly navigation
* Color contrast via Tailwind defaults

---

## 5. Secure CRUD Implementation

Security is enforced at **multiple layers**:

1. **API Layer**

   * Zod validation for inputs
   * Authorization middleware
   * Ownership checks

2. **Auth Layer**

   * HttpOnly JWT cookies
   * Token expiration
   * Role enforcement

3. **Frontend Layer**

   * SSR‑based session validation
   * Middleware route protection

This ensures CRUD operations are **safe, predictable, and production‑ready**.

---

## 6. Algorithms & Core Logic

### Slug Generation

```ts
slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
```

Ensures readable, SEO‑friendly URLs.

### Authentication Flow

1. User submits credentials
2. Password verified using bcrypt
3. JWT generated with user role
4. Stored in HttpOnly cookie

### Authorization Logic

```
IF no token → reject
IF token invalid → reject
IF role mismatch → reject
ELSE → allow
```

---

## 7. SSR, SSG & Performance Optimization

* **SSR** for authenticated routes prevents token exposure
* **ISR** caches public pages with timed revalidation
* **Dynamic imports** reduce initial bundle size

This hybrid strategy balances **security, performance, and scalability**.

---

## 8. Testing Strategy

### Backend

* Auth API tests
* Course & lesson CRUD tests
* In‑memory MongoDB for isolation

### Frontend

* Unit tests for:

  * UI components
  * Forms
  * Pages
  * Error boundaries

> Server Actions are tested via API tests; frontend tests validate structure and intent.

---

## 9. Real‑World Considerations

### Scalability

* Stateless backend
* MongoDB supports replication & sharding
* CDN‑cached frontend

### Security Threats & Mitigation

| Threat              | Mitigation              |
| ------------------- | ----------------------- |
| XSS                 | HttpOnly cookies, CSP   |
| CSRF                | SameSite cookies, CORS  |
| Brute force         | Rate limiting           |
| Unauthorized access | RBAC + ownership checks |

### Maintainability

* Modular folder structure
* TypeScript everywhere
* Clear separation of concerns

---

## 10. Optional AI Add‑Ons (Extensible)

AI is **intentionally optional** and designed as add‑ons:

* AI‑generated lesson summaries
* Course description suggestions
* Instructor analytics insights
* Personalized learning recommendations

These features can be integrated without changing core architecture.

---

## 11. Setup Instructions

### Prerequisites

* Node.js 18+
* MongoDB

### Backend

```bash
cd apps/api
npm i
npm run build
npm start
```

### Frontend

```bash
cd apps/web
npm i
npm run build
npm dev
```

---

## 12. Conclusion

This project demonstrates:

* Secure full‑stack CRUD
* Modern SSR‑first frontend architecture
* Strong testing discipline
* Production‑grade security practices
* Scalable and maintainable design

It is designed not just to **work**, but to **scale, evolve, and withstand real‑world constraints**.
