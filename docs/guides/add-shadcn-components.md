# Adding a Shadcn Component

Shadcn components are stored in the shared `@portfolio2/ui` package so they can be used by both `apps/admin` and `apps/client`.

> **Note:** Do not use `shadcn add` in this project. The CLI's dependency installation currently conflicts with the pnpm `workspace:*` setup. Use `shadcn view` instead.

## 1. View the component

From `apps/admin`:

```bash
pnpm exec shadcn view <component>
```

Example:

```bash
pnpm exec shadcn view card
```

Copy the generated component source.

## 2. Add it to the shared UI package

Create the component inside:

```text
packages/ui/src/components/
```

Example:

```text
packages/ui/src/components/card.tsx
```

Paste the generated source into the file.

## 3. Fix shared-package imports

If the generated component contains:

```tsx
import { cn } from "@/lib/utils";
```

change it to:

```tsx
import { cn } from "../lib/utils";
```

Components inside `packages/ui` must not depend on application-specific aliases.

## 4. Install missing dependencies

If the component uses a package that isn't already installed in `@portfolio2/ui`, install it there:

```bash
pnpm --filter @portfolio2/ui add <package>
```

For example:

```bash
pnpm --filter @portfolio2/ui add @base-ui/react
```

## 5. Use the component

Import it through the shared package:

```tsx
import { Card } from "@portfolio2/ui/components/card";
```

No additional export configuration is required because `packages/ui/package.json` already exposes:

```json
{
  "exports": {
    "./components/*": "./src/components/*.tsx"
  }
}
```

## 6. Tailwind configuration

The consuming application's CSS must include the shared UI styles and source:

```css
@import "@portfolio2/ui/globals.css";

@source "../../../packages/ui/src";
```

This is already configured in `apps/admin/src/index.css`.

## Component Location

Always place reusable shadcn components here:

```text
packages/ui/src/components/
```

Do not place shared components directly inside:

```text
apps/admin/src/components/
```

unless the component is specifically intended to belong only to Admin.

## Quick Reference

```text
1. pnpm exec shadcn view <component>
                    ↓
2. Copy source
                    ↓
3. packages/ui/src/components/<component>.tsx
                    ↓
4. Fix @/lib/utils → ../lib/utils
                    ↓
5. Install missing dependencies in @portfolio2/ui
                    ↓
6. Import from @portfolio2/ui/components/<component>
```
