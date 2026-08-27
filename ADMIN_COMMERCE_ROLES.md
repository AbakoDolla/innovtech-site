# Rôles et opérations — InnovTech Admin

Le tableau de bord reste réservé aux comptes ayant été activés par le propriétaire. L’inscription libre ne suffit jamais à obtenir un rôle : un collaborateur est d’abord invité, puis son rôle et son statut actif sont enregistrés dans Supabase avec des politiques RLS.

| Rôle | Accès autorisé |
|---|---|
| **Propriétaire** | Tous les modules, collaborateurs, réglages commerciaux, bannière, export CSV et révocation des accès. |
| **Gestionnaire catalogue** | Produits, photos, vidéos, catégories, stock, disponibilités et promotions. Aucun accès aux collaborateurs ni aux données clients. |
| **Commercial** | Demandes WhatsApp, suivi client, statuts et notes internes. Lecture des produits uniquement. |
| **Lecteur** | Consultation du tableau de bord et du catalogue, sans modification ni export. |

Les demandes WhatsApp sont saisies volontairement par l’équipe. Aucun faux client, avis, commande ou donnée personnelle n’est créé automatiquement.
