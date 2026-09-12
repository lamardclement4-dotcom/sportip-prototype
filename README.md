# Sport'ip — prototype

Maquette cliquable de l'application Sport'ip : essayer un sport sans s'engager, en réservant une séance d'essai en deux clics.

Ce prototype sert aux entretiens utilisateurs. Aucune donnée n'est réelle, rien n'est enregistré, aucun paiement n'a lieu.

## Ouvrir le prototype

Double-cliquez sur `index.html`. C'est tout : pas d'installation, pas de serveur.

## Ce qu'il contient

Six écrans reliés entre eux :

1. **Accueil** — chercher par envie plutôt que par discipline
2. **Résultats** — les séances de la semaine, avec places restantes
3. **Fiche séance** — horaire, lieu, encadrant, matériel prêté
4. **Formules** — unité, pack Découverte, pack Duo
5. **Confirmation** — la preuve que le club est prévenu
6. **Mon compte** — séances restantes et sports déjà essayés

La barre de boutons au-dessus du téléphone permet de sauter directement à un écran. Les flèches ← → du clavier font défiler les écrans dans l'ordre : pratique pendant une démonstration.

## Utiliser le prototype en entretien

- Ne présentez pas le projet avant. Posez le téléphone et demandez : « qu'est-ce que vous feriez avec ça ? »
- Ne défendez pas le prototype quand la personne bute. Le blocage est l'information.
- Cachez l'écran des prix jusqu'à la fin, pour demander d'abord l'estimation spontanée.
- Notez les mots exacts employés, pas vos résumés.

## Modifier le contenu

Tout est dans `index.html`. Les séances sont écrites en clair dans le HTML : cherchez `class="seance"` et changez les textes. Les couleurs sont regroupées tout en haut du fichier, dans le bloc `:root`.

## Mettre en ligne (GitHub Pages)

Une fois le dépôt créé : onglet **Settings** → **Pages** → source **Deploy from a branch** → branche `main`, dossier `/ (root)` → **Save**.

L'adresse publique apparaît après une minute environ, sous la forme `https://VOTRE-PSEUDO.github.io/sportip-prototype/`. Elle s'ouvre sur téléphone, ce qui est le bon format pour un test en conditions réelles.

## Équipe

Projet Sport'ip — [noms] — 2026.
