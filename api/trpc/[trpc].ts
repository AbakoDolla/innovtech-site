import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../server/routers";
import type { TrpcContext } from "../../server/_core/context";
import { sdk } from "../../server/_core/sdk";

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

  return {
    req: requestForAuth(request) as never,
    // The public API does not need an Express response. Logout remains handled
    // by the browser session endpoint on the full application host.
    res: { clearCookie: () => undefined } as never,
    user,
  };
}

export default {
  fetch(request: Request) {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router: appRouter,
      createContext: () => createVercelContext(request),
    });
  },
};
