# PDF 다운로드 버튼 패턴

섹션 하단에 기술 소개서·카탈로그·브로셔 등 PDF 파일을 다운로드할 수 있는 버튼 UI를 추가하는 패턴.

---

## 언제 사용하나

- 제품/서비스 섹션 하단에 기술 소개서 다운로드 버튼이 필요할 때
- 복수의 PDF 파일(예: Tree100, Moss-Rium)을 나란히 제공할 때
- 특정 탭/카테고리 선택 시에만 다운로드 버튼을 표시할 때

---

## PDF 플레이스홀더 생성

실제 파일이 없을 때 fpdf2로 샘플 PDF 생성:

```python
from fpdf import FPDF

def make_pdf(title, subtitle, filename):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 24)
    pdf.cell(0, 20, title, ln=True, align="C")
    pdf.set_font("Helvetica", "", 14)
    pdf.cell(0, 10, subtitle, ln=True, align="C")
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 10, "실제 소개서 파일로 교체 예정입니다.", ln=True, align="C")
    pdf.output(filename)

make_pdf("Tree100 기술 소개서", "Agrivoltaic Ecosystem Technology", "tree100-brochure.pdf")
make_pdf("Moss-Rium 기술 소개서", "Smart Bio-Air Terrarium", "mossrium-brochure.pdf")
```

스토리지 업로드:
```bash
cd /home/ubuntu/webdev-static-assets
manus-upload-file --webdev tree100-brochure.pdf mossrium-brochure.pdf
```

---

## React 컴포넌트 패턴

### 기본 구조 (골드 팔레트 적용)

```tsx
{/* 구분선 */}
<div style={{ borderTop: "1px solid rgba(232,201,107,0.3)", marginTop: "2rem", paddingTop: "1.5rem" }}>
  <p style={{ color: "var(--gold-champagne)", fontSize: "0.75rem", marginBottom: "0.75rem", letterSpacing: "0.1em" }}>
    {lang === "ko" ? "기술 소개서 다운로드" : "TECHNICAL BROCHURES"}
  </p>
  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
    {[
      { label: lang === "ko" ? "Tree100 기술 소개서" : "Tree100 Brochure", url: TREE100_PDF_URL },
      { label: lang === "ko" ? "Moss-Rium 기술 소개서" : "Moss-Rium Brochure", url: MOSSRIUM_PDF_URL },
    ].map((item) => (
      <a
        key={item.label}
        href={item.url}
        download
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.5rem 1rem",
          border: "1px solid var(--gold-satin)",
          borderRadius: "4px",
          color: "var(--gold-satin)",
          fontSize: "0.85rem",
          textDecoration: "none",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--gold-satin)";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--avo-deep)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-satin)";
        }}
      >
        <FileText size={14} />
        {item.label}
        <Download size={12} />
      </a>
    ))}
  </div>
  <p style={{ color: "rgba(245,230,178,0.5)", fontSize: "0.7rem", marginTop: "0.5rem" }}>
    {lang === "ko" ? "* 현재 샘플입니다. 실제 소개서는 곧 제공됩니다." : "* Sample files. Official brochures coming soon."}
  </p>
</div>
```

필요한 import:
```tsx
import { FileText, Download } from "lucide-react";
```

---

## 조건부 표시 (특정 탭에서만)

```tsx
{/* active === 1 이 Mossrium 탭인 경우 */}
{active === 1 && (
  <div>
    {/* 위 다운로드 버튼 블록 */}
  </div>
)}
```

---

## 실제 파일 교체 방법

1. 사용자로부터 PDF 파일 수신
2. `/home/ubuntu/webdev-static-assets/`에 저장
3. `manus-upload-file --webdev <파일명>.pdf` 실행
4. 반환된 URL로 컴포넌트 내 `TREE100_PDF_URL` / `MOSSRIUM_PDF_URL` 상수 교체

---

## CSS 변수 참조

| 변수 | 값 | 용도 |
|------|----|------|
| `--gold-satin` | `#E8C96B` | 버튼 테두리·텍스트·호버 배경 |
| `--gold-champagne` | `#F7E7A3` | 섹션 레이블 텍스트 |
| `--gold-ivory` | `#F5E6B2` | 안내 문구 (반투명) |
| `--avo-deep` | `#4A6B28` | 호버 시 버튼 텍스트 색 |
