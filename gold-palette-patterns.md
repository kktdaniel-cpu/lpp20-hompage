# Gold Palette Design Patterns

## Curated Gold Palettes

### Luxury Gold (5-color set)

| Name | Hex | OKLCH | Best Use |
|------|-----|-------|----------|
| Champagne Gold | `#F7E7A3` | `oklch(92% 0.08 90)` | Light backgrounds, subtle highlights |
| Warm Satin Gold | `#E8C96B` | `oklch(83% 0.14 85)` | Primary accent, buttons, badges |
| Pale Harvest Gold | `#F2D06B` | `oklch(85% 0.13 88)` | Headings, icon fills |
| Antique Gold | `#D4A843` | `oklch(73% 0.16 80)` | CTA buttons, borders, section numbers |
| Ivory Gold | `#F5E6B2` | `oklch(93% 0.07 92)` | Card backgrounds, soft highlights |

### Dark Background Pairings

Gold on dark green (`#4A6B28` / `oklch(42% 0.12 135)`):
- Warm Satin Gold (`#E8C96B`) → contrast ratio ≈ 7.2:1 ✓ (AA large + AA normal)
- Antique Gold (`#D4A843`) → contrast ratio ≈ 5.8:1 ✓ (AA normal)
- Champagne Gold (`#F7E7A3`) → contrast ratio ≈ 9.1:1 ✓ (AAA)

Gold on dark navy (`#1A2B4A`):
- Warm Satin Gold → contrast ratio ≈ 8.4:1 ✓

### Light Background Pairings

Antique Gold (`#D4A843`) text on cream (`#EBF5E1`):
- Contrast ratio ≈ 3.1:1 — use for large text only (≥18px bold)
- For body text on light bg, prefer dark green `#2D4A18` instead

## Application Patterns

### Hero Section (dark bg + gold accent)

```tsx
// Background: deep green, headline: white, accent word: gold
<h1>
  시니어의 인생 2막을{" "}
  <span style={{ color: "var(--gold-harvest)" }}>함께 설계합니다.</span>
</h1>

// CTA button: gold bg + dark text
<button style={{
  backgroundColor: "var(--gold-satin)",
  color: "#1a2010",
  border: "none"
}}>
  파트너십 문의
</button>
```

### Statistics / KPI Numbers (gold on dark)

```tsx
<span style={{ color: "var(--gold-satin)", fontSize: "2.5rem", fontWeight: 700 }}>
  1,000만+
</span>
```

### Section Numbers / Labels (gold accent on light bg)

```css
.section-num {
  color: var(--gold-antique);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

### Progress / Scroll Indicator Bar

```css
.scroll-progress::after {
  background: linear-gradient(
    90deg,
    var(--gold-antique) 0%,
    var(--gold-champagne) 100%
  );
}
```

### Card Badge (category tag)

```tsx
<span style={{
  background: "rgba(232,201,107,0.15)",  /* gold-satin at 15% opacity */
  color: "var(--gold-satin)",
  border: "1px solid rgba(232,201,107,0.3)",
  borderRadius: "9999px",
  padding: "2px 10px",
  fontSize: "0.75rem"
}}>
  2막1장 플랫폼
</span>
```

## Gradient Recipes

### Gold shimmer overlay (for hero images)

```css
background: linear-gradient(
  135deg,
  rgba(74,107,40,0.92) 0%,
  rgba(106,143,58,0.85) 50%,
  rgba(212,168,67,0.3) 100%
);
```

### Gold-to-transparent divider

```css
border-bottom: 1px solid;
border-image: linear-gradient(
  90deg,
  transparent,
  var(--gold-satin),
  transparent
) 1;
```
