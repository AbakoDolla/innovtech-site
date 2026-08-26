import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { sdk } from "./_core/sdk";

function requestForAuth(request: Request) {
  return {
    headers: {
      cookie: request.headers.get("cookie") || undefined,
      authorization: request.headers.get("authorization") || undefined,
    },
  };
}

async function createVercelContext(request: Request): Promise<TrpcContext> {
  let user = null;
  try {
    user = await sdk.authenticateRequest(requestForAuth(request) as never);
  } catch {
    user = null;
  }

  return { req: requestForAuth(request) as never, res: { clearCookie: () => undefined } as never, user };
}

export default {
  fetch(request: Request) {
    return fetchRequestHandler({ endpoint: "/api/trpc", req: request, router: appRouter, createContext: () => createVercelContext(request) });
  },
};
