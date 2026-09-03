# Testimonial Slider Section Pattern

## Component Structure

```
TestimonialsSection
├── Section header (number + label + title + subtitle)
├── Rating summary (average score + star icons + review count)
├── Navigation arrows (prev / next)
├── Review card
│   ├── Category badge (gold)
│   ├── Star rating
│   ├── Quote text (large, serif or italic)
│   ├── Reviewer avatar (initials, gold gradient)
│   └── Reviewer info (name, title, location) + slide counter
├── Progress bar (gold, auto-advances)
└── Dot indicators
```

## Data Shape

```ts
interface Testimonial {
  id: number;
  name: string;       // Korean name
  nameEn: string;     // English name
  title: string;      // Job title / context (KO)
  titleEn: string;    // Job title / context (EN)
  location: string;
  category: string;   // Badge label (KO)
  categoryEn: string; // Badge label (EN)
  rating: number;     // 1–5
  text: string;       // Review body (KO)
  textEn: string;     // Review body (EN)
}
```

## Auto-slider Logic (React)

```tsx
const INTERVAL_MS = 5000;
const [current, setCurrent] = useState(0);
const [progress, setProgress] = useState(0);
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (isPaused) return;
  const start = Date.now();
  const tick = setInterval(() => {
    const elapsed = Date.now() - start;
    const pct = Math.min((elapsed / INTERVAL_MS) * 100, 100);
    setProgress(pct);
    if (pct >= 100) {
      setCurrent(c => (c + 1) % testimonials.length);
      setProgress(0);
      clearInterval(tick);
    }
  }, 50);
  return () => clearInterval(tick);
}, [current, isPaused]);
```

## Gold Progress Bar

```tsx
{/* Thin bar at top of card or section */}
<div style={{ height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
  <div style={{
    height: "100%",
    width: `${progress}%`,
    background: "linear-gradient(90deg, var(--gold-antique), var(--gold-champagne))",
    transition: "width 50ms linear",
    borderRadius: 2
  }} />
</div>
```

## Slide Transition (CSS fade)

```css
.testimonial-card {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.testimonial-card.entering {
  opacity: 0;
  transform: translateX(20px);
}
.testimonial-card.visible {
  opacity: 1;
  transform: translateX(0);
}
```

Or use React key prop to trigger re-mount animation:

```tsx
<div key={current} className="animate-fade-in">
  {/* card content */}
</div>
```

Add to `index.css`:

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}
.animate-fade-in { animation: fade-in 0.4s ease forwards; }
```

## Avatar (Initials, Gold Gradient)

```tsx
const initials = name.slice(0, 1); // Korean: first char

<div style={{
  width: 48, height: 48, borderRadius: "50%",
  background: "linear-gradient(135deg, var(--gold-antique), var(--gold-satin))",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#1a2010", fontWeight: 700, fontSize: "1.1rem"
}}>
  {initials}
</div>
```

## Dot Indicators

```tsx
{testimonials.map((_, i) => (
  <button
    key={i}
    aria-label={`리뷰 ${i + 1}`}
    onClick={() => { setCurrent(i); setProgress(0); }}
    style={{
      width: i === current ? 24 : 8,
      height: 8,
      borderRadius: 4,
      background: i === current ? "var(--gold-satin)" : "rgba(255,255,255,0.3)",
      transition: "all 0.3s ease",
      border: "none", cursor: "pointer"
    }}
  />
))}
```

## Bilingual (KO/EN) Support

Consume language context from parent or pass as prop:

```tsx
// In parent (Home.tsx or language context)
const { lang } = useLanguage(); // 'ko' | 'en'

// In TestimonialsSection
const t = testimonials[current];
const displayText  = lang === 'ko' ? t.text  : t.textEn;
const displayName  = lang === 'ko' ? t.name  : t.nameEn;
const displayTitle = lang === 'ko' ? t.title : t.titleEn;
```

## Placement

Insert between the last content section (e.g., Insights) and the Contact/CTA section. This maximises social proof impact just before conversion.

```tsx
// Home.tsx
<InsightsSection lang={lang} />
<TestimonialsSection lang={lang} />   {/* ← here */}
<ContactSection lang={lang} />
```
