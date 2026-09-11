
## Table of Contents

- [Commit Guidelines](#commit-message-convention)
- [License](#license)

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
