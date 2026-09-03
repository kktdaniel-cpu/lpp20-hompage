# Color Palette Swap Workflow

## Overview

Replace an existing webdev project's color scheme with a new palette without breaking layout or component logic.

## Step-by-step

### 1. Audit existing colors

```bash
# Find all hardcoded hex colors
grep -rn '#[0-9A-Fa-f]\{6\}' client/src/ --include="*.tsx" --include="*.css"

# Find Tailwind arbitrary color classes
grep -rn '\[#[0-9A-Fa-f]' client/src/ --include="*.tsx"
```

### 2. Map old tokens → new tokens

Create a mapping table before touching any file:

| Old token / value | New token | New value |
|-------------------|-----------|-----------|
| `--navy-deep` | `--avo-deep` | `#4A6B28` |
| `#1A2B4A` | `--avo-deep` | `#4A6B28` |

### 3. Update CSS variables in `index.css`

Add new palette variables inside `:root` (or `@theme inline` for Tailwind 4):

```css
:root {
  /* New palette */
  --avo-deep:    #4A6B28;
  --avo-main:    #6A8F3A;
  --avo-mid:     #8FAF5A;
  --avo-light:   #A8D5B5;
  --avo-cream:   #EBF5E1;

  /* Gold accent */
  --gold-satin:    #E8C96B;
  --gold-antique:  #D4A843;
  --gold-harvest:  #F2D06B;
  --gold-champagne:#F7E7A3;
  --gold-ivory:    #F5E6B2;
}
```

Map semantic tokens to new palette:

```css
:root {
  --primary:            var(--avo-main);
  --primary-foreground: #ffffff;
  --background:         var(--avo-cream);
  --foreground:         #1a2010;
  --accent:             var(--gold-satin);
  --accent-foreground:  #1a2010;
}
```

### 4. Bulk-replace hardcoded values in components

```bash
cd client/src

# Replace old token names with new ones (adjust patterns as needed)
sed -i 's/forest-deep/avo-deep/g; s/forest-main/avo-main/g; s/gold-warm/gold-satin/g' \
  $(grep -rl 'forest-deep\|forest-main\|gold-warm' . --include="*.tsx")
```

### 5. Update inline styles

For `style={{ backgroundColor: '...' }}` patterns, search and replace manually:

```bash
grep -rn "backgroundColor\|color:" client/src/ --include="*.tsx" | grep '#'
```

### 6. Verify contrast ratios

Ensure text remains readable:
- Dark text (`#1a2010`) on light backgrounds (`--avo-cream`, `--gold-ivory`): ✓
- White text on dark backgrounds (`--avo-deep`, `--avo-main`): ✓
- Gold text (`--gold-satin`) on dark green (`--avo-deep`): check ≥ 4.5:1

### 7. Restart dev server

```bash
# Vite HMR usually picks up CSS changes automatically.
# If components look broken, restart:
pnpm dev  # or use webdev_restart_server
```

## Common Pitfalls

- **Invisible text**: When swapping dark backgrounds, ensure `color` / `text-*` classes are also updated.
- **Gradient stops**: Search for `rgba(` and `linear-gradient(` — these often contain hardcoded colors.
- **Tailwind `bg-[#hex]` classes**: These bypass CSS variables; replace with semantic classes or CSS variable references.
- **ThemeProvider mismatch**: If `defaultTheme="dark"`, ensure `.dark {}` block in `index.css` uses the new palette too.
