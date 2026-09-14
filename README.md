## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Applications & Packages](#applications--packages)
- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions)
- [Commit Guidelines](#commit-guidelines)
- [License](#license)

## Description

portfolio2 is a full-stack portfolio and content management platform built as a pnpm monorepo. The public portfolio is served through Next.js, while authenticated content management is handled through a separate React admin application.

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Admin

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Node.js
- Express
- MongoDB
- Redis

### Tooling

- pnpm
- ESLint
- Prettier
- GitHub Actions

## Applications & Packages

| Path          | Purpose                                 |
| ------------- | --------------------------------------- |
| `apps/client` | Public portfolio and SEO-focused pages  |
| `apps/admin`  | Authenticated content management system |
| `apps/server` | Backend API and business logic          |
| `packages/ui` | Shared UI components and styling        |
| `docs`        | Project documentation                   |
| `scripts`     | Development and repository automation   |

## Folder Structure

<!-- TREE:START -->

```text
portfolio2/
├── .github
├── apps
│   ├── admin
│   │   ├── public
│   │   ├── src
│   │   ├── .gitignore
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   └── vite.config.ts
│   ├── client
│   │   ├── public
│   │   ├── src
│   │   ├── .gitignore
│   │   ├── next-env.d.ts
│   │   ├── next.config.ts
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── README.md
│   │   └── tsconfig.json
│   └── server
├── docs
├── packages
├── scripts
│   └── update-readme-tree.mjs
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.js
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── PROJECT.md
└── README.md
```

<!-- TREE:END -->

## Naming Conventions

### Foldername

_kebab-case_

Example:

```
user-profile
auth-service
payment-gateway
blog-editor
api-client
```

### Filename & Variables

_camelCase_

```
authController.js
userService.js
paymentGateway.js
getUserProfile()
createBlogPost()
accessToken
userProfile
```

### Class names

_PascalCase_

```
class UserService {}
class AuthController {}
class PaymentGateway {}
class BlogRepository {}
```

### Constants names

_UPPER_SNAKE_CASE_

```
ACCESS_TOKEN
REFRESH_TOKEN
MAX_FILE_SIZE
API_BASE_URL
DEFAULT_PAGE_SIZE
```

### React Component names

Reusable components: _small-kabab-case_

```
user-card.tsx
login-btn.tsx
search-bar.tsx
```

Page: _PascalCase_ with 'Page' suffix.

```
HomePage.tsx
ProjectsPage.tsx
AboutPage.tsx
ContactPage.tsx
ProjectDetailsPage.tsx
```

## Commit Guidelines

We follow Conventional Commits.

### Format

\<Type\>: \<Description\>

### Types

- feat: A new feature
- fix: A bug fix
- refactor: Code restructuring without changing behavior
- docs: Documentation changes
- style: Formatting/style changes that don't affect logic
- test: Adding or modifying tests
- chore: Maintenance/configuration changes
- perf: Performance improvements
- build: Build system or dependency changes
- ci: CI/CD configuration changes

### Examples

- feat: add project search
- fix: resolve mobile navbar overflow
- refactor: extract authentication service
- docs: update setup instructions
- test: add authentication controller tests
- chore: update dependencies
- build: configure pnpm workspace
- ci: add github actions workflow

## License

Copyright © 2026 Abhinav Kumar.

This project is proprietary. The source code is available for viewing
and evaluation purposes only.

Redistribution, commercial use, or reuse of the source code or
substantial portions of its implementation is not permitted without
explicit permission from the copyright holder.

See [LICENSE](./LICENSE) for the complete terms.
