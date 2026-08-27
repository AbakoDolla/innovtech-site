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

## Contrôles restant à réaliser

Le téléversement et la lecture publique d’une **vidéo de produit réelle appartenant à InnovTech** restent à effectuer dès qu’un fichier MP4 ou WebM approprié sera disponible. L’installation native finale de la PWA doit également être confirmée sur un téléphone et un ordinateur réels.
