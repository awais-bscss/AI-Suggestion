# AISuggestion Mini Design System

An accessible, provider-agnostic AI suggestion component built on a token-based mini design system.
It supports preview, edit, accept, reject, regenerate, and error flows without backend dependencies.

## Features

- Complete state machine: idle, loading, ready, editing, and error states.
- TypeScript discriminated union modeling component state without type assertions.
- Provider-agnostic design with async callback execution.
- Token-based styling with Tailwind CSS v4 and full light/dark mode support.
- Keyboard accessible with auto-focus handling between preview and editing modes.
- Built strictly with atomic primitives (Button, Spinner, Textarea) and composites (Card, Alert).

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React 19, Vite |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4, CSS Variables |
| Class Utilities | class-variance-authority, clsx, tailwind-merge |
| Typography | Inter Variable (@fontsource-variable/inter) |
| Icons | lucide-react |
| Linter | Oxlint |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript checks and production build
npm run build

# Run linter
npm run lint
```

## Project Structure

```
src/
  tokens/          # CSS variables, Tailwind @theme mappings, and scale definitions
  lib/             # Class merging helper (cn) using clsx and tailwind-merge
  components/
    primitives/    # Atomic elements: Button, Spinner, Textarea
    composites/    # Compound structures: Card, Alert
    ai/            # AISuggestion component implementation
  pages/           # AISuggestionDemo with mock generator examples
  App.tsx          # Shell layout with theme toggle and container
  main.tsx         # Application root with font imports
  index.css        # Base typography and Tailwind imports
```

## AISuggestion Component

### Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `generate` | `() => Promise<string>` | Yes | Async callback returning suggestion text or throwing an error. |
| `onAccept` | `(text: string) => void` | Yes | Callback invoked with the final accepted or edited text. |
| `onReject` | `() => void` | Yes | Callback invoked when the user rejects the suggestion. |
| `title` | `string` | No | Card header title. Defaults to "AI Suggestion". |
| `className` | `string` | No | Optional CSS class name override for the card container. |

### States

| Status | What the user sees | Available actions |
| --- | --- | --- |
| `idle` | Prompt title and description | Generate Suggestion |
| `loading` | Spinner, progress text, aria-live announcement | None (buttons disabled) |
| `ready` | Read-only suggestion preview text | Accept, Edit, Reject, Regenerate |
| `editing` | Autofocused textarea with draft text | Accept Edits, Cancel |
| `error` | Alert banner with error message | Retry, Dismiss |

### Usage

```tsx
import { AISuggestion } from './components/ai/AISuggestion'

export function Example() {
  return (
    <AISuggestion
      title="Code Assistant"
      generate={async () => "Refactored cache synchronization layer."}
      onAccept={(text) => console.log("Accepted:", text)}
      onReject={() => console.log("Rejected")}
    />
  )
}
```

## Design Tokens

| Token group | Values or notes |
| --- | --- |
| Accent | `#283845` constant fill; hover `#1e2c37` (light) / `#34495a` (dark); subtle `#eef3f7` / `#15222c`; text `#283845` / `#8eb4cf` |
| Surfaces | Canvas (`#f8fafc` / `#0d1217`), Surface (`#ffffff` / `#141c24`), Subtle (`#f1f5f9` / `#1c2732`) |
| Text | Primary (`#0f172a` / `#f8fafc`), Secondary (`#475569` / `#94a3b8`), Muted (`#64748b`) |
| Borders | Subtle (`#f1f5f9` / `#1c2732`), Default (`#e2e8f0` / `#263544`) |
| Radius | Controls (buttons, textarea, badge, icon box) 6px (`rounded-md`); Cards and alerts 8px (`rounded-lg`) |
| Typography | Inter Variable: 13px (badges/labels), 14px (helper/buttons), 15px (body/preview), 16px (card title), 18px (headings), 24px (page title) |

## Accessibility

- Semantic HTML structure using native buttons, labels, and textareas.
- Visible focus rings on all interactive elements using accent tokens.
- Automatic focus shift to textarea on edit, and focus restoration to trigger buttons on accept/cancel/reject.
- Dynamic announcement of loading status via `aria-live="polite"`.
- Error announcements configured with `role="alert"` and assertive semantics.
- Verified WCAG AA contrast for text, borders, and interactive states in both light and dark modes.

## Technical Decisions

- Provider-agnostic generate prop: Keeps the component decoupled from backend APIs or SDKs, allowing integration with any async data source.
- Discriminated union for state: Guarantees compile-time type safety for mutually exclusive UI states (idle, loading, ready, editing, error).
- CVA plus cn utility: Combines class-variance-authority with clsx and tailwind-merge for predictable, collision-free variant management.
- Tailwind CSS v4 @theme: Maps CSS custom properties directly into utility classes, enabling runtime light and dark mode switching.
- Mock generators in demo: Uses setTimeout-based promises to verify both resolving and rejecting lifecycles without network dependencies.
