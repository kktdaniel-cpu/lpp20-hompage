# FAQ Accordion Section Pattern

## Component Structure

```
FAQSection
├── Section header (number + label + title + subtitle)
├── Category filter tabs (optional)
└── Accordion list
    └── AccordionItem × N
        ├── Question row (icon + text + chevron)
        └── Answer panel (collapsible, animated)
```

## Data Shape

```ts
interface FAQItem {
  id: number;
  category: string;       // e.g., "서비스", "요금", "파트너십"
  categoryEn: string;
  question: string;
  questionEn: string;
  answer: string;         // Markdown or plain text
  answerEn: string;
}
```

## Open/Close State Logic

```tsx
const [openId, setOpenId] = useState<number | null>(null);

const toggle = (id: number) =>
  setOpenId(prev => (prev === id ? null : id));
```

For multi-open accordion (allow several items open at once):

```tsx
const [openIds, setOpenIds] = useState<Set<number>>(new Set());

const toggle = (id: number) =>
  setOpenIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
```

## Smooth Height Animation (CSS only)

```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}
.accordion-content.open {
  grid-template-rows: 1fr;
}
.accordion-inner {
  overflow: hidden;
}
```

```tsx
<div className={`accordion-content ${isOpen ? "open" : ""}`}>
  <div className="accordion-inner">
    <p style={{ padding: "1rem 1.5rem 1.5rem" }}>{answer}</p>
  </div>
</div>
```

> Avoid `max-height` animation — it causes layout jank. The `grid-template-rows: 0fr → 1fr` trick is smooth and requires no JS height measurement.

## Gold Accent Styling

```tsx
// Question row
<button
  onClick={() => toggle(item.id)}
  style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1.25rem 1.5rem",
    background: isOpen ? "rgba(232,201,107,0.08)" : "transparent",
    border: "none",
    borderLeft: isOpen ? "3px solid var(--gold-satin)" : "3px solid transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
  }}
>
  {/* Number badge */}
  <span style={{
    minWidth: 28, height: 28,
    borderRadius: "50%",
    background: isOpen ? "var(--gold-satin)" : "rgba(255,255,255,0.1)",
    color: isOpen ? "#1a2010" : "inherit",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.75rem", fontWeight: 700,
    transition: "all 0.2s ease",
  }}>
    {String(item.id).padStart(2, "0")}
  </span>

  <span style={{ flex: 1, fontWeight: isOpen ? 600 : 400 }}>
    {question}
  </span>

  {/* Chevron icon — rotate when open */}
  <ChevronDown
    size={18}
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
      color: isOpen ? "var(--gold-satin)" : "currentColor",
    }}
  />
</button>
```

## Category Filter Tabs

```tsx
const categories = ["전체", "서비스", "요금", "파트너십"];
const [activeCategory, setActiveCategory] = useState("전체");

const filtered = activeCategory === "전체"
  ? faqs
  : faqs.filter(f => f.category === activeCategory);
```

Tab styling (gold underline for active):

```tsx
<button
  onClick={() => setActiveCategory(cat)}
  style={{
    padding: "0.5rem 1rem",
    background: "none",
    border: "none",
    borderBottom: activeCategory === cat
      ? "2px solid var(--gold-satin)"
      : "2px solid transparent",
    color: activeCategory === cat ? "var(--gold-satin)" : "inherit",
    fontWeight: activeCategory === cat ? 600 : 400,
    cursor: "pointer",
    transition: "all 0.2s ease",
  }}
>
  {cat}
</button>
```

## Placement

Place after the main service/feature section and before Contact. FAQ reduces friction before the CTA.

```tsx
<WhatWeDoSection />
<FAQSection lang={lang} />
<ContactSection lang={lang} />
```

## Accessibility

- Use `<button>` (not `<div>`) for the toggle trigger
- Add `aria-expanded={isOpen}` and `aria-controls="answer-{id}"` to the button
- Add `id="answer-{id}"` and `role="region"` to the answer panel
