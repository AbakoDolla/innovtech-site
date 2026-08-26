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

## Accueil guidé et mode sombre

L’accueil commence désormais par trois parcours explicites : acheter un équipement, créer une solution numérique ou parler à l’équipe. Cette structure permet à un visiteur de prendre une décision sans devoir interpréter le catalogue complet.

Le thème sombre utilise une base bleu nuit, des couches plus claires pour les cartes et des accents cyan/bleu pour les actions. Le contraste du hero, des textes et des contrôles de thème a été contrôlé après implémentation. Les textes courants sont prévus pour satisfaire le ratio de contraste minimal de 4,5:1 défini par le critère WCAG 1.4.3 [3].

Les contrôles effectués en mode sombre ont confirmé une continuité visuelle et des actions lisibles sur l’accueil, le contact, la boutique et les services. L’audit se poursuit sur les fiches produit et la page À propos avant livraison.

Les fiches produit et la page À propos ont également été contrôlées. La fiche produit utilise maintenant des surfaces sombres explicites pour la quantité, les boutons de partage et les cartes de réassurance, évitant le texte clair sur fond clair constaté lors du premier audit.

La préférence sombre a été rechargée dans le navigateur après navigation ; le mode reste actif et le contrôle indique alors le retour vers le thème clair.

## Références

[1] [Apple Developer — Design](https://developer.apple.com/design/)

[2] [NVIDIA — Artificial Intelligence Computing Leadership](https://www.nvidia.com/en-us/)

[3] [W3C WAI — Understanding Success Criterion 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
