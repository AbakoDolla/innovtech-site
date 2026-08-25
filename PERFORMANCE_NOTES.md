# Notes de performance — InnovTech

La page Services utilise des illustrations vectorielles construites avec HTML et CSS. Elles ne téléchargent donc aucune image supplémentaire et utilisent uniquement des transformations graphiques légères.

Les pages publiques sont chargées à la demande. Les visuels hors écran utilisent le chargement différé et le décodage asynchrone, tandis que les images essentielles du hero et des fiches produit conservent une priorité haute.

La construction de production répartit les dépendances en modules React, interface et données cacheables. La vérification du 25 août 2026 a produit des modules séparés sans avertissement de paquet unique supérieur à 500 Ko.

Les animations sont limitées à `transform` et `opacity`, et sont désactivées pour les visiteurs qui activent `prefers-reduced-motion`.
