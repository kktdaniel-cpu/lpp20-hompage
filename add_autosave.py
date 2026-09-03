"""
2막1장 진단 HTML 파일에 임시 저장 기능 + sticky 진행 상태바 추가
- 원본 파일 기준으로 작업 (upload 폴더의 원본)
"""

with open('/home/ubuntu/upload/2막1장_life20_v4.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ============================================================
# 1. CSS 추가 (</style> 바로 앞)
# ============================================================
extra_css = """
  /* ===== STICKY PROGRESS BAR ===== */
  .sticky-progress {
    position: sticky;
    top: 61px;
    z-index: 90;
    background: rgba(250,246,238,0.97);
    border-bottom: 1px solid var(--line-soft);
    backdrop-filter: blur(12px);
    padding: 10px 32px;
    display: none;
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
  .sticky-step-item.active .step-num { background: var(--green); border-color: var(--green); color: white; }
  .sticky-step-item.done .step-num { background: var(--burgundy); border-color: var(--burgundy); color: white; }
  .sticky-step-item.active { color: var(--green-deep); font-weight: 600; }
  .sticky-step-item.done { color: var(--burgundy); }
  .sticky-step-connector {
    width: 20px; height: 2px;
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
  .sticky-progress-label { font-size: 12px; color: var(--muted); font-weight: 500; }
  .sticky-progress-label strong { color: var(--green-deep); }
  .sticky-progress-percent { font-size: 13px; font-weight: 700; color: var(--burgundy); }
  .sticky-save-btn {
    background: none;
    border: 1.5px solid var(--green);
    color: var(--green-deep);
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .sticky-save-btn:hover { background: var(--green); color: white; }
  .sticky-save-btn.saved { background: var(--green); color: white; border-color: var(--green); }

  /* ===== TOAST NOTIFICATION ===== */
  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #1a2e1a;
    color: white;
    padding: 12px 24px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    white-space: nowrap;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* ===== RESUME BANNER ===== */
  .resume-banner {
    display: none;
    max-width: 720px;
    margin: 0 auto 24px;
    padding: 16px 24px;
    background: linear-gradient(135deg, #f0f7f0, #e8f4e8);
    border: 1.5px solid var(--green);
    border-radius: 16px;
    align-items: center;
    gap: 16px;
  }
  .resume-banner.show { display: flex; }
  .resume-banner-icon { font-size: 28px; flex-shrink: 0; }
  .resume-banner-text { flex: 1; }
  .resume-banner-text strong { display: block; color: var(--green-deep); font-size: 15px; margin-bottom: 2px; }
  .resume-banner-text span { font-size: 13px; color: var(--muted); }
  .resume-banner-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .resume-btn-continue {
    background: var(--green);
    color: white;
    border: none;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .resume-btn-continue:hover { background: var(--green-deep); }
  .resume-btn-discard {
    background: none;
    border: 1.5px solid var(--line);
    color: var(--muted);
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .resume-btn-discard:hover { border-color: var(--burgundy); color: var(--burgundy); }
  @media (max-width: 600px) {
    .sticky-progress { padding: 8px 16px; }
    .sticky-step-item .step-label { display: none; }
    .sticky-step-connector { width: 10px; }
    .resume-banner { flex-direction: column; align-items: flex-start; }
    .resume-banner-actions { width: 100%; }
    .resume-btn-continue, .resume-btn-discard { flex: 1; text-align: center; }
  }
"""

html = html.replace('</style>', extra_css + '\n</style>', 1)

# ============================================================
# 2. Toast + Sticky Progress Bar + Resume Banner HTML 삽입
#    </nav> 바로 다음에 삽입
# ============================================================
extra_html = """
<!-- ===== TOAST ===== -->
<div class="toast" id="toast"></div>

<!-- ===== STICKY PROGRESS BAR ===== -->
<div class="sticky-progress" id="stickyProgress">
  <div class="sticky-progress-inner">
    <div class="sticky-progress-header">
      <div class="sticky-progress-label">Step <strong id="stickyStepNow">1</strong> / 4 &nbsp;·&nbsp; <span id="stickyStepName">기본 정보</span></div>
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="sticky-save-btn" id="stickySaveBtn" onclick="saveProgress()">💾 임시 저장</button>
        <div class="sticky-progress-percent" id="stickyProgressPercent">25%</div>
      </div>
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

# </nav> 바로 다음 위치에 삽입
html = html.replace('</nav>\n<div class="page">', '</nav>\n' + extra_html + '\n<div class="page">', 1)

# ============================================================
# 3. Resume Banner를 progress-wrap 앞에 삽입
# ============================================================
resume_banner_html = """    <!-- Resume Banner -->
    <div class="resume-banner" id="resumeBanner">
      <div class="resume-banner-icon">📋</div>
      <div class="resume-banner-text">
        <strong>이전에 저장된 진단 내용이 있습니다</strong>
        <span id="resumeSavedTime">저장 시각을 불러오는 중...</span>
      </div>
      <div class="resume-banner-actions">
        <button class="resume-btn-continue" onclick="resumeProgress()">이어서 진행하기</button>
        <button class="resume-btn-discard" onclick="discardProgress()">새로 시작</button>
      </div>
    </div>
"""

# progress-wrap div 앞에 삽입
html = html.replace('    <!-- Progress -->\n    <div class="progress-wrap">', 
                    resume_banner_html + '\n    <!-- Progress -->\n    <div class="progress-wrap">', 1)

# ============================================================
# 4. showStep() 함수에 sticky bar 업데이트 + 자동 저장 추가
# ============================================================
old_scroll = "  window.scrollTo({ top: 0, behavior: 'smooth' });"
sticky_and_autosave_js = """
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
      if (conn) conn.classList.toggle('done', i < step);
    }
  }
  // 단계 이동 시 자동 저장 (조용히)
  autoSaveProgress();
