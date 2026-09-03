"""
2막1장 진단 HTML - 범용 직렬화 임시 저장 기능 추가
원본(upload 폴더) 기준으로 작업
"""

with open('/home/ubuntu/upload/2막1장_life20_v4.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ============================================================
# 1. CSS 추가
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
  .sticky-progress-inner { max-width: 720px; margin: 0 auto; }
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
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 2px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    transition: all 0.3s; flex-shrink: 0;
  }
  .sticky-step-item.active .step-num { background: var(--green); border-color: var(--green); color: white; }
  .sticky-step-item.done .step-num { background: var(--burgundy); border-color: var(--burgundy); color: white; }
  .sticky-step-item.active { color: var(--green-deep); font-weight: 600; }
  .sticky-step-item.done { color: var(--burgundy); }
  .sticky-step-connector {
    width: 20px; height: 2px;
    background: var(--line); border-radius: 2px;
    transition: background 0.3s; flex-shrink: 0;
  }
  .sticky-step-connector.done { background: var(--burgundy); }
  .sticky-progress-bar-wrap {
    height: 4px; background: var(--line-soft);
    border-radius: 100px; overflow: hidden; margin-top: 8px;
  }
  .sticky-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--green) 0%, var(--gold) 60%, var(--burgundy) 100%);
    border-radius: 100px;
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }
  .sticky-progress-label { font-size: 12px; color: var(--muted); font-weight: 500; }
  .sticky-progress-label strong { color: var(--green-deep); }
  .sticky-progress-percent { font-size: 13px; font-weight: 700; color: var(--burgundy); }
  .sticky-save-btn {
    background: none;
    border: 1.5px solid var(--green);
    color: var(--green-deep);
    font-size: 12px; font-weight: 600;
    padding: 4px 12px; border-radius: 20px;
    cursor: pointer; transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
  }
  .sticky-save-btn:hover { background: var(--green); color: white; }
  .sticky-save-btn.saved { background: var(--green); color: white; border-color: var(--green); }

  /* ===== TOAST ===== */
  .toast {
    position: fixed; bottom: 32px; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #1a2e1a; color: white;
    padding: 12px 24px; border-radius: 100px;
    font-size: 14px; font-weight: 500;
    z-index: 9999; opacity: 0;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    pointer-events: none; white-space: nowrap;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* ===== RESUME BANNER ===== */
  .resume-banner {
    display: none;
    max-width: 720px; margin: 0 auto 24px;
    padding: 16px 24px;
    background: linear-gradient(135deg, #f0f7f0, #e8f4e8);
    border: 1.5px solid var(--green); border-radius: 16px;
    align-items: center; gap: 16px;
  }
  .resume-banner.show { display: flex; }
  .resume-banner-icon { font-size: 28px; flex-shrink: 0; }
  .resume-banner-text { flex: 1; }
  .resume-banner-text strong { display: block; color: var(--green-deep); font-size: 15px; margin-bottom: 2px; }
  .resume-banner-text span { font-size: 13px; color: var(--muted); }
  .resume-banner-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .resume-btn-continue {
    background: var(--green); color: white; border: none;
    padding: 8px 18px; border-radius: 20px;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  }
  .resume-btn-continue:hover { background: var(--green-deep); }
  .resume-btn-discard {
    background: none; border: 1.5px solid var(--line); color: var(--muted);
    padding: 8px 14px; border-radius: 20px;
    font-size: 13px; cursor: pointer; transition: all 0.2s;
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
# 2. Toast + Sticky + Resume Banner HTML 삽입 (</nav> 바로 다음)
# ============================================================
extra_html = """<!-- ===== TOAST ===== -->
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
      <div class="sticky-step-item active" id="stickyDot1"><div class="step-num">1</div><span class="step-label">기본 정보</span></div>
      <div class="sticky-step-connector" id="stickyConn1"></div>
      <div class="sticky-step-item" id="stickyDot2"><div class="step-num">2</div><span class="step-label">재무 현황</span></div>
      <div class="sticky-step-connector" id="stickyConn2"></div>
      <div class="sticky-step-item" id="stickyDot3"><div class="step-num">3</div><span class="step-label">보험·건강</span></div>
      <div class="sticky-step-connector" id="stickyConn3"></div>
      <div class="sticky-step-item" id="stickyDot4"><div class="step-num">4</div><span class="step-label">가족·상속</span></div>
    </div>
    <div class="sticky-progress-bar-wrap">
      <div class="sticky-progress-fill" id="stickyProgressFill" style="width:25%;"></div>
    </div>
  </div>
</div>
"""
html = html.replace('</nav>\n<div class="page">', '</nav>\n' + extra_html + '\n<div class="page">', 1)

# ============================================================
# 3. Resume Banner를 progress-wrap 앞에 삽입
# ============================================================
resume_html = """    <!-- Resume Banner -->
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
html = html.replace(
    '    <!-- Progress -->\n    <div class="progress-wrap">',
    resume_html + '\n    <!-- Progress -->\n    <div class="progress-wrap">',
    1
)

# ============================================================
# 4. showStep()에 sticky 업데이트 + 자동 저장 추가
# ============================================================
old_scroll = "  window.scrollTo({ top: 0, behavior: 'smooth' });"
new_scroll = """  // Sticky progress bar 업데이트
  const _stepNames = ['기본 정보', '재무 현황', '보험·건강', '가족·상속'];
  const _stickyEl = document.getElementById('stickyProgress');
  if (_stickyEl) {
    _stickyEl.classList.add('visible');
    document.getElementById('stickyStepNow').textContent = step;
    document.getElementById('stickyStepName').textContent = _stepNames[step - 1];
    document.getElementById('stickyProgressPercent').textContent = (step * 25) + '%';
    document.getElementById('stickyProgressFill').style.width = (step * 25) + '%';
    for (let _i = 1; _i <= 4; _i++) {
      const _dot = document.getElementById('stickyDot' + _i);
      const _conn = document.getElementById('stickyConn' + _i);
      if (_dot) {
        _dot.classList.remove('active', 'done');
        if (_i < step) _dot.classList.add('done');
        else if (_i === step) _dot.classList.add('active');
      }
      if (_conn) _conn.classList.toggle('done', _i < step);
    }
  }
  // 단계 이동 시 자동 저장
  _autoSaveProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });"""
html = html.replace(old_scroll, new_scroll, 1)

# ============================================================
# 5. 임시 저장 JS를 </script> 바로 앞에 추가
#    범용 직렬화: 모든 input/select/textarea를 ID 기반으로 저장/복원
# ============================================================
autosave_js = """
// ===== 임시 저장 기능 (범용 직렬화) =====
const _SAVE_KEY = 'life20_diagnosis_draft';

function _showToast(msg, duration) {
  duration = duration || 2500;
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, duration);
}

