# PWA InnovTech Admin

La production Vercel sert le manifeste principal de l’administration avec un lancement sur `/admin` et l’icône InnovTech de 256 × 256 px. Le service worker `/service-worker.js` est aussi accessible et précharge la coque applicative publique et administrative.

| Élément vérifié | Résultat |
|---|---|
| `https://innovtech-site.vercel.app/site.webmanifest` | Déployé, `start_url` égal à `/admin` |
| `https://innovtech-site.vercel.app/service-worker.js` | Déployé, cache applicatif `innovtech-shell-v1` présent |
| Enregistrement navigateur | Vérifié sur `/admin` : service worker actif, portée du domaine Vercel et manifeste `/admin.webmanifest` |
| Invitation d’installation | Vérifiée : le navigateur expose l’action « Installer InnovTech Admin » sur `/admin` |
| Installation finale sur l’appareil | À confirmer par l’utilisateur dans l’invite native de son navigateur |

Les données Supabase et les API externes ne sont pas mises en cache par le service worker.
