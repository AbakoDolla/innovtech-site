# Audit — thème sombre et clavier

## Périmètre contrôlé

Les parcours publics Boutique, fiche produit, Services, Contact et À propos ont été vérifiés en thème sombre. Les contrastes des contenus essentiels, des champs, des cartes, des CTA et des liens ont été inspectés sur des vues bureau et mobiles. Les contrôles clavier ont également été confirmés sans déclencher de navigation externe.

| Élément | Résultat vérifié |
|---|---|
| Boutique | Filtres, recherche, cartes, vidéo, CTA WhatsApp et lien Contact accessibles au clavier. |
| Fiche produit | Quantité, commande WhatsApp, partage natif et Facebook activables au clavier. |
| Services | CTA de devis et réalisation externe activables au clavier. |
| À propos | CTA vers Contact activable au clavier. |
| Contact | Champs et consentement du rendez-vous lisibles en thème sombre. |

## Migration CSS

Les remplacements globaux basés sur la présence de classes utilitaires ont été retirés au profit de règles attachées aux contrats stables des pages et composants publics. La surface de sélection rapide de la Boutique possède désormais sa propre classe de thème, afin de ne pas redevenir claire dans le mode sombre.

Les rendus complets ont été contrôlés sur les résolutions **1280 × 720** et **375 × 812**. Les pages Boutique, Services, Contact, À propos et la fiche mini-tracteur conservent des surfaces et des textes lisibles en thème sombre à ces deux formats.

## Point restant

La migration est vérifiée sur les surfaces critiques. Elle doit rester réévaluée à chaque nouvelle page ou composant qui introduit une surface claire afin de conserver des styles sombres explicites.
