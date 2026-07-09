const gaMeasurementId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ||
  process.env.GOOGLE_ANALYTICS_ID ||
  "";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION || "";
const clarityProjectId =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ||
  process.env.CLARITY_PROJECT_ID ||
  "";

const isValidGaMeasurementId = (value) => /^G-[A-Z0-9]+$/i.test(value);
const isValidClarityProjectId = (value) => /^[a-z0-9]{8,16}$/i.test(value);

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
  res.status(200).json({
    ok: true,
    googleAnalyticsId: isValidGaMeasurementId(gaMeasurementId)
      ? gaMeasurementId
      : "",
    clarityProjectId: isValidClarityProjectId(clarityProjectId)
      ? clarityProjectId
      : "",
    googleSiteVerification,
  });
};
