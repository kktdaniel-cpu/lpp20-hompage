# Animated Stats Counter Pattern

## Component Structure

```
StatsSection
├── Section header (optional)
└── Stats grid (2–4 columns)
    └── StatCard × N
        ├── Icon (optional)
        ├── Animated number
        ├── Suffix ("+", "%", "만" etc.)
        └── Label
```

## Data Shape

```ts
interface Stat {
  id: number;
  value: number;       // Target number to count up to
  suffix: string;      // e.g., "+", "%", "만명", "개"
  label: string;
  labelEn: string;
  icon?: React.ReactNode;
  prefix?: string;     // e.g., "₩", "$"
  decimals?: number;   // Decimal places (default 0)
}
```

## Core Hook: useCountUp

```tsx
import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer — start only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress >= 1) clearInterval(tick);
    }, 16);
    return () => clearInterval(tick);
  }, [started, target, duration, decimals]);

  return { count, ref };
}
```

## Usage in StatCard

```tsx
function StatCard({ stat, lang }: { stat: Stat; lang: "ko" | "en" }) {
  const { count, ref } = useCountUp(stat.value, 2000, stat.decimals ?? 0);
  const label = lang === "ko" ? stat.label : stat.labelEn;

  return (
    <div ref={ref} style={{ textAlign: "center", padding: "2rem 1rem" }}>
      {stat.icon && (
        <div style={{ color: "var(--gold-satin)", marginBottom: "0.75rem" }}>
          {stat.icon}
        </div>
      )}
      <div style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: 800,
        color: "var(--gold-satin)",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}>
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </div>
      <div style={{
        marginTop: "0.5rem",
        fontSize: "0.9rem",
        opacity: 0.75,
        letterSpacing: "0.05em",
      }}>
        {label}
      </div>
    </div>
  );
}
```

## Grid Layout

```tsx
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "1px",               // 1px gap creates divider lines
  background: "rgba(255,255,255,0.1)",  // divider color
}}>
  {stats.map(stat => (
    <div key={stat.id} style={{ background: "var(--section-bg)" }}>
      <StatCard stat={stat} lang={lang} />
    </div>
  ))}
</div>
```

## Divider Line Between Cards (alternative)

```tsx
// Add vertical dividers between items (not after last)
{stats.map((stat, i) => (
  <React.Fragment key={stat.id}>
    <StatCard stat={stat} lang={lang} />
    {i < stats.length - 1 && (
      <div style={{
        width: 1,
        background: "rgba(232,201,107,0.25)",
        alignSelf: "stretch",
        margin: "1rem 0",
      }} />
    )}
  </React.Fragment>
))}
```

## Placement

Stats work well:
- **Inside Hero section** (bottom strip) — immediate impact
- **After Who We Are** — reinforces credibility with numbers
- **Standalone section** — between two content sections for visual break

## Common Stat Examples (Life 2.0 / Senior Tech)

```ts
const stats: Stat[] = [
  { id: 1, value: 2025,  suffix: "",   label: "설립 연도",      labelEn: "Founded" },
  { id: 2, value: 4,     suffix: "+",  label: "핵심 사업 영역", labelEn: "Business Areas" },
  { id: 3, value: 1000,  suffix: "만+",label: "잠재 고객 규모", labelEn: "Target Market" },
  { id: 4, value: 100,   suffix: "%",  label: "K-Taxonomy 인증",labelEn: "K-Taxonomy Certified" },
];
```
