// src/middleware.ts
/**
 * Porta do painel: /admin/** exige o session cookie de admin.
 *
 * Aqui só se verifica a EXISTÊNCIA do cookie (Edge runtime não roda
 * firebase-admin). A validade é provada no servidor: `/api/admin/*` chama
 * `verifySessionCookie` e reconfere a allowlist. Cookie forjado entra na
 * casca da página e leva 401 em toda chamada de dado — nada de negócio vaza.
 */
import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "admin_sessao";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  if (!req.cookies.get(COOKIE)?.value) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
