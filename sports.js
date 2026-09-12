/* =============================================================
   CATALOGUE DES SPORTS
   Le profil de chaque sport sert au calcul de compatibilité :
     envies, plaisirs : notes de 0 à 3
     famille     : lien avec la question « Vous avez déjà pratiqué… »
     format      : seul, duo, groupe, equipe
     cadres      : salle, dehors, eau
     intensite   : 1 douce · 2 moyenne · 3 intense
     contact     : 0 aucun · 1 léger · 2 opposition, combat
     impact      : 0 doux pour les articulations · 1 moyen · 2 fort
     eau         : 0 hors de l'eau · 1 on a pied · 2 il faut nager
     hauteur     : true si le vide peut gêner
     competition : 0 loisir · 1 progression · 2 compétition
     toutPrete   : true si tout le matériel spécifique est prêté
   Les séances elles-mêmes sont dans seances.js.
   ============================================================= */

const SPORTS = {
  boxe: { nom:'Boxe anglaise', emoji:'🥊', famille:'combat',
    envies:{ defouler:3, detendre:0, muscler:2, rencontrer:1, decouvrir:1, depasser:3 },
    plaisirs:{ jeu:1, technique:2, rythme:2, depense:3, nature:0, calme:0 },
    format:['duo','groupe'], cadres:['salle'], intensite:3, contact:2, impact:1, eau:0, hauteur:false, competition:2,
    description:"Échauffement, technique au sac et aux pattes d'ours. Pas de combat pour une première fois.",
    apporter:'Baskets, une bouteille', prete:'Gants, bandes', toutPrete:true },

  escalade: { nom:'Escalade en salle', emoji:'🧗', famille:'',
    envies:{ defouler:2, detendre:1, muscler:3, rencontrer:1, decouvrir:3, depasser:3 },
    plaisirs:{ jeu:1, technique:3, rythme:0, depense:2, nature:1, calme:2 },
    format:['seul','duo','groupe'], cadres:['salle'], intensite:2, contact:0, impact:1, eau:0, hauteur:true, competition:1,
    description:"Blocs et voies faciles pour commencer. On apprend d'abord à assurer son partenaire.",
    apporter:'Une tenue souple', prete:'Chaussons, baudrier', toutPrete:true },

  volley: { nom:'Volley loisir', emoji:'🏐', famille:'collectif',
    envies:{ defouler:2, detendre:1, muscler:1, rencontrer:3, decouvrir:1, depasser:1 },
    plaisirs:{ jeu:3, technique:2, rythme:1, depense:2, nature:0, calme:0 },
    format:['groupe','equipe'], cadres:['salle'], intensite:2, contact:0, impact:1, eau:0, hauteur:false, competition:1,
    description:"Match mixte après 20 minutes d'échauffement. Les équipes sont refaites à chaque set.",
    apporter:'Baskets de salle, une bouteille', prete:'Ballons, genouillères', toutPrete:true },

  yoga: { nom:'Yoga vinyasa', emoji:'🧘', famille:'danse',
    envies:{ defouler:0, detendre:3, muscler:2, rencontrer:0, decouvrir:1, depasser:1 },
    plaisirs:{ jeu:0, technique:1, rythme:2, depense:1, nature:0, calme:3 },
    format:['seul','groupe'], cadres:['salle'], intensite:1, contact:0, impact:0, eau:0, hauteur:false, competition:0,
    description:'Enchaînements fluides calés sur la respiration. Chaque posture a sa version facile.',
    apporter:'Une tenue souple', prete:'Tapis, briques', toutPrete:true },

  badminton: { nom:'Badminton', emoji:'🏸', famille:'raquette',
    envies:{ defouler:2, detendre:1, muscler:1, rencontrer:2, decouvrir:1, depasser:2 },
    plaisirs:{ jeu:3, technique:2, rythme:1, depense:2, nature:0, calme:0 },
    format:['duo','groupe'], cadres:['salle'], intensite:2, contact:0, impact:1, eau:0, hauteur:false, competition:2,
    description:"Créneau loisir en double. L'entraîneur passe sur chaque terrain pour donner les bases.",
    apporter:'Baskets de salle', prete:'Raquettes, volants', toutPrete:true },

  aviron: { nom:"Aviron d'initiation", emoji:'🚣', famille:'eau',
    envies:{ defouler:1, detendre:2, muscler:3, rencontrer:2, decouvrir:3, depasser:1 },
    plaisirs:{ jeu:0, technique:2, rythme:2, depense:2, nature:3, calme:1 },
    format:['groupe','equipe'], cadres:['dehors','eau'], intensite:2, contact:0, impact:0, eau:2, hauteur:false, competition:1,
    description:'Sortie en bateau à quatre, avec un moniteur à bord pour la première fois.',
    apporter:'Tenue de sport, savoir nager 25 m', prete:'Bateau, gilet', toutPrete:true },

  natation: { nom:'Natation adultes', emoji:'🏊', famille:'eau',
    envies:{ defouler:1, detendre:2, muscler:2, rencontrer:0, decouvrir:1, depasser:2 },
    plaisirs:{ jeu:0, technique:2, rythme:1, depense:2, nature:0, calme:2 },
    format:['seul','groupe'], cadres:['eau'], intensite:2, contact:0, impact:0, eau:2, hauteur:false, competition:1,
    description:'Cours par groupes de niveau. On travaille le souffle et une nage à la fois, sans chrono.',
    apporter:'Maillot, bonnet, serviette', prete:'Planches, pull-buoys', toutPrete:false },

  aquagym: { nom:'Aquagym', emoji:'💧', famille:'eau',
    envies:{ defouler:1, detendre:3, muscler:2, rencontrer:2, decouvrir:1, depasser:0 },
    plaisirs:{ jeu:0, technique:0, rythme:3, depense:1, nature:0, calme:1 },
    format:['groupe'], cadres:['eau'], intensite:1, contact:0, impact:0, eau:1, hauteur:false, competition:0,
    description:'En musique dans le petit bassin : on a pied tout le temps, les articulations sont ménagées.',
    apporter:'Maillot, bonnet', prete:'Frites, haltères en mousse', toutPrete:false },

  course: { nom:'Course à pied en groupe', emoji:'🏃', famille:'endurance',
    envies:{ defouler:3, detendre:2, muscler:1, rencontrer:2, decouvrir:0, depasser:3 },
    plaisirs:{ jeu:0, technique:0, rythme:2, depense:3, nature:2, calme:1 },
    format:['seul','groupe'], cadres:['dehors'], intensite:2, contact:0, impact:2, eau:0, hauteur:false, competition:1,
    description:'Une boucle de 5 km en alternant marche et course. Le groupe attend toujours le dernier.',
    apporter:'Chaussures de course, une bouteille', prete:'Gilet fluo', toutPrete:false },

  marche: { nom:'Marche nordique', emoji:'🥾', famille:'endurance',
    envies:{ defouler:1, detendre:3, muscler:1, rencontrer:3, decouvrir:2, depasser:0 },
    plaisirs:{ jeu:0, technique:1, rythme:1, depense:1, nature:3, calme:2 },
    format:['groupe'], cadres:['dehors'], intensite:1, contact:0, impact:0, eau:0, hauteur:false, competition:0,
    description:"Balade rythmée avec bâtons. La technique s'apprend en 10 minutes, ensuite on marche en discutant.",
    apporter:'Chaussures de marche', prete:'Bâtons', toutPrete:true },

  pilates: { nom:'Pilates', emoji:'🤸', famille:'danse',
    envies:{ defouler:0, detendre:2, muscler:3, rencontrer:0, decouvrir:1, depasser:1 },
    plaisirs:{ jeu:0, technique:2, rythme:1, depense:1, nature:0, calme:3 },
    format:['seul','groupe'], cadres:['salle'], intensite:1, contact:0, impact:0, eau:0, hauteur:false, competition:0,
    description:'Renforcement profond : gainage, posture, respiration. Aucun saut, aucun à-coup.',
    apporter:'Tenue souple, chaussettes', prete:'Tapis, élastiques', toutPrete:true },

  judo: { nom:'Judo adultes', emoji:'🥋', famille:'combat',
    envies:{ defouler:2, detendre:0, muscler:2, rencontrer:1, decouvrir:2, depasser:3 },
    plaisirs:{ jeu:1, technique:3, rythme:0, depense:2, nature:0, calme:1 },
    format:['duo','groupe'], cadres:['salle'], intensite:3, contact:2, impact:2, eau:0, hauteur:false, competition:2,
    description:"Sur le tatami, on apprend d'abord à tomber sans se faire mal, puis les premières prises au sol.",
    apporter:'Un t-shirt, une bouteille', prete:'Kimono', toutPrete:true },

  rugby: { nom:'Rugby à 5', emoji:'🏉', famille:'collectif',
    envies:{ defouler:3, detendre:0, muscler:1, rencontrer:3, decouvrir:2, depasser:2 },
    plaisirs:{ jeu:3, technique:1, rythme:1, depense:3, nature:2, calme:0 },
    format:['equipe'], cadres:['dehors'], intensite:2, contact:1, impact:1, eau:0, hauteur:false, competition:1,
    description:'Rugby mixte sans plaquage : on touche à deux mains au lieu de plaquer. Beaucoup de course, aucun choc.',
    apporter:'Crampons ou baskets, une bouteille', prete:'Chasubles, ballons', toutPrete:true },

  arc: { nom:"Tir à l'arc", emoji:'🏹', famille:'',
    envies:{ defouler:0, detendre:3, muscler:1, rencontrer:1, decouvrir:3, depasser:2 },
    plaisirs:{ jeu:1, technique:3, rythme:0, depense:0, nature:2, calme:3 },
    format:['seul','groupe'], cadres:['salle','dehors'], intensite:1, contact:0, impact:0, eau:0, hauteur:false, competition:1,
    description:'Initiation à 10 puis 18 mètres. On repart avec son premier score.',
    apporter:'Des chaussures fermées', prete:'Arc, flèches, protège-bras', toutPrete:true },

  salsa: { nom:'Salsa débutants', emoji:'💃', famille:'danse',
    envies:{ defouler:2, detendre:2, muscler:0, rencontrer:3, decouvrir:3, depasser:1 },
    plaisirs:{ jeu:0, technique:2, rythme:3, depense:2, nature:0, calme:0 },
    format:['duo','groupe'], cadres:['salle'], intensite:2, contact:1, impact:1, eau:0, hauteur:false, competition:0,
    description:'Pas de base et premières passes. On change de partenaire toutes les cinq minutes : pas besoin de venir à deux.',
    apporter:'Des chaussures qui glissent un peu', prete:'Rien, juste la musique', toutPrete:true },

  crosstraining: { nom:'Cross-training', emoji:'🏋️', famille:'danse',
    envies:{ defouler:3, detendre:0, muscler:3, rencontrer:1, decouvrir:1, depasser:3 },
    plaisirs:{ jeu:0, technique:1, rythme:2, depense:3, nature:0, calme:0 },
    format:['groupe'], cadres:['salle'], intensite:3, contact:0, impact:2, eau:0, hauteur:false, competition:1,
    description:"Un circuit court et intense en groupe. Chaque mouvement a sa version débutant, le coach l'adapte pour vous.",
    apporter:'Baskets, serviette, bouteille', prete:'Kettlebells, cordes', toutPrete:true },

  charavoile: { nom:'Char à voile', emoji:'⛵', famille:'',
    envies:{ defouler:3, detendre:1, muscler:1, rencontrer:1, decouvrir:3, depasser:2 },
    plaisirs:{ jeu:0, technique:2, rythme:0, depense:1, nature:3, calme:1 },
    format:['seul','groupe'], cadres:['dehors'], intensite:2, contact:0, impact:1, eau:0, hauteur:false, competition:1,
    description:'Sur la plage à marée basse : on apprend à lire le vent, puis on file. Le moniteur reste à côté.',
    apporter:'Vêtements chauds, coupe-vent', prete:'Char, casque, gants', toutPrete:true },

  kayak: { nom:'Kayak', emoji:'🛶', famille:'eau',
    envies:{ defouler:1, detendre:3, muscler:2, rencontrer:1, decouvrir:3, depasser:1 },
    plaisirs:{ jeu:0, technique:1, rythme:1, depense:1, nature:3, calme:2 },
    format:['seul','duo','groupe'], cadres:['dehors','eau'], intensite:1, contact:0, impact:0, eau:2, hauteur:false, competition:0,
    description:"Balade encadrée au fil de l'eau, en kayak simple ou à deux places. Savoir nager est obligatoire.",
    apporter:'Une tenue qui peut être mouillée', prete:'Kayak, pagaie, gilet', toutPrete:true }
};
