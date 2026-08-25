# Assistant WhatsApp — exigences validées

## Architecture officielle

La documentation de Meta confirme que la WhatsApp Business Platform transmet les messages entrants, statuts sortants et événements de compte à un endpoint webhook HTTPS configuré par l’entreprise. Le bot doit donc répondre à ces événements avec une application serveur, et non en automatisant WhatsApp Web.

## Conformité nécessaire

Avant tout message initié par l’entreprise, le client doit avoir donné son consentement. Le consentement doit indiquer clairement le nom de l’entreprise et la nature des communications ; il peut être recueilli via un site, SMS, téléphone ou formulaire papier. Les rappels de rendez-vous devront être envoyés uniquement à des clients ayant accepté de les recevoir, en utilisant les modèles de messages Meta requis lorsque la conversation active est expirée.

## Sources officielles

- https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/overview
- https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in
