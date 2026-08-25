# Modifier les images, vidéos, prix et modèles InnovTech

Le site est conçu pour que la majorité des médias soit modifiée dans un seul fichier :

```text
client/src/content/mediaCatalog.ts
```

> Ne modifiez pas la mise en page pour changer un visuel. Remplacez plutôt les valeurs `imageSrc`, `videoSrc`, `title`, `description` et `price` dans ce fichier.

## Modifier le hero

Dans `mediaCatalog.hero`, remplacez `imageSrc` par le lien public de votre nouvelle image. Vous pouvez aussi ajuster le texte alternatif en français et en anglais.

## Ajouter ou remplacer une photo de gadget

La zone `productGallery` contient les trois grandes cartes visuelles de la boutique. Chaque objet associe une famille (`accessories`, `connected` ou `computing`) à une image. Pour une nouvelle image, remplacez `imageSrc` par une URL publique, puis adaptez le champ `label`.

## Ajouter une vidéo et un prix

La zone `productVideos` gère les vidéos de démonstration. Dupliquez l’objet existant, attribuez un nouvel `id`, puis remplacez `videoSrc`, `title`, `description`, `price` et `orderName`. Le champ `price` peut contenir un prix exact, par exemple `25 000 FCFA`, ou la mention `Prix sur demande`.

| Champ | Rôle |
| --- | --- |
| `videoSrc` | Lien public direct vers un fichier `.mp4`. |
| `title` | Nom commercial affiché à côté de la vidéo. |
| `description` | Courte explication du produit ou de la démonstration. |
| `price` | Prix ou indication de disponibilité. |
| `orderName` | Texte envoyé dans le message WhatsApp prérempli. |

## Ajouter un modèle de site web ou d’application

La zone `webTemplates` contient les modèles présentés dans la page **Services**. Ajoutez un nouvel objet avec une image, un titre, une catégorie et une description en français et en anglais. Les modèles actuellement inclus sont des démonstrations visuelles ; remplacez-les par vos propres réalisations dès que vous disposez de leurs captures ou de liens publics.

## Mettre vos propres fichiers sur le site

Les fichiers affichés sur un site publié doivent avoir une **URL publique**. Vous pouvez utiliser un hébergeur de médias, ou m’envoyer vos photos et vidéos dans cette conversation : je les intégrerai et mettrai à jour la configuration. Pour conserver vos originaux, les médias initiaux sont également disponibles dans la [publication GitHub « Médias InnovTech v1 »](https://github.com/AbakoDolla/innovtech-site/releases/tag/innovtech-media-v1).

Après toute modification dans GitHub, créez un commit puis poussez-le vers la branche `main`. Le déploiement Vercel se mettra à jour lors de sa connexion et de son paramétrage.
