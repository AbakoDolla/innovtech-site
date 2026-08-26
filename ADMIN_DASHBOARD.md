# Administration InnovTech

## Accès

Le tableau de bord est disponible sous l’URL dédiée `/admin`. Il exige une connexion puis le rôle `admin` côté client et côté serveur. Les procédures de modification passent par les garde-fous `adminProcedure` ; un utilisateur ordinaire reçoit un refus côté backend.

## Fonctions initiales

| Espace | Fonction |
|---|---|
| Vue d’ensemble | Compteurs, état du catalogue et import initial des produits déjà visibles. |
| Catalogue & prix | Ajout, modification, publication, masquage et suppression de produits. |
| Contenus & SEO | Enregistrement de paramètres éditoriaux non sensibles. |
| Bibliothèque média | Téléversement sécurisé des images et vidéos existant. |

## Données

Les produits administrés sont stockés dans `catalog_products` et les paramètres éditoriaux dans `site_settings`. Tant que le catalogue n’est pas initialisé depuis le bouton prévu, le site public conserve automatiquement le catalogue statique existant afin de ne jamais afficher une boutique vide.

## Vérification visuelle

Les vues `/admin`, `/admin/catalogue` et `/admin/disponibilites` ont été contrôlées dans la session administrateur locale. La navigation, les cartes de synthèse, les états de catalogue vide et les messages d’initialisation sont lisibles. Le catalogue est volontairement vide dans la base à ce stade : le bouton d’import doit être déclenché avec le compte propriétaire afin de copier les onze produits publics vers la gestion administrable.
