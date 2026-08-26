import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createCatalogProduct, createMediaAsset, deleteCatalogProduct, listAdminCatalogProducts, listMediaAssets, listPublishedCatalogProducts, listSiteSettings, replaceCatalogProducts, updateCatalogProduct, upsertSiteSetting } from "./db";
import { safeMediaFilename, validateMediaUpload } from "./mediaUpload";
import { storagePut } from "./storage";
import { adminSettingInput, managedProductInput } from "@shared/adminCatalog";

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
  catalog: router({
    list: publicProcedure.query(() => listPublishedCatalogProducts()),
    adminList: adminProcedure.query(() => listAdminCatalogProducts()),
    create: adminProcedure.input(managedProductInput).mutation(({ input }) => createCatalogProduct({ ...input, searchTermsFr: JSON.stringify(input.searchTermsFr), searchTermsEn: JSON.stringify(input.searchTermsEn) })),
    update: adminProcedure.input(z.object({ id: z.number().int().positive(), product: managedProductInput })).mutation(({ input }) => updateCatalogProduct(input.id, { ...input.product, searchTermsFr: JSON.stringify(input.product.searchTermsFr), searchTermsEn: JSON.stringify(input.product.searchTermsEn) })),
    remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteCatalogProduct(input.id)),
    initialize: adminProcedure.input(z.array(managedProductInput).min(1).max(100)).mutation(({ input }) => replaceCatalogProducts(input.map((product) => ({ ...product, searchTermsFr: JSON.stringify(product.searchTermsFr), searchTermsEn: JSON.stringify(product.searchTermsEn) })))),
  }),
  settings: router({
    list: adminProcedure.query(() => listSiteSettings()),
    save: adminProcedure.input(adminSettingInput).mutation(({ input }) => upsertSiteSetting(input.settingKey, input.settingValue)),
  }),
});

export type AppRouter = typeof appRouter;
