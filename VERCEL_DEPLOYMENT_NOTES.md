# Notes de diagnostic Vercel

## 25 août 2026

Le déploiement initial servait le bundle serveur au lieu du frontend. La configuration `vercel.json` a été ajoutée pour publier `dist/public` et réécrire les routes de l’application React vers `index.html`.

Après cette correction, le domaine de production `https://innovtech-site.vercel.app/` répond avec le titre attendu mais affiche momentanément une page blanche dans le navigateur de vérification. Aucun message n’est présent dans la console cliente. L’étape suivante consiste à examiner le HTML et les réponses des ressources générées afin d’isoler la ressource qui ne se charge pas.
