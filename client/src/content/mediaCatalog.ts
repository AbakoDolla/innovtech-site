/**
 * InnovTech editable media catalog.
 * Change only the values in this file to update hero images, product media, prices and web templates.
 * imageSrc / videoSrc can be a public HTTPS URL or an existing /manus-storage/... path.
 */
import type { Lang } from "@/lib/site";

type BilingualText = Record<Lang, string>;

export const mediaCatalog = {
  hero: {
    imageSrc: "/manus-storage/innovtech-hero-collection_4f5f7510.png",
    alt: { fr: "Sélection d’articles high-tech InnovTech", en: "InnovTech high-tech selection" } satisfies BilingualText,
  },

  productGallery: [
    {
      id: "accessoires-visuel",
      family: "accessories",
      imageSrc: "/manus-storage/innovtech-gallery-accessories_205b8d9b.png",
      label: { fr: "Les essentiels utiles", en: "Useful essentials" } satisfies BilingualText,
    },
    {
      id: "gadgets-visuel",
      family: "connected",
      imageSrc: "/manus-storage/innovtech-gallery-connected_affc08f6.png",
      label: { fr: "Les objets qui suivent votre rythme", en: "Objects that keep up with you" } satisfies BilingualText,
    },
    {
      id: "informatique-visuel",
      family: "computing",
      imageSrc: "/manus-storage/innovtech-gallery-computing_126c6ec2.png",
      label: { fr: "Votre espace de création", en: "Your creative workspace" } satisfies BilingualText,
    },
  ],

  productVideos: [
    {
      id: "serrure-connectee",
      videoSrc: "/manus-storage/innovtech-serrure-connectee_b90fe309.mp4",
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

  webTemplates: [
    {
      id: "restaurant",
      imageSrc: "/manus-storage/innovtech-template-restaurant_6f6d1795.png",
      title: { fr: "Site de restaurant", en: "Restaurant website" } satisfies BilingualText,
      category: { fr: "Modèle vitrine", en: "Showcase concept" } satisfies BilingualText,
      description: { fr: "Un site immersif conçu autour des réservations et de l’univers culinaire.", en: "An immersive concept built around bookings and a culinary universe." } satisfies BilingualText,
    },
    {
      id: "fashion",
      imageSrc: "/manus-storage/innovtech-template-fashion_2f570885.png",
      title: { fr: "Boutique mode & beauté", en: "Fashion & beauty store" } satisfies BilingualText,
      category: { fr: "Modèle e-commerce", en: "E-commerce concept" } satisfies BilingualText,
      description: { fr: "Une expérience de marque éditoriale qui met les produits au premier plan.", en: "An editorial brand experience that puts products in the spotlight." } satisfies BilingualText,
    },
    {
      id: "mobile",
      imageSrc: "/manus-storage/innovtech-template-mobile_3d2fa559.png",
      title: { fr: "Application de services", en: "Services mobile app" } satisfies BilingualText,
      category: { fr: "Modèle mobile", en: "Mobile concept" } satisfies BilingualText,
      description: { fr: "Une interface mobile conçue pour des parcours simples et une action rapide.", en: "A mobile interface designed for simple journeys and quick action." } satisfies BilingualText,
    },
    // Add your own website screenshots here. Replace imageSrc with your public image URL.
  ],
} as const;
