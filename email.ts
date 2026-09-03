/**
 * Email notification helper using Resend API
 * Sends inquiry notification emails to Daniel@lpp20.com
 */

import { Resend } from "resend";

const RECIPIENT_EMAIL = "Daniel@lpp20.com";
const SENDER_EMAIL = "onboarding@resend.dev"; // Resend 기본 발신자 (도메인 인증 전)
const SENDER_NAME = "라이프이점영 홈페이지";

export type InquiryEmailPayload = {
  type: "partnership" | "investment" | "individual" | "other";
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
};

const typeLabel: Record<InquiryEmailPayload["type"], string> = {
  partnership: "파트너십 제안",
  investment: "투자 문의",
  individual: "개인 문의",
  other: "기타 협업",
};

function buildEmailHtml(data: InquiryEmailPayload): string {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>새 문의 접수 알림</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Apple SD Gothic Neo',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#0B1628;padding:28px 36px;">
              <p style="margin:0;color:#C9A84C;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">Life 2.0 · 라이프이점영</p>
              <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">새 문의가 접수되었습니다</h1>
            </td>
          </tr>
          <!-- Badge -->
          <tr>
            <td style="padding:24px 36px 0;">
              <span style="display:inline-block;background:#1B4332;color:#C9A84C;font-size:12px;font-weight:600;padding:5px 14px;border-radius:4px;letter-spacing:0.05em;">
                ${typeLabel[data.type]}
              </span>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:20px 36px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="display:inline-block;width:80px;color:#888;font-size:13px;">이름</span>
                    <span style="color:#111;font-size:14px;font-weight:600;">${data.name}</span>
                  </td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="display:inline-block;width:80px;color:#888;font-size:13px;">기업/기관</span>
                    <span style="color:#111;font-size:14px;">${data.company}</span>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="display:inline-block;width:80px;color:#888;font-size:13px;">이메일</span>
                    <a href="mailto:${data.email}" style="color:#0B1628;font-size:14px;text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="display:inline-block;width:80px;color:#888;font-size:13px;">연락처</span>
                    <span style="color:#111;font-size:14px;">${data.phone}</span>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:16px 0 0;">
                    <p style="margin:0 0 8px;color:#888;font-size:13px;">문의 내용</p>
                    <div style="background:#f8f8f8;border-left:3px solid #C9A84C;padding:14px 16px;border-radius:0 4px 4px 0;">
                      <p style="margin:0;color:#333;font-size:14px;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f8;padding:16px 36px;border-top:1px solid #eee;">
              <p style="margin:0;color:#aaa;font-size:12px;">이 메일은 <a href="https://lpp20.com" style="color:#888;">lpp20.com</a> 홈페이지 문의 폼을 통해 자동 발송되었습니다.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 문의 접수 시 관리자에게 알림 이메일 발송
 * RESEND_API_KEY 환경변수가 없으면 경고만 출력하고 실패하지 않음
 */
export async function sendInquiryNotificationEmail(
  data: InquiryEmailPayload
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not configured — skipping email notification");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `[라이프이점영] 새 ${typeLabel[data.type]} 접수 — ${data.name}${data.company ? ` (${data.company})` : ""}`;

    const { error } = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: data.email,
      subject,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.warn("[Email] Resend API error:", error);
      return false;
    }

    console.log(`[Email] Inquiry notification sent to ${RECIPIENT_EMAIL}`);
    return true;
  } catch (err) {
    console.warn("[Email] Failed to send inquiry notification:", err);
    return false;
  }
}
