/* =============================================================
   ONBOARDING : villes proposées et questions
   Chaque option s'écrit [valeur, libellé, précision, réglages].
     réglages : trait  = étiquette montrée sur l'écran Profil
                seul   = ce choix désélectionne les autres
                neutre = pas d'étiquette sur le profil
   Changez librement les textes, mais pas les valeurs :
   le calcul de compatibilité s'en sert.
   ============================================================= */

const VILLES = {
  lille:        { nom:'Lille',         dep:'Nord',          num:'59', lat:50.6292, lng:3.0573 },
  croix:        { nom:'Croix',         dep:'Nord',          num:'59', lat:50.6781, lng:3.1497 },
  roubaix:      { nom:'Roubaix',       dep:'Nord',          num:'59', lat:50.6942, lng:3.1746 },
  dunkerque:    { nom:'Dunkerque',     dep:'Nord',          num:'59', lat:51.0343, lng:2.3768 },
  valenciennes: { nom:'Valenciennes',  dep:'Nord',          num:'59', lat:50.3570, lng:3.5235 },
  douai:        { nom:'Douai',         dep:'Nord',          num:'59', lat:50.3714, lng:3.0800 },
  arras:        { nom:'Arras',         dep:'Pas-de-Calais', num:'62', lat:50.2910, lng:2.7775 },
  lens:         { nom:'Lens',          dep:'Pas-de-Calais', num:'62', lat:50.4322, lng:2.8333 },
  calais:       { nom:'Calais',        dep:'Pas-de-Calais', num:'62', lat:50.9513, lng:1.8587 },
  amiens:       { nom:'Amiens',        dep:'Somme',         num:'80', lat:49.8941, lng:2.2958 },
  beauvais:     { nom:'Beauvais',      dep:'Oise',          num:'60', lat:49.4295, lng:2.0807 },
  saintquentin: { nom:'Saint-Quentin', dep:'Aisne',         num:'02', lat:49.8465, lng:3.2876 }
};

