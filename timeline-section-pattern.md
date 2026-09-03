# Timeline Section Pattern

## Use Cases

- **Company history** (연혁): Year-by-year milestones
- **Process steps** (프로세스): How the service works (Step 1 → Step 2 → …)
- **Roadmap** (로드맵): Past achievements + future plans

## Component Structure

```
TimelineSection
├── Section header
├── Mode toggle (optional): "연혁" | "프로세스"
└── Timeline track
    └── TimelineItem × N
        ├── Connector line (vertical)
        ├── Node dot (gold, pulsing for current/active)
        ├── Year / Step label
        ├── Title
        └── Description
```

## Data Shape

```ts
interface TimelineItem {
  id: number;
  year?: string;          // e.g., "2025" or "Q1 2026"
  step?: string;          // e.g., "STEP 01"
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  tags?: string[];        // Optional highlight tags
  status?: "past" | "current" | "future";
}
```

## Layout: Alternating Left-Right (Desktop) / Single Column (Mobile)

```tsx
function TimelineItem({ item, index, lang }: Props) {
  const isLeft = index % 2 === 0;
  const title = lang === "ko" ? item.title : item.titleEn;
  const desc  = lang === "ko" ? item.description : item.descriptionEn;
  const isCurrent = item.status === "current";

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 48px 1fr",
      gap: "0 1rem",
      marginBottom: "2rem",
    }}>
      {/* Left content */}
      <div style={{
        textAlign: "right",
        paddingRight: "1rem",
        opacity: isLeft ? 1 : 0,
        pointerEvents: isLeft ? "auto" : "none",
      }}>
        {isLeft && <TimelineCard item={item} title={title} desc={desc} />}
      </div>

      {/* Center track */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Node */}
        <div style={{
          width: 16, height: 16,
          borderRadius: "50%",
          background: isCurrent ? "var(--gold-satin)" : "var(--gold-antique)",
          border: "3px solid var(--section-bg)",
          boxShadow: isCurrent ? "0 0 0 4px rgba(232,201,107,0.3)" : "none",
          flexShrink: 0,
          zIndex: 1,
        }} />
        {/* Connector line */}
        <div style={{
          flex: 1,
          width: 2,
          background: "linear-gradient(to bottom, var(--gold-antique), rgba(212,168,67,0.2))",
          marginTop: 4,
        }} />
      </div>

      {/* Right content */}
      <div style={{
        paddingLeft: "1rem",
        opacity: !isLeft ? 1 : 0,
        pointerEvents: !isLeft ? "auto" : "none",
      }}>
        {!isLeft && <TimelineCard item={item} title={title} desc={desc} />}
      </div>
    </div>
  );
}
```

## TimelineCard Sub-component

```tsx
function TimelineCard({ item, title, desc }: { item: TimelineItem; title: string; desc: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(232,201,107,0.15)",
      borderRadius: 10,
      padding: "1rem 1.25rem",
    }}>
      {/* Year / Step badge */}
      <div style={{
        color: "var(--gold-satin)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        marginBottom: "0.4rem",
      }}>
        {item.year ?? item.step}
      </div>
      <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{title}</div>
      <p style={{ fontSize: "0.85rem", opacity: 0.75, lineHeight: 1.6 }}>{desc}</p>
      {/* Tags */}
      {item.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.6rem" }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              background: "rgba(232,201,107,0.12)",
              color: "var(--gold-champagne)",
              borderRadius: 9999,
              padding: "1px 8px",
              fontSize: "0.7rem",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Mobile: Single Column

```css
@media (max-width: 640px) {
  .timeline-grid {
    grid-template-columns: 24px 1fr !important;
  }
  .timeline-left {
    display: none !important;
  }
  .timeline-right {
    opacity: 1 !important;
    pointer-events: auto !important;
  }
}
```

## Scroll-Reveal Animation (Intersection Observer)

```tsx
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// In TimelineItem:
const { ref, visible } = useReveal();
<div ref={ref} style={{
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(24px)",
  transition: "opacity 0.5s ease, transform 0.5s ease",
  transitionDelay: `${index * 0.1}s`,
}}>
```

## Future Items Styling

```tsx
// Dim future items and show "예정" badge
if (item.status === "future") {
  cardStyle.opacity = 0.5;
  cardStyle.borderStyle = "dashed";
}
```

## Placement

Use for "회사 소개" or "비전" sections. Works well with a dark background to make the gold connector line stand out.

```tsx
<WhoWeAreSection />
<TimelineSection lang={lang} />   {/* history or roadmap */}
<WhatWeDoSection />
```
