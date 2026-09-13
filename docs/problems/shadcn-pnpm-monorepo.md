# Shadcn + pnpm Monorepo Setup Problem

## Problem

The project uses a **pnpm monorepo** with shared UI components stored in `packages/ui`.

The relevant structure is:

```text
portfolio2/
├── apps/
│   ├── admin/        # React + Vite
│   ├── client/       # Next.js
│   └── server/
├── packages/
│   └── ui/           # Shared UI components
├── package.json
└── pnpm-workspace.yaml
```

The goal was to use **shadcn/ui components inside `packages/ui`** and then consume those components from both `apps/admin` and `apps/client`.

The intended dependency flow was:

```text
apps/admin ───────┐
                  ├──> @portfolio2/ui
apps/client ──────┘
```

---

## Initial Setup

The shared UI package is:

```text
packages/ui/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   └── index.ts
├── package.json
└── tsconfig.json
```

The package exports were configured as:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/*.tsx",
    "./lib/*": "./src/lib/*.ts",
    "./hooks/*": "./src/hooks/*.ts",
    "./globals.css": "./src/styles/globals.css"
  }
}
```

This allows applications to import shared components like:

```tsx
import { Button } from "@portfolio2/ui/components/button";
```

and shared styles like:

```css
@import "@portfolio2/ui/globals.css";
```

---

# Issue 1: Initial Shadcn Setup in `packages/ui`

The first attempt was to initialize shadcn directly inside:

```text
packages/ui
```

using:

```bash
pnpm dlx shadcn@latest init
```

This did not work as expected because `packages/ui` is a generic shared package rather than a framework application supported directly by the shadcn initialization flow.

The shared package therefore remained responsible for **storing the generated components**, while shadcn configuration was initialized from an application workspace.

---

# Issue 2: Shadcn CLI and `workspace:*`

Shadcn was initialized inside:

```text
apps/admin
```

This generated a `components.json` configuration.

However, running:

```bash
pnpm exec shadcn add button
```

failed.

The important error was:

```text
npm error code EUNSUPPORTEDPROTOCOL
npm error Unsupported URL Type "workspace:": workspace:*
```

The problem was not pnpm itself.

The project correctly uses:

```json
"@portfolio2/ui": "workspace:*"
```

The problem was that the shadcn CLI's dependency installation step attempted to execute `npm install`.

That npm invocation could not understand the pnpm workspace protocol:

```text
workspace:*
```

Therefore, changing the monorepo away from pnpm or removing `workspace:*` was not the correct solution.

---

# Solution: Use `shadcn view`

Instead of using:

```bash
pnpm exec shadcn add button
```

the component source can be retrieved using:

```bash
pnpm exec shadcn view button
```

This successfully returned the generated component source without triggering the problematic dependency installation.

This means shadcn can still be used as the source of truth for generating the component code, while the component itself is manually placed into the shared package.

---

# Adding the Button to the Shared UI Package

The generated component was placed at:

```text
packages/ui/src/components/button.tsx
```

The generated shadcn code originally used an application-specific import such as:

```tsx
import { cn } from "@/lib/utils";
```

Since the component now belongs to the shared UI package, the import was changed to:

```tsx
import { cn } from "../lib/utils";
```

The shared package's `utils.ts` contains:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

# Shared Component Dependencies

Because the Button component uses Base UI:

```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button";
```

the dependency belongs to the shared UI package, not only the application.

It should therefore be installed with:

```bash
pnpm --filter @portfolio2/ui add @base-ui/react
```

The general rule is:

> If a shared component imports a package at runtime, that package should be declared as a dependency of `@portfolio2/ui`.

This keeps the shared package self-contained.

---

# Issue 3: Button Was Functionally Working but Unstyled

After importing the Button from the shared package:

```tsx
import { Button } from "@portfolio2/ui/components/button";
```

the component rendered, but it initially looked almost like a plain HTML button.

For example:

```tsx
<Button>test</Button>
```

did not have the expected shadcn styling.

However, adding a normal Tailwind class worked:

```tsx
<Button className="bg-red-500">
  test
</Button>
```

This proved that Tailwind itself was working.

The problem was specifically with the shadcn semantic classes.

The Button uses classes such as:

```text
bg-primary
text-primary-foreground
border-border
ring-ring
```

These depend on the shadcn theme variables defined in the shared CSS.

---

# Issue 4: Shared Theme CSS Was Not Being Loaded

The shared UI package contains:

```text
packages/ui/src/styles/globals.css
```

The application needs to load this CSS.

The shared package exposes it through:

```json
"./globals.css": "./src/styles/globals.css"
```

Therefore, `apps/admin/src/index.css` was changed to:

```css
@import "@portfolio2/ui/globals.css";
```

This makes the shared shadcn theme available to the application.

---

# Issue 5: Tailwind Was Not Scanning the Shared Package

Even after loading the shared CSS, Tailwind also needed to know where the classes from the shared package were located.

The Button itself lives here:

```text
packages/ui/src/components/button.tsx
```

while the application's Tailwind entry point is here:

```text
apps/admin/src/index.css
```

Therefore, Tailwind was explicitly instructed to scan the shared UI source directory using `@source`.

The final `apps/admin/src/index.css` is:

```css
@import "@portfolio2/ui/globals.css";

@source "../../../packages/ui/src";
```

The important part is:

```css
@source "../../../packages/ui/src";
```

This tells Tailwind to scan the shared package for classes used by components such as:

```text
packages/ui/src/components/button.tsx
packages/ui/src/components/card.tsx
packages/ui/src/components/dialog.tsx
...
```

---

# Final Working Architecture

The resulting setup is:

```text
portfolio2/
│
├── apps/
│   ├── admin/
│   │   └── src/
│   │       └── index.css
│   │
│   └── client/
│
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/
│       │   │   └── button.tsx
│       │   ├── hooks/
│       │   ├── lib/
│       │   │   └── utils.ts
│       │   ├── styles/
│       │   │   └── globals.css
│       │   └── index.ts
│       └── package.json
│
└── pnpm-workspace.yaml
```

Admin CSS:

```css
@import "@portfolio2/ui/globals.css";

@source "../../../packages/ui/src";
```

Component usage:

```tsx
import { Button } from "@portfolio2/ui/components/button";

const App = () => {
  return (
    <div>
      <Button onClick={() => console.log("test")}>test</Button>
    </div>
  );
};

export default App;
```

---

# Final Workflow for Adding Shadcn Components

Because `shadcn add` currently conflicts with the pnpm workspace setup, new components are added manually.

## 1. Inspect the component

From `apps/admin`:

```bash
pnpm exec shadcn view <component>
```

Example:

```bash
pnpm exec shadcn view card
```

## 2. Copy the generated source

Create:

```text
packages/ui/src/components/card.tsx
```

and copy the generated source into it.

## 3. Fix shared-package imports

If the generated component contains:

```tsx
import { cn } from "@/lib/utils";
```

change it to:

```tsx
import { cn } from "../lib/utils";
```

## 4. Check dependencies

If the component imports a package that is not installed in `@portfolio2/ui`, install it there:

```bash
pnpm --filter @portfolio2/ui add <package>
```

## 5. Use the component

```tsx
import { Card } from "@portfolio2/ui/components/card";
```

No additional export configuration is necessary because:

```json
"./components/*": "./src/components/*.tsx"
```

already handles individual components.

---

# Important Rules

### Keep pnpm

The project uses pnpm intentionally.

Do not change the package manager just to make shadcn's `add` command work.

### Keep `workspace:*`

The dependency:

```json
"@portfolio2/ui": "workspace:*"
```

is correct for this monorepo.

Do not replace it with a published version or a filesystem path.

### Shared components belong in `packages/ui`

Do not put shared shadcn components inside:

```text
apps/admin/src/components/
```

if they are intended to be used by both Admin and Client.

Use:

```text
packages/ui/src/components/
```

instead.

### Shared dependencies belong to the shared package

If `button.tsx` uses:

```tsx
@base-ui/react
```

then `@base-ui/react` belongs in:

```text
packages/ui/package.json
```

rather than relying on the application's dependency.

### Keep the shared Tailwind source

The applications should load:

```css
@import "@portfolio2/ui/globals.css";
```

and scan the shared package:

```css
@source "../../../packages/ui/src";
```

This allows Tailwind to generate the styles used by the shared components.

---

# Result

The final setup provides:

```text
Shadcn registry
       │
       │ shadcn view
       ▼
packages/ui
       │
       ├── Button
       ├── Card
       ├── Dialog
       ├── Input
       └── ...
       │
       ├───────────────┐
       ▼               ▼
   apps/admin      apps/client
```

The shadcn CLI is used to obtain component source, while `@portfolio2/ui` remains the single shared component library for the monorepo.