const QUESTIONS = [
  { id:'envie', partie:'Vos envies', titre:"Qu'est-ce qui vous donne envie de bouger ?", aide:'Deux choix maximum.', max:2, options:[
    ['defouler', 'Me défouler', 'Évacuer le stress de la semaine'],
    ['detendre', 'Me détendre', 'Souffler, penser à autre chose'],
    ['muscler', 'Me renforcer', 'Gagner en force, en souffle, en tonus'],
    ['rencontrer', 'Rencontrer du monde', "Sortir, voir d'autres têtes"],
    ['decouvrir', 'Découvrir', 'Essayer un truc jamais fait'],
    ['depasser', 'Me dépasser', 'Progresser, me lancer des défis']
  ]},
  { id:'plaisir', partie:'Vos envies', titre:"Qu'est-ce qui vous plaît dans une activité ?", aide:'Deux choix maximum.', max:2, options:[
    ['jeu', 'Le jeu', 'Un ballon, un score, de la stratégie', { trait:'Aime le jeu' }],
    ['technique', 'La technique', 'Apprendre un geste précis', { trait:'Aime la technique' }],
    ['rythme', 'Le rythme', 'La musique, les enchaînements', { trait:'Aime le rythme' }],
    ['depense', 'Transpirer', "Sentir que j'ai tout donné", { trait:'Aime transpirer' }],
    ['nature', 'La nature', "L'air, l'eau, les paysages", { trait:'Aime la nature' }],
    ['calme', 'Le calme', 'La concentration, le silence', { trait:'Aime le calme' }]
  ]},
  { id:'format', partie:'Vos envies', titre:'En solo ou à plusieurs ?', aide:'Un seul choix.', max:1, options:[
    ['seul', 'En solo', 'À mon rythme, sans attendre personne'],
    ['duo', 'À deux', "Face à quelqu'un, ou avec quelqu'un"],
    ['groupe', 'En petit groupe', 'Quelques personnes et un encadrant'],
    ['equipe', 'En équipe', 'On gagne ou on perd ensemble']
  ]},
  { id:'ambiance', partie:'Vos envies', titre:'Plutôt loisir ou compétition ?', aide:'Un seul choix.', max:1, options:[
    ['loisir', 'Loisir', 'Pour le plaisir, sans pression', { trait:'Esprit loisir' }],
    ['progres', 'Progresser', 'Des objectifs, voir mes progrès', { trait:'Envie de progresser' }],
    ['competition', 'Compétition', 'Des matchs, un classement, du défi', { trait:'Goût de la compétition' }]
  ]},
  { id:'cadre', partie:'Votre pratique', titre:'Où aimeriez-vous bouger ?', aide:'Un seul choix.', max:1, options:[
    ['salle', 'En salle', "À l'abri, toute l'année"],
    ['dehors', 'Dehors', "Au grand air, même s'il pleut un peu"],
    ['eau', "Dans l'eau", 'Piscine, rivière, mer'],
    ['egal', 'Peu importe', 'Tant que ça me plaît', { neutre:true }]
  ]},
  { id:'contact', partie:'Votre pratique', titre:'Le contact avec les autres ?', aide:'Un seul choix.', max:1, options:[
    ['aucun', 'Pas de contact', 'Chacun dans sa bulle', { trait:'Sans contact' }],
    ['leger', 'Un peu, ça va', 'Un ballon disputé, un partenaire de danse', { trait:'Contact léger' }],
    ['opposition', "J'aime l'opposition", 'Combat, duel : ça me motive', { trait:"Goût de l'opposition" }]
  ]},
  { id:'forme', partie:'Votre pratique', titre:'Et votre forme en ce moment ?', aide:"Pas de jugement : c'est pour vous proposer le bon niveau.", max:1, options:[
    ['reprise', 'Je reprends de zéro', 'Pas de sport depuis longtemps', { trait:'Reprise en douceur' }],
    ['moyen', 'Je bouge un peu', 'Marche, vélo, de temps en temps', { trait:'Forme moyenne' }],
    ['forme', 'Je suis en forme', 'Du sport chaque semaine', { trait:'En forme' }]
  ]},
  { id:'experience', partie:'Votre pratique', titre:'Vous avez déjà pratiqué…', aide:'Plusieurs choix possibles.', max:6, sansTrait:true, options:[
    ['collectif', 'Un sport collectif', 'Foot, hand, basket, volley…'],
    ['raquette', 'Un sport de raquette', 'Tennis, badminton, ping-pong…'],
    ['combat', 'Un sport de combat', 'Judo, boxe, karaté…'],
    ['danse', 'Danse ou fitness', 'Zumba, cours collectifs…'],
    ['eau', "Un sport d'eau", 'Natation, kayak, voile…'],
    ['endurance', 'Course ou vélo', 'En club ou pour soi'],
    ['aucun', 'Rien de régulier', "Et c'est très bien comme ça", { seul:true }]
  ]},
  { id:'contraintes', partie:'Votre pratique', titre:'Quelque chose à prendre en compte ?', aide:'On écarte ce qui ne vous conviendrait pas.', max:3, options:[
    ['articulations', 'Genoux ou dos sensibles', 'On évite les chocs et les sauts', { trait:'Articulations à ménager' }],
    ['eau', "Pas à l'aise dans l'eau", 'On écarte ce qui demande de nager', { trait:"Hors de l'eau" }],
    ['vertige', 'Le vide me fait peur', "On oublie l'escalade", { trait:'Pas de hauteur' }],
    ['rien', 'Rien de particulier', 'Tout est possible', { seul:true, neutre:true }]
  ]},
  { id:'frein', partie:'Votre pratique', titre:"Qu'est-ce qui a été un frein jusqu'ici ?", aide:'Deux choix maximum. On en tient compte pour vos séances.', max:2, sansTrait:true, options:[
    ['temps', 'Le manque de temps', 'Des semaines trop remplies'],
    ['niveau', 'La peur du niveau', 'Me sentir à la traîne'],
    ['personne', 'Ne connaître personne', "Pousser la porte d'un club, ça intimide"],
    ['choix', 'Ne pas savoir quoi choisir', 'Trop de sports, aucune idée'],
    ['prix', 'Le prix', "Les licences à l'année coûtent cher"],
    ['rien', 'Rien, je me lance', '', { seul:true }]
  ]},
  { id:'ville', partie:'Votre quotidien', titre:'Où cherchez-vous vos séances ?', aide:'On calcule les distances à partir de là.', max:1, grille:true, sansTrait:true,
    options: Object.entries(VILLES).map(([valeur, v]) => [valeur, v.nom, v.dep]) },
  { id:'distance', partie:'Votre quotidien', titre:"Jusqu'où pouvez-vous aller ?", aide:'Un seul choix.', max:1, sansTrait:true, options:[
    ['3', 'À pied ou à vélo', 'Moins de 3 km'],
    ['10', 'Pas trop loin', 'Moins de 10 km'],
    ['25', 'Je peux bouger', 'Moins de 25 km'],
    ['999', 'Peu importe', 'Voiture, train : pas de souci']
  ]},
  { id:'moments', partie:'Votre quotidien', titre:'Quand êtes-vous disponible ?', aide:'Plusieurs choix possibles.', max:4, sansTrait:true, options:[
    ['matin', 'En semaine, le matin', 'Avant 12h'],
    ['midi', 'À la pause de midi', 'Entre 12h et 14h'],
    ['soir', 'En soirée', 'Après 18h'],
    ['weekend', 'Le week-end', 'Samedi ou dimanche']
  ]}
];
