# Références d’implémentation SEO

## Décisions retenues

Le site utilisera des métadonnées de page, un plan de site XML, un fichier `robots.txt`, des données structurées JSON-LD et des titres/descriptions propres à chaque parcours public. Les signaux techniques aident les moteurs à comprendre et explorer le site, mais ne garantissent ni une position précise ni une indexation immédiate.

Les données structurées de type `LocalBusiness` ne seront pas ajoutées tant qu’InnovTech ne dispose pas d’une adresse professionnelle vérifiable : Google indique que le nom et l’adresse font partie des propriétés requises de cette typologie. Une structure `Organization`, conforme aux informations actuellement connues, sera utilisée à la place.

Le site garde un sélecteur FR/EN dans une même application. Les annotations `hreflang` ne seront pas déclarées avant de disposer de versions françaises et anglaises à URLs distinctes, car Google demande une URL par variante et des annotations réciproques dans l’en-tête.

## Références

1. [Google Search Central — Données structurées LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)
2. [Google Search Central — Présenter les versions localisées](https://developers.google.com/search/docs/specialty/international/localized-versions)
3. [Google Business Profile — Être référencé sur Google](https://business.google.com/us/business-profile/)
