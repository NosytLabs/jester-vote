# TopJester Design System

## Color Tokens (oklch)

### Primary Palette
- `--color-primary`: oklch(0.75 0.25 140) - Jester Gold
- `--color-secondary`: oklch(0.45 0.2 300) - Jester Purple
- `--color-accent`: oklch(0.65 0.22 25) - Jester Red
- `--color-success`: oklch(0.55 0.18 145) - Jester Green

### Background
- `--bg-dark`: oklch(0.08 0.02 280) - Court Dark
- `--bg-card`: oklch(0.12 0.03 280) - Card Background
- `--bg-elevated`: oklch(0.15 0.04 280) - Elevated Surface

### Text
- `--text-primary`: oklch(0.95 0 0) - Primary Text
- `--text-secondary`: oklch(0.65 0.02 280) - Secondary Text
- `--text-muted`: oklch(0.55 0.02 280) - Muted Text

## Typography Scale

### Font Families
- **Display**: 'Orbitron', sans-serif - Headers, titles
- **Body**: 'Inter', system-ui, sans-serif - Body text
- **Mono**: 'JetBrains Mono', monospace - Code, stats

### Type Scale
- **Hero**: 4rem (64px) - Main titles
- **H1**: 3rem (48px) - Page titles
- **H2**: 2rem (32px) - Section headers
- **H3**: 1.5rem (24px) - Card titles
- **Body**: 1rem (16px) - Regular text
- **Small**: 0.875rem (14px) - Labels, captions
- **Tiny**: 0.75rem (12px) - Metadata

## Spacing Scale

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Component Patterns

### Cards
- Border radius: 1rem (16px)
- Padding: 1.5rem (24px)
- Background: glassmorphism (backdrop-blur + gradient)
- Border: 1px solid white/10
- Shadow: subtle drop shadow

### Buttons
- Primary: Gold background, dark text
- Secondary: Transparent, gold border
- Ghost: Transparent, subtle hover
- Border radius: 0.75rem (12px)
- Padding: 0.75rem 1.5rem

### Inputs
- Background: oklch(0.15 0.03 280)
- Border: 1px solid white/10
- Focus: Gold ring (2px)
- Border radius: 0.75rem

## Animation Timing

- **Micro**: 150ms - Button presses, toggles
- **Fast**: 200ms - Hovers, small transitions
- **Medium**: 300ms - Card animations, fades
- **Slow**: 500ms - Page transitions, large movements
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) - Standard
- **Spring**: type: "spring", stiffness: 400, damping: 30

## Accessibility (WCAG AA)

### Contrast Ratios
- Text on dark: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus States
- Visible focus ring on all interactive elements
- 2px solid gold outline
- Offset: 2px

### Keyboard Navigation
- Tab order follows visual layout
- Enter/Space activates buttons
- Escape closes modals/drawers

## Empty States

### No Data
- Icon: Relevant emoji (🎭, 🃏, etc.)
- Title: "No [items] yet"
- Description: Helpful context
- CTA: Action button if applicable

### Loading
- Skeleton screens preferred
- Spinner for small elements
- Progress bar for long operations

### Error
- Icon: ⚠️ or ❌
- Title: Clear error message
- Description: How to fix
- CTA: Retry or alternative action
