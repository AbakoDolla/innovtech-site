export default {
  async fetch(request: Request) {
    const handler = await import("../../dist/vercel-trpc.mjs");
    return handler.default.fetch(request);
  },
};