function _serializeForm() {
  // 모든 named input/select/textarea 직렬화
  const data = {};
  // text, number, range, hidden, email, tel, date 등
  document.querySelectorAll('input:not([type=radio]):not([type=checkbox])').forEach(function(el) {
    if (el.id) data['_f_' + el.id] = el.value;
  });
  // radio: name 기준
  const radioNames = new Set();
  document.querySelectorAll('input[type=radio]').forEach(function(el) {
    if (el.name) radioNames.add(el.name);
  });
  radioNames.forEach(function(name) {
    const checked = document.querySelector('input[name="' + name + '"]:checked');
    data['_r_' + name] = checked ? checked.value : '';
  });
  // checkbox: name 기준 (다중 선택)
  const cbNames = new Set();
  document.querySelectorAll('input[type=checkbox]').forEach(function(el) {
    if (el.name) cbNames.add(el.name);
  });
  cbNames.forEach(function(name) {
    data['_c_' + name] = Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function(e) { return e.value; });
  });
  // select
  document.querySelectorAll('select').forEach(function(el) {
    if (el.id) data['_s_' + el.id] = el.value;
  });
  // textarea
  document.querySelectorAll('textarea').forEach(function(el) {
    if (el.id) data['_t_' + el.id] = el.value;
  });
  // insStatuses (별도 변수)
  data['_insStatuses'] = JSON.parse(JSON.stringify(insStatuses));
  return data;
}

function _restoreForm(data) {
  if (!data) return;
  // text/number 등
  Object.keys(data).forEach(function(key) {
    if (key.startsWith('_f_')) {
      const id = key.slice(3);
      const el = document.getElementById(id);
      if (el) el.value = data[key];
    }
  });
  // radio
  Object.keys(data).forEach(function(key) {
    if (key.startsWith('_r_')) {
      const name = key.slice(3);
      const val = data[key];
      if (val) {
        const el = document.querySelector('input[name="' + name + '"][value="' + val + '"]');
        if (el) el.checked = true;
      }
    }
  });
  // checkbox
  Object.keys(data).forEach(function(key) {
    if (key.startsWith('_c_')) {
      const name = key.slice(3);
      const vals = data[key] || [];
      document.querySelectorAll('input[name="' + name + '"]').forEach(function(el) {
        el.checked = vals.indexOf(el.value) !== -1;
      });
    }
  });
  // select
  Object.keys(data).forEach(function(key) {
    if (key.startsWith('_s_')) {
      const id = key.slice(3);
      const el = document.getElementById(id);
      if (el) el.value = data[key];
    }
  });
  // textarea
  Object.keys(data).forEach(function(key) {
    if (key.startsWith('_t_')) {
      const id = key.slice(3);
      const el = document.getElementById(id);
      if (el) el.value = data[key];
    }
  });
  // insStatuses
  if (data['_insStatuses']) {
    Object.assign(insStatuses, data['_insStatuses']);
    ['cancer','brain','heart','life'].forEach(function(type) {
      const status = insStatuses[type];
      if (status) {
        const block = document.getElementById('insBlock-' + type);
        if (block) block.setAttribute('data-status', status);
      }
    });
  }
  // 연동 토글 (연금, 자산 상세 등) 재실행
  try { togglePensionDetail(); } catch(e) {}
  ['home','saving','stock','estate'].forEach(function(t) {
    try { toggleAssetDetail(t); } catch(e) {}
  });
}

