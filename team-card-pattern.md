# Team Member Card Grid Pattern

## Component Structure

```
TeamSection
├── Section header
└── Card grid (2–4 columns)
    └── TeamCard × N
        ├── Photo area (image or initials avatar)
        │   └── Hover overlay (bio + social links)
        ├── Name
        ├── Title / Role
        └── Tags (expertise areas)
```

## Data Shape

```ts
interface TeamMember {
  id: number;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  bioEn: string;
  photo?: string;          // URL — use manus-upload-file --webdev
  initials: string;        // Fallback: "김민" → "김"
  tags: string[];
  tagsEn: string[];
  linkedin?: string;
  email?: string;
}
```

## Two Card Variants

### Variant A: Overlay on Hover (recommended)

Photo fills card; bio slides up from bottom on hover.

```tsx
function TeamCard({ member, lang }: { member: TeamMember; lang: "ko" | "en" }) {
  const [hovered, setHovered] = useState(false);
  const name  = lang === "ko" ? member.name  : member.nameEn;
  const title = lang === "ko" ? member.title : member.titleEn;
  const bio   = lang === "ko" ? member.bio   : member.bioEn;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        aspectRatio: "3/4",
        cursor: "default",
      }}
    >
      {/* Photo / Avatar */}
      {member.photo ? (
        <img
          src={member.photo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(135deg, var(--avo-deep), var(--avo-main))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: 700, color: "var(--gold-satin)",
        }}>
          {member.initials}
        </div>
      )}

      {/* Static bottom strip */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "1rem",
        background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
      }}>
        <div style={{ fontWeight: 700, color: "#fff" }}>{name}</div>
        <div style={{ fontSize: "0.8rem", color: "var(--gold-satin)" }}>{title}</div>
      </div>

      {/* Hover overlay — slides up */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(74,107,40,0.95)",
        padding: "1.5rem",
        display: "flex", flexDirection: "column", justifyContent: "center",
        transform: hovered ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.25rem" }}>
          {name}
        </div>
        <div style={{ color: "var(--gold-satin)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
          {title}
        </div>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.6, opacity: 0.9, marginBottom: "1rem" }}>
          {bio}
        </p>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {(lang === "ko" ? member.tags : member.tagsEn).map(tag => (
            <span key={tag} style={{
              background: "rgba(232,201,107,0.15)",
              color: "var(--gold-satin)",
              border: "1px solid rgba(232,201,107,0.3)",
              borderRadius: 9999,
              padding: "2px 8px",
              fontSize: "0.7rem",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Variant B: Flip Card (3D)

```css
.flip-card { perspective: 1000px; }
.flip-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}
.flip-card:hover .flip-inner { transform: rotateY(180deg); }
.flip-front, .flip-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
}
.flip-back { transform: rotateY(180deg); }
```

> Variant A (overlay) is more mobile-friendly. Use Variant B only for desktop-focused layouts.

## Grid Layout

```tsx
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "1.5rem",
}}>
  {members.map(m => <TeamCard key={m.id} member={m} lang={lang} />)}
</div>
```

## Photo Upload Workflow

```bash
# Upload team photos to webdev static storage
manus-upload-file --webdev path/to/photo-kim.jpg
# Returns: /manus-storage/photo-kim_a1b2c3d4.jpg
# Use this URL directly in member.photo field
```

## Placement

Place in "Who We Are" or "Team" section. For small teams (≤ 4), use a 2-column grid with larger cards. For larger teams, use 3–4 columns with compact cards.
