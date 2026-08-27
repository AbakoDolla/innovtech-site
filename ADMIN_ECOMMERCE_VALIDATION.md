# Validation e-commerce — InnovTech Admin

## Contrôles établis le 27 août 2026

Le panneau `/admin` de production a été ouvert dans une session propriétaire. Le catalogue contient 11 produits publiés et présente les actions **Nouveau produit**, **Modifier** et **Masquer**. Les formulaires de création et d’édition exposent les noms, descriptions et prix français/anglais, l’URL, la catégorie, la visibilité, les mots-clés, la photo principale, la galerie et les vidéos.

| Parcours contrôlé | Résultat |
|---|---|
| Téléversement image | Une image de validation a été téléversée vers le bucket `innovtech-media` et enregistrée dans la bibliothèque média. |
| Synchronisation boutique | Cette image a été associée à un produit temporaire publié et s’est affichée immédiatement sur sa fiche publique. |
| Téléversement vidéo | Un clip MP4 technique temporaire a été téléversé, associé au même type de fiche de validation et affiché par un lecteur public prêt à être lu. |
| Nettoyage | Le produit temporaire, la ligne de métadonnée et l’objet Storage ont été supprimés. Les lectures de contrôle ont confirmé zéro métadonnée et zéro objet pour le fichier de test. |
| Suppression depuis l’interface | Les médias non associés affichent maintenant une action de suppression définitive. Elle vérifie d’abord qu’aucun produit ne référence le fichier, puis demande confirmation. |
| Mise à jour PWA | Le cache de la coque a été versionné en `innovtech-shell-v2`; l’activation et le nettoyage de l’ancien cache ont été contrôlés dans le navigateur. |
| Responsive de l’accès admin | L’écran de connexion a été vérifié aux formats 390×844, 768×1024 et 1280×720. Les champs, les actions et l’indication d’installation restent accessibles. |
| Pages publiques après branchement | L’accueil et la boutique ont été contrôlés localement au format ordinateur. La navigation, les cartes de catégories et les CTA restent visibles ; le bandeau de consentement masque volontairement une partie du contenu jusqu’au choix du visiteur. |
| Modules de gestion publiés | Les sections Produits, Demandes, Catégories, Équipe et Réglages ont été ouvertes en production dans une session propriétaire. Les contrôles de recherche, filtres, stock, promotions, demandes WhatsApp, rôles, invitation, export et réglages bilingues sont visibles. |
| Navigation par rôle | Les onglets utilisent maintenant le paramètre d’URL de la section et le module Produits, puis Demandes, Catégories, Équipe et Réglages, ont tous été ouverts correctement. L’onglet actif correspond au module affiché. |
| Sécurité des rôles | Les migrations définissent les rôles propriétaire, gestionnaire catalogue, commercial et lecteur ; les tables privées ont perdu leurs privilèges anonymes et une migration bloque toute promotion involontaire au rôle propriétaire. |
| Filtres catalogue avancés | Le module Produits publié affiche les filtres Statut, Disponibilité et Promotion, en plus de la recherche textuelle. |
| Aperçu de bannière | Le module Réglages publié affiche un aperçu français et anglais de la bannière, avec son texte, son CTA et son visuel de secours ou sélectionné. |
| Réglages commerciaux → site | Un délai de réponse français temporaire a été enregistré dans Supabase, affiché sur la fiche produit publique, puis restauré à sa valeur initiale. |
| Bannière → accueil | Un titre français temporaire a été enregistré, affiché sur l’accueil public, puis restauré à son texte initial. |

## Contrôles restant à réaliser

Le téléversement et la lecture publique d’une **vidéo de produit réelle appartenant à InnovTech** restent à effectuer dès qu’un fichier MP4 ou WebM approprié sera disponible. L’installation native finale de la PWA doit également être confirmée sur un téléphone et un ordinateur réels.
