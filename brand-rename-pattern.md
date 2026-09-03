# 브랜드 명칭 전체 교체 패턴

홈페이지 전체 소스에서 브랜드명·제품명·서비스명을 일괄 교체하는 워크플로우.

---

## 언제 사용하나

- 브랜드/제품명 리브랜딩 시 (예: Moss-Tech → Mossrium)
- KO/EN 이중언어 명칭을 동시에 교체할 때
- 이미지 내 텍스트 포함 여부 확인이 필요할 때

---

## 1단계: 교체 대상 전수 검색

```bash
# 구 명칭의 모든 변형 검색 (대소문자, 띄어쓰기 변형 포함)
grep -rn "구명칭\|구 명칭\|OLD_BRAND\|Old Brand" \
  /home/ubuntu/<project>/client/src/ \
  /home/ubuntu/<project>/server/ \
  --include="*.tsx" --include="*.ts" --include="*.css"
```

결과를 파일별로 정리하여 교체 범위 파악.

---

## 2단계: 일괄 교체 (sed)

```bash
# 단일 파일
sed -i 's/구 명칭/새 명칭/g; s/OLD_BRAND/NEW_BRAND/g' \
  client/src/components/sections/TargetSection.tsx

# 디렉토리 전체
find client/src -name "*.tsx" -o -name "*.ts" | xargs \
  sed -i 's/구 명칭/새 명칭/g'

# KO/EN 동시 교체 (여러 패턴)
sed -i \
  's/구 한국어명/새 한국어명/g' \
  's/Old English Name/New English Name/g' \
  's/OLD-BRAND/NEW-BRAND/g' \
  client/src/components/Navigation.tsx
```

---

## 3단계: 이미지 내 텍스트 교체

이미지 파일 내 브랜드 텍스트는 sed로 교체 불가 → AI 이미지 재생성 필요.

```bash
# 이미지 URL이 하드코딩된 위치 찾기
grep -rn "manus-storage\|/manus-storage" client/src/ | grep -i "brand\|product\|logo"
```

재생성 후 URL 교체:
```bash
sed -i 's|old-image-url-hash|new-image-url-hash|g' \
  client/src/pages/TargetPage.tsx
```

→ 상세 이미지 생성 방법: `brand-image-generation-pattern.md` 참조

---

## 4단계: 교체 완료 검증

```bash
# 구 명칭 잔존 여부 확인
grep -rn "구명칭\|OLD_BRAND" \
  /home/ubuntu/<project>/client/src/ \
  --include="*.tsx" --include="*.ts"
# 결과 없으면 완료
```

---

## 자주 놓치는 위치

| 위치 | 확인 방법 |
|------|-----------|
| Navigation 메뉴 텍스트 | `grep -n "menuItems\|navItems" Navigation.tsx` |
| Hero 섹션 서브타이틀 | `grep -n "subTitle\|subtitle\|hero" HeroSection.tsx` |
| Footer 링크/저작권 | `grep -n "copyright\|brand" Footer.tsx` |
| Insights 카드 태그 | `grep -n "tag\|category" InsightsSection.tsx` |
| 관리자 페이지 | `grep -rn "구명칭" client/src/pages/Admin*.tsx` |
| 메타 태그 (SEO) | `grep -n "title\|description\|og:" index.html` |
| 이메일 템플릿 | `grep -rn "구명칭" server/` |

---

## 이중언어 명칭 교체 체크리스트

```
[ ] KO 명칭 교체 완료
[ ] EN 명칭 교체 완료
[ ] 이미지 내 텍스트 교체 (AI 재생성)
[ ] Navigation 메뉴 교체
[ ] Hero 섹션 교체
[ ] 서비스 소개 섹션 교체
[ ] Insights/SNS 섹션 교체
[ ] Footer 교체
[ ] 관리자 페이지 교체
[ ] 잔존 구 명칭 없음 (grep 검증)
```
