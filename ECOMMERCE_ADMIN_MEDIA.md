# Médias produits — InnovTech Admin

La migration Supabase appliquée le 27 août 2026 ajoute le bucket public `innovtech-media`, la table `innovtech_media_assets`, les colonnes `gallery_urls` et `video_urls` du catalogue, ainsi que les politiques RLS correspondantes.

Seul un compte reconnu par `public.is_innovtech_admin()` peut téléverser, modifier ou supprimer un média. La lecture des médias produits est publique afin que les photos et vidéos choisies puissent être affichées dans la boutique. Les fichiers sont limités à 20 Mo dans l’interface et aux formats JPG, PNG, WEBP, MP4 ou WEBM.

Dans **InnovTech Admin → Mes produits**, utilisez **Nouveau produit** ou **Modifier**. L’éditeur centralise les noms, descriptions FR/EN, prix FR/EN, visibilité, photo principale, galerie et vidéos.
