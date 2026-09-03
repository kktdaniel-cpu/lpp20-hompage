# 브랜드 AI 이미지 생성 패턴

제품 개념도·기술 일러스트·브랜드 비주얼을 AI로 생성하여 홈페이지에 적용하는 패턴.

---

## 언제 사용하나

- 제품/기술 소개 섹션에 브랜드 로고가 포함된 제품 이미지가 필요할 때
- 기존 이미지의 브랜드명(로고 텍스트)을 교체해야 할 때
- 기술 흐름(공기 정화, 데이터 흐름, 프로세스 다이어그램 등)을 한 장에 시각화할 때

---

## 프롬프트 구조

### 제품 개념도 (기술 흐름 시각화)

```
[제품 외형 묘사] + [기술 흐름 묘사] + [브랜드 표시] + [스타일 지시]

예시:
"A premium indoor [제품명] air purification product concept illustration.
Wide-format horizontal cross-section view showing:
- Left side: [입력 요소] with [흐름 묘사]
- Center: [핵심 기술 요소] with [동작 묘사]
- Right side: [출력 요소]
- Bottom: [필터/정화 단계] labeled as [단계명]
Brand label '[브랜드명]' and '[서브브랜드]' visible on the product.
Style: premium product diagram, photorealistic render, [배경색] background,
[강조색] accent lighting, [폰트 스타일] typography for labels,
clean infographic annotations with arrows showing flow direction."
```

### 제품 외관 (브랜드 로고 포함)

```
"Premium [제품 카테고리] product photograph.
[제품 형태 묘사 — 크기, 소재, 색상].
[내부 구조 묘사 — 이끼, 식물, 조명 등].
Brand logo '[브랜드명]' prominently displayed on [위치].
[환경 묘사 — 실내, 조명, 배경].
Style: [스타일 — luxury product photo / editorial / concept art],
[조명 묘사], [색상 팔레트]."
```

---

## 적용 워크플로우

1. **기존 이미지 분석** — 교체할 이미지의 구도·색상·브랜드 요소 파악
2. **프롬프트 작성** — 위 구조에 맞게 구체적으로 작성 (브랜드명 명시 필수)
3. **이미지 생성** — `generate` 모드로 생성, 저장 경로: `/home/ubuntu/webdev-static-assets/`
4. **스토리지 업로드** — `manus-upload-file --webdev <파일경로>` 실행
5. **코드 교체** — 컴포넌트에서 기존 URL을 반환된 URL로 교체

```bash
# 업로드 후 URL 확인
manus-upload-file --webdev /home/ubuntu/webdev-static-assets/new-image.png
# 반환 예: /manus-storage/new-image-abc123.png

# sed로 기존 URL 교체
sed -i 's|old-image-url|/manus-storage/new-image-abc123.png|g' \
  client/src/pages/TargetPage.tsx
```

---

## 색상 팔레트 연동 팁

| 팔레트 계열 | 프롬프트 키워드 |
|------------|----------------|
| 아보카도 그린 | `forest green`, `avocado green`, `#4A6B28 background` |
| 골드 강조 | `warm gold accent`, `satin gold lighting`, `#E8C96B highlights` |
| 다크 프리미엄 | `deep olive background`, `luxury dark green`, `muted earth tones` |
| 밝은 자연 | `soft cream`, `light sage`, `natural daylight` |

---

## 주의사항

- 브랜드 로고 텍스트는 AI 생성 이미지에서 오타가 발생할 수 있음 → 생성 후 반드시 확인
- 가로형(Wide) 제품 이미지: `wide-format`, `16:9 aspect ratio` 명시
- 세로형(Tall) 제품 이미지: `portrait orientation`, `tall product` 명시
- 다이어그램 레이블이 중요한 경우: 생성 후 별도 텍스트 오버레이 고려