function saveProgress() {
  const formData = _serializeForm();
  const payload = {
    step: currentStep,
    formData: formData,
    userData: userData,
    insStatuses: insStatuses,
    savedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(_SAVE_KEY, JSON.stringify(payload));
    _showToast('✅ 임시 저장 완료! 나중에 이어서 진행하실 수 있습니다.');
    const btn = document.getElementById('stickySaveBtn');
    if (btn) {
      btn.textContent = '✓ 저장됨';
      btn.classList.add('saved');
      setTimeout(function() { btn.textContent = '💾 임시 저장'; btn.classList.remove('saved'); }, 2000);
    }
  } catch(e) {
    _showToast('저장 중 오류가 발생했습니다.');
  }
}

function _autoSaveProgress() {
  try {
    const formData = _serializeForm();
    const payload = {
      step: currentStep,
      formData: formData,
      userData: userData,
      insStatuses: insStatuses,
      savedAt: new Date().toISOString(),
      isAuto: true
    };
    localStorage.setItem(_SAVE_KEY, JSON.stringify(payload));
  } catch(e) {}
}

function resumeProgress() {
  try {
    const raw = localStorage.getItem(_SAVE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.userData) userData = saved.userData;
    if (saved.insStatuses) Object.assign(insStatuses, saved.insStatuses);
    currentStep = saved.step || 1;
    // 먼저 단계 이동 후 폼 복원
    showStep(currentStep);
    setTimeout(function() {
      _restoreForm(saved.formData);
    }, 100);
    document.getElementById('resumeBanner').classList.remove('show');
    _showToast('✅ ' + currentStep + '단계에서 이어서 진행합니다.');
  } catch(e) {
    _showToast('저장 데이터를 불러오는 중 오류가 발생했습니다.');
  }
}

function discardProgress() {
  if (confirm('저장된 진단 내용을 삭제하고 처음부터 시작하시겠습니까?')) {
    localStorage.removeItem(_SAVE_KEY);
    document.getElementById('resumeBanner').classList.remove('show');
    _showToast('🗑️ 저장된 내용이 삭제되었습니다.');
  }
}

function _checkSavedProgress() {
  try {
    const raw = localStorage.getItem(_SAVE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved || !saved.savedAt) return;
    const savedDate = new Date(saved.savedAt);
    const diffDays = (new Date() - savedDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) { localStorage.removeItem(_SAVE_KEY); return; }
    const banner = document.getElementById('resumeBanner');
    if (banner) {
      banner.classList.add('show');
      const timeEl = document.getElementById('resumeSavedTime');
      if (timeEl) {
        const opts = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        timeEl.textContent = '저장 시각: ' + savedDate.toLocaleString('ko-KR', opts) + ' · ' + saved.step + '단계까지 완료';
      }
    }
  } catch(e) {}
}

document.addEventListener('DOMContentLoaded', function() {
  _checkSavedProgress();
});
"""
html = html.replace('</script>\n</body>', autosave_js + '\n</script>\n</body>', 1)

# ============================================================
# 6. resetForm에 localStorage 삭제 추가
# ============================================================
old_reset = "    window.scrollTo({ top: 0, behavior: 'smooth' });\n  }\n}\nfunction calculateCategoryScores"
new_reset = "    localStorage.removeItem(_SAVE_KEY);\n    window.scrollTo({ top: 0, behavior: 'smooth' });\n  }\n}\nfunction calculateCategoryScores"
html = html.replace(old_reset, new_reset, 1)

# ============================================================
# 7. 저장
# ============================================================
with open('/home/ubuntu/webdev-static-assets/imakiljang_diagnosis_v4.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done!")
print(f"Total length: {len(html)} chars")

# 검증
checks = [
    ('stickyProgress', 'sticky progress bar HTML'),
    ('resumeBanner', 'resume banner HTML'),
    ('saveProgress', 'saveProgress function'),
    ('resumeProgress', 'resumeProgress function'),
    ('_autoSaveProgress', 'autoSaveProgress function'),
    ('_checkSavedProgress', 'checkSavedProgress function'),
    ('_serializeForm', 'serializeForm function'),
    ('_restoreForm', 'restoreForm function'),
    ('_SAVE_KEY', 'SAVE_KEY constant'),
]
for key, label in checks:
    assert key in html, f"MISSING: {label}"
    print(f"✓ {label}")
print("All checks passed!")
