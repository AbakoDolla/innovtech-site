# Liens et aperçus sociaux InnovTech

Les fiches produit disposent d’une action **Partager** et d’un bouton Facebook. Chaque article conserve une URL stable du type `https://innovtech-site.vercel.app/boutique/nom-produit`, que vous pouvez coller dans une publication Facebook, Instagram (bio, story ou message), WhatsApp ou LinkedIn.

La carte de partage globale affiche maintenant le logo InnovTech et les visuels de produit dans un format 1200 × 630. Meta recommande notamment les balises Open Graph explicites et une image de 1200 × 630 pour l’affichage de haute définition [1] [2]. Après publication, testez l’URL avec le [Sharing Debugger Meta](https://developers.facebook.com/tools/debug/) afin de demander une nouvelle lecture si une ancienne image est restée en cache.

## Ajouter les profils InnovTech

Dans `client/src/lib/site.ts`, renseignez les adresses complètes des comptes publics dans `SOCIAL_PROFILES` :

```ts
export const SOCIAL_PROFILES = {
  facebook: "https://www.facebook.com/votre-page",
  instagram: "https://www.instagram.com/votre-compte/",
  linkedin: "",
} as const;
```

Les icônes correspondantes apparaîtront automatiquement dans le pied de page. Laissez une valeur vide pour ne pas afficher un réseau qui n’est pas encore prêt.

## Limite actuelle

Les balises de partage sont globales au site Vite actuel. Elles assurent une carte InnovTech avec logo pour tous les liens. Pour que Facebook affiche automatiquement **le nom et l’image précis de chaque produit** dans son aperçu, la prochaine étape est de passer les pages produit au rendu serveur ou de générer une page HTML de partage dédiée par produit.

## Références

[1] [Meta for Developers — A Guide to Sharing for Webmasters](https://developers.facebook.com/documentation/sharing/webmasters)

[2] [Meta for Developers — Images in Link Shares](https://developers.facebook.com/documentation/sharing/webmasters/images)
