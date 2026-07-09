export const config = {
  matcher: "/",
};

const chineseLocaleCountries = new Set(["CN", "HK", "MO", "TW"]);

function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const target = `${name}=`;

  for (const cookie of cookies) {
    if (cookie.startsWith(target)) {
      return decodeURIComponent(cookie.slice(target.length));
    }
  }

  return "";
}

function acceptsHtml(request: Request) {
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html") || accept.includes("*/*");
}

function redirectToChinese(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/zh/";
  return Response.redirect(url, 307);
}

export default function middleware(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return;
  }

  if (!acceptsHtml(request)) {
    return;
  }

  const selectedLocale = getCookie(request, "tiance_locale");
  if (selectedLocale === "zh") {
    return redirectToChinese(request);
  }

  if (selectedLocale === "en") {
    return;
  }

  const country = request.headers.get("x-vercel-ip-country") || "";
  if (chineseLocaleCountries.has(country.toUpperCase())) {
    return redirectToChinese(request);
  }
}