"""
new_scroll = sticky_and_autosave_js + "\n" + old_scroll
html = html.replace(old_scroll, new_scroll, 1)

# ============================================================
# 5. 임시 저장 관련 JS를 </script> 바로 앞에 추가
# ============================================================
autosave_js = """
// ===== 임시 저장 기능 =====
const SAVE_KEY = 'life20_diagnosis_draft';

function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function collectCurrentFormData() {
  // 현재 화면에 보이는 폼 데이터를 수집
  const data = { ...userData };
  // Step 1 필드
  const ageEl = document.getElementById('age');
  if (ageEl && ageEl.value) data._age = ageEl.value;
  const genderEl = document.querySelector('input[name="gender"]:checked');
  if (genderEl) data._gender = genderEl.value;
  const jobEl = document.querySelector('input[name="job"]:checked');
  if (jobEl) data._job = jobEl.value;
  const retirementEl = document.getElementById('retirement');
  if (retirementEl && retirementEl.value) data._retirement = retirementEl.value;
  // Step 2 필드
  const expEl = document.getElementById('monthlyExpense');
  if (expEl && expEl.value) data._monthlyExpense = expEl.value;
  const incomeEl = document.getElementById('monthlyIncome');
  if (incomeEl && incomeEl.value) data._monthlyIncome = incomeEl.value;
  const pensionEl = document.querySelector('input[name="hasPension"]:checked');
  if (pensionEl) data._hasPension = pensionEl.value;
  // Step 3 보험 상태
  data._insStatuses = { ...insStatuses };
  // Step 4 필드
  const welldyingEls = document.querySelectorAll('input[name="welldying"]:checked');
  if (welldyingEls.length) data._welldying = Array.from(welldyingEls).map(e => e.value);
  const inheritEl = document.querySelector('input[name="inherit"]:checked');
  if (inheritEl) data._inherit = inheritEl.value;
  return data;
}

function saveProgress() {
  const formData = collectCurrentFormData();
  const savePayload = {
    step: currentStep,
    userData: formData,
    insStatuses: insStatuses,
    savedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(savePayload));
    showToast('✅ 임시 저장 완료! 나중에 이어서 진행하실 수 있습니다.');
    const btn = document.getElementById('stickySaveBtn');
    if (btn) {
      btn.textContent = '✓ 저장됨';
      btn.classList.add('saved');
      setTimeout(() => { btn.textContent = '💾 임시 저장'; btn.classList.remove('saved'); }, 2000);
    }
  } catch(e) {
    showToast('저장 중 오류가 발생했습니다.');
  }
}

function autoSaveProgress() {
  // 조용한 자동 저장 (토스트 없음)
  try {
    const formData = collectCurrentFormData();
    const savePayload = {
      step: currentStep,
      userData: formData,
      insStatuses: insStatuses,
      savedAt: new Date().toISOString(),
      isAuto: true
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(savePayload));
  } catch(e) { /* 무시 */ }
}

function resumeProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    userData = saved.userData || {};
    insStatuses = saved.insStatuses || { cancer: '', brain: '', heart: '', life: '' };
    // 폼 필드 복원
    restoreFormFields(saved.userData);
    // 저장된 단계로 이동
    currentStep = saved.step || 1;
    showStep(currentStep);
    document.getElementById('resumeBanner').classList.remove('show');
    showToast(`✅ ${saved.step}단계에서 이어서 진행합니다.`);
  } catch(e) {
    showToast('저장 데이터를 불러오는 중 오류가 발생했습니다.');
  }
}

function restoreFormFields(data) {
  if (!data) return;
  // Step 1
  if (data._age) { const el = document.getElementById('age'); if(el) el.value = data._age; }
  if (data._gender) { const el = document.querySelector(`input[name="gender"][value="${data._gender}"]`); if(el) el.checked = true; }
  if (data._job) { const el = document.querySelector(`input[name="job"][value="${data._job}"]`); if(el) el.checked = true; }
  if (data._retirement) { const el = document.getElementById('retirement'); if(el) el.value = data._retirement; }
  // Step 2
  if (data._monthlyExpense) { const el = document.getElementById('monthlyExpense'); if(el) el.value = data._monthlyExpense; }
  if (data._monthlyIncome) { const el = document.getElementById('monthlyIncome'); if(el) el.value = data._monthlyIncome; }
  if (data._hasPension) {
    const el = document.querySelector(`input[name="hasPension"][value="${data._hasPension}"]`);
    if(el) { el.checked = true; togglePensionDetail(); }
  }
  // Step 3 보험 상태 복원
  if (data._insStatuses) {
    Object.entries(data._insStatuses).forEach(([type, status]) => {
      if (status) setInsStatus(type, status);
    });
  }
  // Step 4
  if (data._welldying && Array.isArray(data._welldying)) {
    data._welldying.forEach(v => {
      const el = document.querySelector(`input[name="welldying"][value="${v}"]`);
      if(el) el.checked = true;
    });
  }
  if (data._inherit) {
    const el = document.querySelector(`input[name="inherit"][value="${data._inherit}"]`);
    if(el) el.checked = true;
  }
}

function discardProgress() {
  if (confirm('저장된 진단 내용을 삭제하고 처음부터 시작하시겠습니까?')) {
    localStorage.removeItem(SAVE_KEY);
    document.getElementById('resumeBanner').classList.remove('show');
    showToast('🗑️ 저장된 내용이 삭제되었습니다.');
  }
}

function checkSavedProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved || !saved.savedAt) return;
    // 7일 이내 저장된 데이터만 표시
    const savedDate = new Date(saved.savedAt);
    const now = new Date();
    const diffDays = (now - savedDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) { localStorage.removeItem(SAVE_KEY); return; }
    // 배너 표시
    const banner = document.getElementById('resumeBanner');
    if (banner) {
      banner.classList.add('show');
      const timeEl = document.getElementById('resumeSavedTime');
      if (timeEl) {
        const opts = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        timeEl.textContent = `저장 시각: ${savedDate.toLocaleString('ko-KR', opts)} · ${saved.step}단계까지 완료`;
      }
    }
  } catch(e) { /* 무시 */ }
}

// 페이지 로드 시 저장된 데이터 확인
document.addEventListener('DOMContentLoaded', function() {
  checkSavedProgress();
});
"""

html = html.replace('</script>\n</body>', autosave_js + '\n</script>\n</body>', 1)

# ============================================================
# 6. resetForm에 localStorage 삭제 추가
# ============================================================
old_reset_end = "    window.scrollTo({ top: 0, behavior: 'smooth' });\n  }\n}\nfunction calculateCategoryScores"
new_reset_end = "    localStorage.removeItem(SAVE_KEY);\n    window.scrollTo({ top: 0, behavior: 'smooth' });\n  }\n}\nfunction calculateCategoryScores"
html = html.replace(old_reset_end, new_reset_end, 1)

# ============================================================
# 7. 저장
# ============================================================
with open('/home/ubuntu/webdev-static-assets/imakiljang_diagnosis_v4.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done!")
print(f"Total length: {len(html)} chars")

# 검증
assert 'stickyProgress' in html, "sticky progress bar HTML missing"
assert 'resumeBanner' in html, "resume banner HTML missing"
assert 'saveProgress' in html, "saveProgress function missing"
assert 'resumeProgress' in html, "resumeProgress function missing"
assert 'autoSaveProgress' in html, "autoSaveProgress function missing"
assert 'checkSavedProgress' in html, "checkSavedProgress function missing"
print("All assertions passed!")
