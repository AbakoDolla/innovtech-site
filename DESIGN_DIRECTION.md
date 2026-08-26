# Direction de refonte InnovTech

La refonte adopte une direction **claire, éditoriale et orientée conversion**, sans reproduire les interfaces de référence. Apple met l’accent sur une hiérarchie simple, une intégration cohérente des éléments et des ressources de conception structurées [1]. NVIDIA organise son contenu autour de thèmes technologiques, d’appels à l’action visibles et de cartes à forte densité éditoriale [2].

Pour InnovTech, cela se traduit par un hero mobile-first à forte hiérarchie, un seul appel à l’action principal par contexte, des cartes de produits plus lisibles, une navigation compacte accessible, des sections à rythme visuel alterné et une action d’achat persistante sans masquer le contenu. Les médias restent des photographies réelles des produits et réalisations fournies ; aucune image de produit inventée ne sera ajoutée.

Les liens produits conserveront une URL stable et proposeront une action de partage. La carte de partage globale affichera le logo InnovTech et un visuel de marque ; les aperçus sociaux spécifiques à chaque article nécessiteraient une génération HTML côté serveur ou des pages statiques dédiées, à traiter dans une étape séparée si les plateformes doivent afficher automatiquement le nom et l’image précis de chaque produit.

## Architecture de conversion retenue

| Moment | Décision de conception | Action attendue |
| --- | --- | --- |
| Navigation mobile | En-tête à logo lisible, menu plein écran à grandes zones tactiles et récupération automatique en cas de fragment JavaScript obsolète | Atteindre toute page sans blocage après un déploiement |
| Hero | Message court, grille de produits réels, repère de confiance et deux chemins clairement séparés | Explorer la boutique ou démarrer un projet digital |
| Carte produit | Image dominante, information essentielle, accès explicite à la fiche | Comparer puis ouvrir l’article choisi |
| Fiche produit | Sélecteur moins/plus, rappel du produit, commande WhatsApp construite avec la quantité | Envoyer une demande précise à l’équipe |
| Réseaux | Liens de profils configurables, partage natif ou Facebook, URL stable de l’article | Publier ou transmettre un produit avec son lien |
| Aperçu social | Métadonnées Open Graph globales, logo et image de marque en HTTPS ; aperçu par produit à traiter par SSR ou pages dédiées si nécessaire | Contrôler l’identité InnovTech lors du partage |

## Références

[1] [Apple Developer — Design](https://developer.apple.com/design/)

[2] [NVIDIA — Artificial Intelligence Computing Leadership](https://www.nvidia.com/en-us/)
