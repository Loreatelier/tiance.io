const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@tiance.io";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "TIANCE <support@tiance.io>";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clamp = (value, maxLength) =>
  String(value || "")
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildPlainText = (payload) =>
  [
    `Name: ${payload.name}`,
    `Company: ${payload.company || "Not provided"}`,
    `Business type: ${payload.companyType || "Not specified"}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone || "Not provided"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

const buildHtml = (payload) => {
  const rows = [
    ["Name", payload.name],
    ["Company", payload.company || "Not provided"],
    ["Business type", payload.companyType || "Not specified"],
    ["Email", payload.email],
    ["Phone / WhatsApp", payload.phone || "Not provided"],
  ];

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f7f7f4;color:#2d2f2e;font-family:Inter,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #e6e6df;border-radius:20px;padding:28px;">
        <p style="margin:0 0 8px;color:#6b6f6c;font-size:13px;letter-spacing:.04em;text-transform:uppercase;">TIANCE Contact Request</p>
        <h1 style="margin:0 0 24px;font-size:24px;line-height:1.2;color:#2d2f2e;">New message from ${escapeHtml(payload.name)}</h1>
        <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
          ${rows
            .map(
              ([label, value]) => `<tr>
                <td style="padding:10px 0;border-top:1px solid #ecece6;color:#6b6f6c;width:150px;">${escapeHtml(label)}</td>
                <td style="padding:10px 0;border-top:1px solid #ecece6;color:#2d2f2e;font-weight:600;">${escapeHtml(value)}</td>
              </tr>`
            )
            .join("")}
        </table>
        <div style="padding:18px 20px;border-radius:16px;background:#f7f7f4;border:1px solid #ecece6;">
          <p style="margin:0 0 10px;color:#6b6f6c;font-size:13px;">Message</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(payload.message)}</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, error: "RESEND_API_KEY is not configured" });
    return;
  }

  const input = req.body || {};
  const payload = {
    name: clamp(input.name, 80),
    company: clamp(input.company, 120),
    companyType: clamp(input.companyType, 80),
    email: clamp(input.email, 120).toLowerCase(),
    phone: clamp(input.phone, 60),
    message: clamp(input.message, 2000),
  };

  if (payload.name.length < 2 || !emailPattern.test(payload.email) || payload.message.length < 10) {
    res.status(400).json({ ok: false, error: "Invalid contact form payload" });
    return;
  }

  const subject = `TIANCE contact request from ${payload.company || payload.name}`;
  const text = buildPlainText(payload);
  const html = buildHtml(payload);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: payload.email,
        subject,
        html,
        text,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Resend contact email failed", data);
      res.status(502).json({ ok: false, error: "Email provider rejected the request" });
      return;
    }

    res.status(200).json({ ok: true, id: data.id });
  } catch (error) {
    console.error("Contact email send failed", error);
    res.status(502).json({ ok: false, error: "Email send failed" });
  }
};
