# Architecture

## Overview

This project follows a **3-application architecture**:

```text
┌─────────────────┐
│ Client (Next.js)│
│ Public Website  │
└────────┬────────┘
         │
         │ GET
         ▼
┌─────────────────┐
│ Server          │
│ Node.js +       │
│ Express.js      │
└────────┬────────┘
         │
         │ Cached GET
         ▼
┌─────────────────┐
│ Redis           │
│ Cache Layer     │
└─────────────────┘

         ▲
         │ Authenticated Users
         │
┌────────┴────────┐
│ Admin (React)   │
│ CMS Dashboard   │
└────────┬────────┘
         │
         │ Create / Update / Delete
         ▼
┌─────────────────┐
│ Server          │
│ Node.js +       │
│ Express.js      │
└─────────────────┘
```

---

## Applications

### Client (Next.js)

The client application is responsible for the public-facing portfolio website.

Responsibilities:

* SEO optimization
* Static and dynamic content rendering
* Project showcase
* Blog/content display
* Authentication entry point
* Redirect authenticated users to Admin

Characteristics:

* Read-heavy application
* Primarily performs GET requests
* Optimized for performance and search engines

---

### Admin (React.js)

The admin application acts as a private CMS for managing portfolio content.

Responsibilities:

* Authentication
* Dashboard management
* Content creation
* Content updates
* Content deletion
* Media management

Characteristics:

* Write-heavy application
* Performs Create, Update, and Delete operations
* Accessible only to authenticated users

---

### Server (Node.js + Express.js)

The server serves as the central API layer between Client, Admin, and the database.

Responsibilities:

* Authentication & authorization
* Business logic
* Database communication
* Data validation
* Cache management
* API documentation

Characteristics:

* Single source of truth
* Shared backend for Client and Admin

---

## Data Flow

### Public Content Request

```text
Client
   │
   ▼
Server
   │
   ├─ Cache Hit → Redis → Response
   │
   └─ Cache Miss
           │
           ▼
        Database
           │
           ▼
         Redis
           │
           ▼
        Response
```

Goal:

* Fast page loads
* Reduced database queries
* Improved scalability

---

### Content Management Request

```text
Admin
   │
   ▼
Server
   │
   ▼
Database
   │
   ▼
Cache Invalidation
```

Goal:

* Maintain data consistency
* Ensure fresh content is served to the Client

---

## Caching Strategy

### Cached

* Portfolio projects
* Blogs/articles
* Public profile data
* Frequently requested content

### Not Cached

* Authentication requests
* Admin actions
* Create/Update/Delete operations

---

## Design Principles

* Client is optimized for SEO and content consumption.
* Admin is optimized for content management.
* Server owns all business logic.
* Redis accelerates read operations.
* Public traffic should never directly access the database.
* All data changes flow through the Server.
