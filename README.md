# Sport'ip — prototype

Maquette cliquable de l'application Sport'ip : essayer un sport sans s'engager, en réservant une séance d'essai en deux clics.

Ce prototype sert aux entretiens utilisateurs. Aucune donnée n'est réelle, rien n'est enregistré, aucun paiement n'a lieu.

## Ouvrir le prototype

Double-cliquez sur `index.html`. C'est tout : pas d'installation, pas de serveur.

## Ce qu'il contient

Huit écrans reliés entre eux :

1. **Onboarding** — six questions : envie, en solo ou à plusieurs, cadre, forme, contact, contraintes
2. **Profil** — les 3 sports les plus compatibles, avec leurs raisons et une séance d'essai pour chacun
3. **Accueil** — chercher par envie plutôt que par discipline ; après l'onboarding, il montre les séances des sports recommandés
4. **Résultats** — les séances de la semaine, avec places restantes
5. **Fiche séance** — horaire, lieu, encadrant, matériel prêté
6. **Formules** — unité, pack Découverte, pack Duo
7. **Confirmation** — la preuve que le club est prévenu
8. **Mon compte** — séances restantes et sports déjà essayés

La barre de boutons au-dessus du téléphone permet de sauter directement à un écran. Les flèches ← → du clavier font défiler les écrans dans l'ordre : pratique pendant une démonstration.

## Utiliser le prototype en entretien

- Ne présentez pas le projet avant. Posez le téléphone et demandez : « qu'est-ce que vous feriez avec ça ? »
- Laissez la personne faire l'onboarding seule. Sur l'écran Profil, demandez si les sports proposés lui parlent : un sport rejeté malgré un bon score est une piste à creuser.
- Notez les questions où la personne hésite ou appuie sur « Passer » : ce sont celles à reformuler.
- Ne défendez pas le prototype quand la personne bute. Le blocage est l'information.
- Cachez l'écran des prix jusqu'à la fin, pour demander d'abord l'estimation spontanée.
- Notez les mots exacts employés, pas vos résumés.

## Modifier le contenu

Tout est dans `index.html`.

- **Questions de l'onboarding** : chaque réponse est un bouton `class="option"`. Changez librement les textes, mais pas `data-valeur` : c'est lui qui sert au calcul.
- **Sports et séances d'essai** : tableau `SPORTS`, tout en haut du `<script>`. Chaque sport a sa séance (jour, heure, lieu, encadrant, matériel…) et son profil (envies notées de 0 à 3, format, cadre, intensité, contact…). La fiche séance, le paiement, la confirmation et le compte se remplissent à partir de ce tableau.
- **Calcul de compatibilité** : fonction `compatibilite()`. Poids : envies 35 %, solo ou à plusieurs 20 %, cadre 15 %, forme 15 %, contact 15 %. Les contraintes (articulations, eau, vide) pénalisent ou écartent un sport.
- **Listes de séances** des écrans Accueil et Résultats : écrites en clair dans le HTML, cherchez `class="seance"`. L'attribut `data-sport` indique quelle fiche s'ouvre au clic.
- **Couleurs** : regroupées tout en haut du fichier, dans le bloc `:root`.

## Mettre en ligne (GitHub Pages)

Une fois le dépôt créé : onglet **Settings** → **Pages** → source **Deploy from a branch** → branche `main`, dossier `/ (root)` → **Save**.

Le fichier principal doit s'appeler exactement `index.html`, sinon l'adresse affiche une erreur 404.

L'adresse publique apparaît après une minute environ, sous la forme `https://VOTRE-PSEUDO.github.io/sportip-prototype/`. Elle s'ouvre sur téléphone, ce qui est le bon format pour un test en conditions réelles.

## Équipe

Projet Sport'ip — [noms] — 2026.
