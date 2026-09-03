import re

with open('/home/ubuntu/life20-homepage/client/src/components/sections/WhatWeDoSection.tsx', 'r') as f:
    content = f.read()

# CTA 블록 뒤(</div> 직전)에 다운로드 버튼 블록 삽입
old = '''            {/* CTA */}
            {pillar.cta && pillar.link && (
              (pillar as { external?: boolean }).external ? (
                <a
                  href={pillar.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary self-start group inline-flex items-center gap-2"
                >
                  {pillar.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              ) : (
                <Link
                  href={pillar.link}
                  className="btn-primary self-start group"
                >
                  {pillar.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )
            )}
          </div>'''

new = '''            {/* CTA */}
            {pillar.cta && pillar.link && (
              (pillar as { external?: boolean }).external ? (
                <a
                  href={pillar.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary self-start group inline-flex items-center gap-2"
                >
                  {pillar.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              ) : (
                <Link
                  href={pillar.link}
                  className="btn-primary self-start group"
                >
                  {pillar.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )
            )}

            {/* 기술 소개서 다운로드 — Mossrium Solutions 탭 전용 */}
            {active === 1 && (
              <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--avo-mid)" }}>
                <p className="text-xs tracking-[0.2em] uppercase mb-4 font-semibold"
                  style={{ color: "var(--gold-antique)", fontFamily: "'Noto Sans KR', sans-serif" }}>
                  {lang === "ko" ? "기술 소개서 다운로드" : "Download Brochures"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Tree100 */}
                  <a
                    href="/manus-storage/tree100-brochure_93080e00.pdf"
                    download="Tree100_기술소개서.pdf"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm border text-sm font-medium transition-all duration-200 group"
                    style={{
                      borderColor: "var(--gold-satin)",
                      color: "var(--gold-satin)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold-satin)";
                      (e.currentTarget as HTMLElement).style.color = "var(--avo-deep)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold-satin)";
                    }}
                  >
                    <FileText size={15} />
                    <span>Tree100 {lang === "ko" ? "기술 소개서" : "Brochure"}</span>
                    <Download size={13} className="ml-auto opacity-70 group-hover:translate-y-0.5 transition-transform duration-200" />
                  </a>
                  {/* Moss-Rium */}
                  <a
                    href="/manus-storage/mossrium-brochure_49562c08.pdf"
                    download="MossRium_기술소개서.pdf"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm border text-sm font-medium transition-all duration-200 group"
                    style={{
                      borderColor: "var(--gold-satin)",
                      color: "var(--gold-satin)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold-satin)";
                      (e.currentTarget as HTMLElement).style.color = "var(--avo-deep)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold-satin)";
                    }}
                  >
                    <FileText size={15} />
                    <span>Moss-Rium {lang === "ko" ? "기술 소개서" : "Brochure"}</span>
                    <Download size={13} className="ml-auto opacity-70 group-hover:translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
                <p className="text-xs mt-3" style={{ color: "var(--gray-mid)" }}>
                  {lang === "ko"
                    ? "* 현재 샘플 파일입니다. 실제 소개서는 준비 중입니다."
                    : "* Sample files. Actual brochures are being prepared."}
                </p>
              </div>
            )}
          </div>'''

if old in content:
    content = content.replace(old, new)
    with open('/home/ubuntu/life20-homepage/client/src/components/sections/WhatWeDoSection.tsx', 'w') as f:
        f.write(content)
    print("SUCCESS: Download buttons added")
else:
    print("ERROR: Target block not found")
    # 디버그용으로 마지막 CTA 블록 출력
    idx = content.find('{/* CTA */}')
    print(repr(content[idx:idx+800]))
