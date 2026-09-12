# Sport'ip — prototype

Maquette cliquable de l'application Sport'ip : essayer un sport sans s'engager, en réservant une séance d'essai en deux clics, partout dans les Hauts-de-France.

Ce prototype sert aux entretiens utilisateurs. Aucune donnée n'est réelle (clubs, adresses, encadrants), rien n'est enregistré, aucun paiement n'a lieu.

## Ouvrir le prototype

Double-cliquez sur `index.html`. Pas d'installation, pas de serveur. Seule la carte a besoin d'internet (le fond de carte est chargé en ligne) ; sans connexion, l'écran Carte renvoie vers la liste.

## Ce qu'il contient

1. **Onboarding** — 13 questions en trois parties : vos envies, votre pratique, votre quotidien
2. **Profil** — les 3 sports les plus compatibles, leurs raisons, et la séance d'essai la plus pratique pour chacun
3. **Accueil** — chercher par envie ; après l'onboarding, il montre les séances recommandées
4. **Résultats** — les séances autour de la ville choisie, triées par distance, avec filtres
5. **Carte** — toutes les séances de la région : zoom, déplacement, saut de ville en ville, filtres
6. **Fiche séance** — horaire, lieu, distance, encadrant, niveau, matériel, places, itinéraire
7. **Formules** — unité, pack Découverte, pack Duo
8. **Confirmation** — la preuve que le club est prévenu
9. **Mon compte** — séances restantes et sports déjà essayés

La barre de boutons au-dessus du téléphone permet de sauter directement à un écran. Les flèches ← → du clavier font défiler les écrans dans l'ordre : pratique pendant une démonstration.

## Utiliser le prototype en entretien

- Ne présentez pas le projet avant. Posez le téléphone et demandez : « qu'est-ce que vous feriez avec ça ? »
- Laissez la personne faire l'onboarding seule. Il compte 13 questions : chronométrez, et notez où elle hésite, appuie sur « Passer » ou décroche.
- Sur l'écran Profil, demandez si les sports proposés lui parlent : un sport rejeté malgré un bon score est une piste à creuser.
- Sur la carte, donnez une consigne concrète (« trouvez une séance samedi près d'Amiens ») et observez sans aider.
- Ne défendez pas le prototype quand la personne bute. Le blocage est l'information.
- Cachez l'écran des prix jusqu'à la fin, pour demander d'abord l'estimation spontanée. L'onboarding ne pose volontairement aucune question de budget.
- Notez les mots exacts employés, pas vos résumés.

## Modifier le contenu

| Fichier | Ce qu'il contient |
| --- | --- |
| `questions.js` | Les villes proposées et les 13 questions de l'onboarding |
| `sports.js` | Les 18 sports : description, matériel, et profil utilisé par le calcul |
| `seances.js` | Les séances d'essai : club, adresse, jour, heure, encadrant, coordonnées GPS |
| `index.html` | Les écrans et les couleurs (bloc `:root` tout en haut) |
| `app.js` | Le calcul de compatibilité et le fonctionnement des écrans |
| `carte.js` | La carte |

- **Changer une question** : dans `questions.js`, modifiez librement les textes, mais pas les valeurs (premier élément de chaque option) : le calcul s'en sert.
- **Ajouter une séance** : dans `seances.js`, copiez une ligne et changez les champs. Pour les coordonnées, faites un clic droit sur l'endroit dans Google Maps : les deux nombres affichés vont dans `lat` et `lng`.
- **Calcul de compatibilité** (fonction `compatibilite()` dans `app.js`) : envies 25 %, ce qui plaît 15 %, solo ou à plusieurs 15 %, forme 15 %, loisir ou compétition 10 %, cadre 10 %, contact 10 %. Les contraintes (articulations, eau, vide) pénalisent ou écartent un sport. Un sport sans séance dans le rayon choisi perd des points.
- **Séance proposée pour chaque sport** : d'abord dans le rayon choisi, puis au bon moment de la semaine, puis la plus proche.

Le fond de carte vient d'OpenStreetMap : gratuit et sans clé, à condition de laisser visible la mention en bas de carte et de rester sur un usage modéré (un prototype, pas une application en production).

## Mettre en ligne (GitHub Pages)

Une fois le dépôt créé : onglet **Settings** → **Pages** → source **Deploy from a branch** → branche `main`, dossier `/ (root)` → **Save**.

Le fichier principal doit s'appeler exactement `index.html`, sinon l'adresse affiche une erreur 404. Les fichiers `.js` doivent rester à côté de lui.

L'adresse publique apparaît après une minute environ, sous la forme `https://VOTRE-PSEUDO.github.io/sportip-prototype/`. Elle s'ouvre sur téléphone, ce qui est le bon format pour un test en conditions réelles.

## Équipe

Projet Sport'ip — [noms] — 2026.
