# Gestion gratuite des rendez-vous avec WhatsApp Business

Le site InnovTech permet à un client de sélectionner un besoin, une date et une heure. Le bouton « Demander ce rendez-vous » ouvre ensuite WhatsApp avec un message structuré. Aucun bot automatisé ni API payante n’est nécessaire pour ce parcours.

## Configuration dans WhatsApp Business

Créez les libellés suivants pour suivre chaque demande : **Nouveau rendez-vous**, **À confirmer**, **Confirmé**, **À relancer** et **Terminé**. Ajoutez ensuite les réponses rapides ci-dessous dans l’application WhatsApp Business.

| Raccourci | Réponse à enregistrer |
| --- | --- |
| `/confirm` | Bonjour, votre rendez-vous est bien confirmé. Nous vous recontacterons si un changement est nécessaire. |
| `/propose` | Merci pour votre demande. Le créneau choisi n’est pas disponible ; voici les créneaux que nous pouvons vous proposer : … |
| `/rappel` | Bonjour, nous vous rappelons votre rendez-vous prévu aujourd’hui. Répondez à ce message si vous devez modifier le créneau. |
| `/merci` | Merci pour votre échange avec InnovTech. Nous restons disponibles si vous avez besoin d’aide. |

## Bonnes pratiques

Utilisez ce parcours seulement avec les clients qui choisissent de vous écrire. Pour les relances manuelles, restez pertinent, identifiez clairement InnovTech et respectez immédiatement toute demande d’arrêt des messages. Avant l’ouverture du site, ajoutez votre numéro WhatsApp international, sans espace ni signe `+`, dans `client/src/lib/site.ts` à la constante `WHATSAPP_NUMBER`.
