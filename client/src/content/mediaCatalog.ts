/**
 * InnovTech editable media catalog.
 * Change only the values in this file to update hero images, product media, prices and web templates.
 * imageSrc / videoSrc can be a public HTTPS URL or an existing /manus-storage/... path.
 */
import type { Lang } from "@/lib/site";

type BilingualText = Record<Lang, string>;

export const mediaCatalog = {
  productGallery: [
    {
      id: "accessoires-visuel",
      family: "accessories",
      imageSrc: "/media/products/powerbank-usbc-pexels.jpeg",
      label: { fr: "Les essentiels utiles", en: "Useful essentials" } satisfies BilingualText,
    },
    {
      id: "gadgets-visuel",
      family: "connected",
      imageSrc: "/media/products/smartwatch.jpg",
      label: { fr: "Les objets qui suivent votre rythme", en: "Objects that keep up with you" } satisfies BilingualText,
    },
    {
      id: "informatique-visuel",
      family: "computing",
      imageSrc: "/media/products/laptop-workspace.jpg",
      label: { fr: "Votre espace de création", en: "Your creative workspace" } satisfies BilingualText,
    },
  ],

  productVideos: [
    {
      id: "serrure-connectee",
      videoSrc: "https://github.com/AbakoDolla/innovtech-site/releases/download/innovtech-media-v1/innovtech-serrure-connectee.mp4",
      title: { fr: "La sécurité connectée, en situation réelle.", en: "Connected security, in a real setting." } satisfies BilingualText,
      description: {
        fr: "Serrure intelligente avec accès par empreinte digitale, clavier tactile et poignée réversible.",
        en: "Smart lock with fingerprint access, touch keypad and reversible handle.",
      } satisfies BilingualText,
      price: { fr: "Prix sur demande", en: "Price on request" } satisfies BilingualText,
      orderName: { fr: "la serrure connectée avec empreinte digitale", en: "the fingerprint smart lock" } satisfies BilingualText,
    },
    // Duplicate the object above to add another video. Give it a unique id and replace videoSrc.
  ],

  /** Add your own screenshots here only when you are ready to show a real reference. */
  webTemplates: [] as Array<{ id: string; imageSrc: string; title: BilingualText; category: BilingualText; description: BilingualText }>,
} as const;
