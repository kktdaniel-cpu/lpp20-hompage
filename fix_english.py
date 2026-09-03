import re

# ── WhoWeAreSection ──────────────────────────────────────────────────────────
path = "/home/ubuntu/life20-homepage/client/src/components/sections/WhoWeAreSection.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 이름 수정
content = content.replace("Hong In-cheol", "Hong Inchul")
# 직함 수정 (Research → R&D & Global Business)
content = content.replace(
    '"Director of Research"',
    '"Director of R&D & Global Business"'
)
# 요약 수정 - moss smart farm → Mossrium Solutions
content = content.replace(
    "Leads R&D for moss smart farm technology and overseas business development.",
    "Leads R&D for Mossrium Solutions technology and overseas business development."
)
# EN 팀 설명 - moss agrivoltaic → Mossrium Solutions
content = content.replace(
    "renewable energy, environmental engineering, and global business come together to build a new future for the senior ecosystem.",
    "renewable energy, environmental engineering, and global business have come together to build a new future for the senior ecosystem."
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("WhoWeAreSection 수정 완료")

# ── HeroSection ──────────────────────────────────────────────────────────────
path = "/home/ubuntu/life20-homepage/client/src/components/sections/HeroSection.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# EN desc: moss agrivoltaic → Mossrium Solutions
content = content.replace(
    "sustainable moss agrivoltaic technology.",
    "Mossrium Solutions — our sustainable moss-based air purification and agrivoltaic technology."
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("HeroSection 수정 완료")

# ── WhereWeGoSection ─────────────────────────────────────────────────────────
path = "/home/ubuntu/life20-homepage/client/src/components/sections/WhereWeGoSection.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# moss smart farm → Mossrium Solutions
content = content.replace(
    "Imakiljang platform and moss smart farm connect to create a virtuous circular economy",
    "Imakiljang platform and Mossrium Solutions connect to create a virtuous circular economy"
)
content = content.replace(
    "moss smart farm patent filing",
    "Mossrium Solutions patent filing"
)
content = content.replace(
    "moss terrarium B2B supply begins",
    "Mossrium Solutions B2B supply begins"
)
content = content.replace(
    "A circular economy where moss purifies city air and seniors are its producers.",
    "A circular economy where Mossrium Solutions purifies city air and seniors are its producers."
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("WhereWeGoSection 수정 완료")

# ── HowWeWorkSection ─────────────────────────────────────────────────────────
path = "/home/ubuntu/life20-homepage/client/src/components/sections/HowWeWorkSection.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# "Fast Experiment, Fast Learn" → more natural English
content = content.replace(
    '"Fast Experiment, Fast Learn"',
    '"Experiment Fast, Learn Faster"'
)
content = content.replace(
    '{ num: "04", title: "Fast Experiment, Fast Learn"',
    '{ num: "04", title: "Experiment Fast, Learn Faster"'
)
content = content.replace(
    "We're not afraid to fail, but we're afraid not to learn.",
    "We embrace failure as a learning opportunity and iterate quickly."
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("HowWeWorkSection 수정 완료")

# ── ContactSection ───────────────────────────────────────────────────────────
path = "/home/ubuntu/life20-homepage/client/src/components/sections/ContactSection.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# "Mossrium Solutions Kit" → "Mossrium Solutions"
content = content.replace(
    '"Mossrium Solutions Kit"',
    '"Mossrium Solutions"'
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("ContactSection 수정 완료")

# ── Footer ───────────────────────────────────────────────────────────────────
path = "/home/ubuntu/life20-homepage/client/src/components/Footer.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# CEO 이름 영문 표기 추가 (홍인철 이름 반영)
# Footer에는 CEO: Kim Young-beom만 있으므로 이사 이름 추가
content = content.replace(
    'ceo: "CEO: Kim Young-beom"',
    'ceo: "CEO: Kim Young-beom  |  Director: Hong Inchul"'
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Footer 수정 완료")

# ── InsightsSection ──────────────────────────────────────────────────────────
path = "/home/ubuntu/life20-homepage/client/src/components/sections/InsightsSection.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# moss technology → Mossrium Solutions technology
content = content.replace(
    "expert content on retirement planning, moss technology, and senior trends.",
    "expert content on retirement planning, Mossrium Solutions technology, and senior trends."
)
content = content.replace(
    "How moss purifies indoor air — Smart Bio-Air Terrarium technology explained",
    "How Mossrium Solutions purifies indoor air — Smart Bio-Air Terrarium technology explained"
)
content = content.replace(
    "moss's negative ion generation, VOC adsorption, CO₂ reduction mechanisms",
    "Mossrium's negative ion generation, VOC adsorption, and CO₂ reduction mechanisms"
)
content = content.replace(
    "moss technology introduction videos",
    "Mossrium Solutions introduction videos"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("InsightsSection 수정 완료")

print("\n모든 영문 수정 완료!")
