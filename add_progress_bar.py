"""
2막1장 진단 HTML 파일에 sticky 진행 상태바 추가
- topnav 아래에 sticky progress bar 삽입
- 기존 progress-wrap은 유지 (폼 카드 내부 컨텍스트용)
- 새 sticky bar는 항상 상단에 고정되어 스크롤해도 보임
- showStep() 함수에서 sticky bar도 함께 업데이트
"""

with open('/home/ubuntu/upload/2막1장_life20_v4.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. sticky progress bar CSS 추가 (</style> 바로 앞)
sticky_css = """
  /* ===== STICKY PROGRESS BAR ===== */
  .sticky-progress {
    position: sticky;
    top: 61px; /* topnav 높이 아래 */
    z-index: 90;
    background: rgba(250,246,238,0.97);
    border-bottom: 1px solid var(--line-soft);
    backdrop-filter: blur(12px);
    padding: 10px 32px;
    display: none; /* 폼 화면에서만 표시 */
  }
  .sticky-progress.visible { display: block; }
  .sticky-progress-inner {
    max-width: 720px;
    margin: 0 auto;
  }
  .sticky-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .sticky-progress-steps {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .sticky-step-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--muted);
    font-weight: 500;
    white-space: nowrap;
  }
  .sticky-step-item .step-num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    transition: all 0.3s;
    flex-shrink: 0;
  }
  .sticky-step-item.active .step-num {
    background: var(--green);
    border-color: var(--green);
    color: white;
  }
  .sticky-step-item.done .step-num {
    background: var(--burgundy);
    border-color: var(--burgundy);
    color: white;
  }
  .sticky-step-item.active { color: var(--green-deep); font-weight: 600; }
  .sticky-step-item.done { color: var(--burgundy); }
  .sticky-step-connector {
    width: 24px;
    height: 2px;
    background: var(--line);
    border-radius: 2px;
    transition: background 0.3s;
    flex-shrink: 0;
  }
  .sticky-step-connector.done { background: var(--burgundy); }
  .sticky-progress-bar-wrap {
    height: 4px;
    background: var(--line-soft);
    border-radius: 100px;
    overflow: hidden;
    margin-top: 8px;
  }
  .sticky-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--green) 0%, var(--gold) 60%, var(--burgundy) 100%);
    border-radius: 100px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .sticky-progress-label {
    font-size: 12px;
    color: var(--muted);
    font-weight: 500;
  }
  .sticky-progress-label strong { color: var(--green-deep); }
  .sticky-progress-percent {
    font-size: 13px;
    font-weight: 700;
    color: var(--burgundy);
  }
  @media (max-width: 600px) {
    .sticky-progress { padding: 8px 16px; }
    .sticky-step-item .step-label { display: none; }
    .sticky-step-connector { width: 12px; }
  }
"""

html = html.replace('</style>', sticky_css + '\n</style>', 1)

# 2. sticky progress bar HTML 삽입 (</nav> 바로 다음)
sticky_html = """
<!-- ===== STICKY PROGRESS BAR ===== -->
<div class="sticky-progress" id="stickyProgress">
  <div class="sticky-progress-inner">
    <div class="sticky-progress-header">
      <div class="sticky-progress-label">Step <strong id="stickyStepNow">1</strong> / 4 &nbsp;·&nbsp; <span id="stickyStepName">기본 정보</span></div>
      <div class="sticky-progress-percent" id="stickyProgressPercent">25%</div>
    </div>
    <div class="sticky-progress-steps">
      <div class="sticky-step-item active" id="stickyDot1">
        <div class="step-num">1</div>
        <span class="step-label">기본 정보</span>
      </div>
      <div class="sticky-step-connector" id="stickyConn1"></div>
      <div class="sticky-step-item" id="stickyDot2">
        <div class="step-num">2</div>
        <span class="step-label">재무 현황</span>
      </div>
      <div class="sticky-step-connector" id="stickyConn2"></div>
      <div class="sticky-step-item" id="stickyDot3">
        <div class="step-num">3</div>
        <span class="step-label">보험·건강</span>
      </div>
      <div class="sticky-step-connector" id="stickyConn3"></div>
      <div class="sticky-step-item" id="stickyDot4">
        <div class="step-num">4</div>
        <span class="step-label">가족·상속</span>
      </div>
    </div>
    <div class="sticky-progress-bar-wrap">
      <div class="sticky-progress-fill" id="stickyProgressFill" style="width: 25%;"></div>
    </div>
  </div>
</div>
"""

html = html.replace('</nav>\n<div class="page">', '</nav>\n' + sticky_html + '\n<div class="page">', 1)

# 3. showStep() 함수에 sticky bar 업데이트 로직 추가
step_names = ['기본 정보', '재무 현황', '보험·건강', '가족·상속']
sticky_update_js = """
  // Sticky progress bar 업데이트
  const stepNames = ['기본 정보', '재무 현황', '보험·건강', '가족·상속'];
  const stickyEl = document.getElementById('stickyProgress');
  if (stickyEl) {
    stickyEl.classList.add('visible');
    document.getElementById('stickyStepNow').textContent = step;
    document.getElementById('stickyStepName').textContent = stepNames[step - 1];
    document.getElementById('stickyProgressPercent').textContent = (step * 25) + '%';
    document.getElementById('stickyProgressFill').style.width = (step * 25) + '%';
    for (let i = 1; i <= 4; i++) {
      const dot = document.getElementById('stickyDot' + i);
      const conn = document.getElementById('stickyConn' + i);
      if (dot) {
        dot.classList.remove('active', 'done');
        if (i < step) dot.classList.add('done');
        else if (i === step) dot.classList.add('active');
      }
      if (conn) {
        conn.classList.toggle('done', i < step);
      }
    }
  }
"""

# showStep 함수 내 window.scrollTo 바로 앞에 삽입
old_scroll = "  window.scrollTo({ top: 0, behavior: 'smooth' });"
new_scroll = sticky_update_js + "\n" + old_scroll

html = html.replace(old_scroll, new_scroll, 1)

# 4. 저장
with open('/home/ubuntu/webdev-static-assets/imakiljang_diagnosis_v4.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done! File saved.")
print(f"Total length: {len(html)} chars")
