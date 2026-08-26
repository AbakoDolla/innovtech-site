import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export async function GET(request: Request) {
  const handler = require("../../dist/vercel-oauth.cjs");
  return handler.GET(request);
}
