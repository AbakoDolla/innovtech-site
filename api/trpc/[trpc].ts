import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default {
  fetch(request: Request) {
    const handler = require("../../dist/vercel-trpc.cjs");
    return handler.default.fetch(request);
  },
};
