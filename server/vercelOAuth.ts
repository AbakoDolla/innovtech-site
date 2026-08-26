import { parse as parseCookieHeader } from "cookie";
import { COOKIE_NAME, ONE_YEAR_MS, OAUTH_STATE_COOKIE, decodeOAuthState } from "@shared/const";
import * as db from "./db";
import { sdk } from "./_core/sdk";

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), { status, headers: { "content-type": "application/json" } });
}

function sessionCookie(name: string, value: string, maxAge: number, httpOnly = false) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=None; Secure${httpOnly ? "; HttpOnly" : ""}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return jsonError("code and state are required", 400);
  const { nonce } = decodeOAuthState(state);
  const expectedNonce = parseCookieHeader(request.headers.get("cookie") || "")[OAUTH_STATE_COOKIE];
  if (!nonce || nonce !== expectedNonce) return jsonError("invalid oauth state", 403);
  const headers = new Headers();
  headers.append("set-cookie", sessionCookie(OAUTH_STATE_COOKIE, "", 0));
  try {
    const tokenResponse = await sdk.exchangeCodeForToken(code, state);
    const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
    if (!userInfo.openId) return jsonError("openId missing from user info", 400);
    await db.upsertUser({ openId: userInfo.openId, name: userInfo.name || null, email: userInfo.email ?? null, loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null, lastSignedIn: new Date() });
    const sessionToken = await sdk.createSessionToken(userInfo.openId, { name: userInfo.name || "", expiresInMs: ONE_YEAR_MS });
    headers.append("set-cookie", sessionCookie(COOKIE_NAME, sessionToken, Math.floor(ONE_YEAR_MS / 1000), true));
    headers.set("location", new URL("/admin", request.url).toString());
    return new Response(null, { status: 302, headers });
  } catch (error) {
    console.error("[OAuth] Callback failed", error);
    return jsonError("OAuth callback failed", 500);
  }
}
