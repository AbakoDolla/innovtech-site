export async function GET(request: Request) {
  const handler = await import("../../dist/vercel-oauth.mjs");
  return handler.GET(request);
}
