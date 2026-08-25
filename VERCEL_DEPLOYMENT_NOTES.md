# Notes de diagnostic Vercel

## 25 août 2026

Le déploiement initial servait le bundle serveur au lieu du frontend. La configuration `vercel.json` a été ajoutée pour publier `dist/public` et réécrire les routes de l’application React vers `index.html`.

Après cette correction, le domaine de production `https://innovtech-site.vercel.app/` répond avec le titre attendu mais affiche momentanément une page blanche dans le navigateur de vérification. Aucun message n’est présent dans la console cliente. L’étape suivante consiste à examiner le HTML et les réponses des ressources générées afin d’isoler la ressource qui ne se charge pas.

## Résolution confirmée

La cause de la page blanche était le découpage manuel du bundle qui regroupait React, React DOM et le routeur dans un même fragment. Sur Vercel, ce découpage provoquait une erreur d’initialisation React. Le regroupement manuel a été retiré ; Vite détermine maintenant les dépendances de production sans casser leur ordre d’initialisation.

Le build, les huit tests et l’aperçu statique ont été validés. Le déploiement de production Vercel associé au commit `de07bca` est **Ready** et le domaine `https://innovtech-site.vercel.app/` affiche à nouveau l’interface InnovTech complète.
