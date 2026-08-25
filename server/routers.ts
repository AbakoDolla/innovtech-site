import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createMediaAsset, listMediaAssets } from "./db";
import { safeMediaFilename, validateMediaUpload } from "./mediaUpload";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  media: router({
    list: publicProcedure.query(() => listMediaAssets()),
    upload: adminProcedure
      .input(z.object({
        title: z.string().trim().min(1).max(180),
        filename: z.string().trim().min(1).max(180),
        mediaType: z.enum(["image", "video"]),
        contentType: z.string().trim().min(1).max(120),
        base64: z.string().min(4),
      }))
      .mutation(async ({ input }) => {
        const buffer = validateMediaUpload(input);
        const filename = safeMediaFilename(input.filename);
        const { key, url } = await storagePut(`innovtech/media/${Date.now()}-${filename}`, buffer, input.contentType);
        return createMediaAsset({
          title: input.title,
          mediaType: input.mediaType,
          storageKey: key,
          storageUrl: url,
          contentType: input.contentType,
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
