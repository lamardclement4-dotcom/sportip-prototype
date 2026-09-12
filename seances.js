/* =============================================================
   SÉANCES D'ESSAI de la semaine du lundi 14 au dimanche 20 septembre
   Une ligne = une séance. sport renvoie à une clé de sports.js.
   lat / lng placent la séance sur la carte (clic droit sur
   Google Maps → les coordonnées s'affichent, à copier ici).
   Clubs, adresses et encadrants sont fictifs.
   ============================================================= */

const SEANCES = [
  // Métropole lilloise
  { sport:'boxe', club:'Ring Croisien', adresse:'14 rue Jean Jaurès', ville:'Croix', lat:50.6786, lng:3.1521, jour:'Mardi', date:15, heure:'19h00', duree:'1h', places:2, encadrant:'Karim, éducateur', niveau:'Débutants' },
  { sport:'crosstraining', club:'La Forge', adresse:'rue Kléber', ville:'Croix', lat:50.6770, lng:3.1510, jour:'Mardi', date:15, heure:'18h30', duree:'45 min', places:3, encadrant:'Mehdi, coach', niveau:'Tous niveaux' },
  { sport:'natation', club:'Piscine de Croix', adresse:'rue de la Gare', ville:'Croix', lat:50.6760, lng:3.1440, jour:'Jeudi', date:17, heure:'19h30', duree:'45 min', places:7, encadrant:'Nadia, maître-nageuse', niveau:'Par niveaux' },
  { sport:'aquagym', club:'Piscine de Croix', adresse:'rue de la Gare', ville:'Croix', lat:50.6763, lng:3.1447, jour:'Vendredi', date:18, heure:'12h15', duree:'45 min', places:10, encadrant:'Nadia, maître-nageuse', niveau:'Tous niveaux' },
  { sport:'judo', club:'Dojo Croisien', adresse:'rue Holden', ville:'Croix', lat:50.6800, lng:3.1560, jour:'Mercredi', date:16, heure:'20h00', duree:'1h30', places:3, encadrant:'Yannick, ceinture noire', niveau:'Débutants' },
  { sport:'arc', club:'Les Archers de Croix', adresse:'allée du Parc', ville:'Croix', lat:50.6830, lng:3.1450, jour:'Samedi', date:19, heure:'14h00', duree:'1h30', places:4, encadrant:'Chantal, entraîneure', niveau:'Débutants' },
  { sport:'volley', club:'Gymnase Jean Zay', adresse:'rue de Lannoy', ville:'Roubaix', lat:50.6905, lng:3.1830, jour:'Jeudi', date:17, heure:'20h15', duree:'2h', places:4, encadrant:'Sofiane, capitaine du club', niveau:'Tous niveaux' },
  { sport:'badminton', club:'Halle Delaune', adresse:'boulevard de Fourmies', ville:'Roubaix', lat:50.6860, lng:3.1650, jour:'Mercredi', date:16, heure:'18h45', duree:'1h30', places:1, encadrant:'Thomas, entraîneur', niveau:'Tous niveaux' },
  { sport:'course', club:'Parc Barbieux', adresse:'avenue Le Nôtre', ville:'Roubaix', lat:50.6800, lng:3.1600, jour:'Dimanche', date:20, heure:'9h30', duree:'1h', places:12, encadrant:'Élodie, coach', niveau:'Débutants' },
  { sport:'salsa', club:'Maison des associations', adresse:'rue de Lille', ville:'Roubaix', lat:50.6930, lng:3.1700, jour:'Vendredi', date:18, heure:'20h30', duree:'1h', places:8, encadrant:'Carlos, professeur', niveau:'Débutants' },
  { sport:'boxe', club:'Boxing Club Tourquennois', adresse:'rue de Gand', ville:'Tourcoing', lat:50.7250, lng:3.1600, jour:'Jeudi', date:17, heure:'18h30', duree:'1h', places:5, encadrant:'Samia, entraîneure', niveau:'Débutants' },
  { sport:'yoga', club:'Studio Lila', adresse:'rue Gambetta', ville:'Lille', lat:50.6275, lng:3.0520, jour:'Mardi', date:15, heure:'12h15', duree:'45 min', places:8, encadrant:'Inès, professeure', niveau:'Tous niveaux' },
  { sport:'pilates', club:'Studio Lila', adresse:'rue Gambetta', ville:'Lille', lat:50.6278, lng:3.0526, jour:'Lundi', date:14, heure:'18h30', duree:'50 min', places:5, encadrant:'Inès, professeure', niveau:'Tous niveaux' },
  { sport:'volley', club:'Salle Léo-Lagrange', adresse:'rue Pasteur', ville:'Lille', lat:50.6360, lng:3.0700, jour:'Mardi', date:15, heure:'20h00', duree:'2h', places:6, encadrant:'Paul, animateur', niveau:'Tous niveaux' },
  { sport:'course', club:'Lille Running Club', adresse:'parc de la Citadelle', ville:'Lille', lat:50.6410, lng:3.0450, jour:'Samedi', date:19, heure:'10h00', duree:'1h', places:15, encadrant:'Hugo, coach', niveau:'Tous niveaux' },
  { sport:'escalade', club:'Bloc Session', adresse:'rue de Wazemmes', ville:'Lille', lat:50.6260, lng:3.0470, jour:'Samedi', date:19, heure:'16h00', duree:'1h30', places:7, encadrant:'Anaïs, monitrice', niveau:'Débutants' },
  { sport:'escalade', club:"Vertical'Art", adresse:'', ville:"Villeneuve-d'Ascq", lat:50.6205, lng:3.1390, jour:'Mercredi', date:16, heure:'12h30', duree:'1h30', places:6, encadrant:'Julie, monitrice', niveau:'Débutants' },
  { sport:'marche', club:'Parc du Héron', adresse:'chemin du Lac', ville:"Villeneuve-d'Ascq", lat:50.6420, lng:3.1520, jour:'Samedi', date:19, heure:'9h00', duree:'1h30', places:9, encadrant:'Bernard, animateur', niveau:'Débutants' },
  { sport:'rugby', club:'Stade du Parc', adresse:'rue du Stade', ville:'Marcq-en-Barœul', lat:50.6680, lng:3.0930, jour:'Jeudi', date:17, heure:'19h00', duree:'1h30', places:6, encadrant:'Léo, éducateur', niveau:'Tous niveaux' },
  { sport:'aviron', club:'Base nautique', adresse:'chemin de halage', ville:'Wambrechies', lat:50.6870, lng:3.0470, jour:'Samedi', date:19, heure:'10h00', duree:'2h', places:5, encadrant:'Marc, moniteur', niveau:'Débutants' },

  // Nord
  { sport:'natation', club:'Piscine du Rivage', adresse:'digue de Mer', ville:'Dunkerque', lat:51.0450, lng:2.3900, jour:'Mercredi', date:16, heure:'18h00', duree:'45 min', places:6, encadrant:'Lucas, maître-nageur', niveau:'Par niveaux' },
  { sport:'charavoile', club:'Plage de Malo', adresse:'', ville:'Dunkerque', lat:51.0560, lng:2.4150, jour:'Dimanche', date:20, heure:'14h00', duree:'2h', places:6, encadrant:'Maxime, moniteur', niveau:'Débutants' },
  { sport:'rugby', club:'Stade des Dunes', adresse:'avenue des Dunes', ville:'Dunkerque', lat:51.0300, lng:2.3600, jour:'Samedi', date:19, heure:'10h30', duree:'1h30', places:8, encadrant:'Nicolas, éducateur', niveau:'Tous niveaux' },
  { sport:'judo', club:'Dojo du Hainaut', adresse:'rue de Famars', ville:'Valenciennes', lat:50.3530, lng:3.5260, jour:'Mardi', date:15, heure:'19h00', duree:'1h30', places:4, encadrant:'Karine, professeure', niveau:'Débutants' },
  { sport:'badminton', club:'Complexe du Hainaut', adresse:'avenue de Denain', ville:'Valenciennes', lat:50.3600, lng:3.5100, jour:'Jeudi', date:17, heure:'19h30', duree:'1h30', places:6, encadrant:'Julien, entraîneur', niveau:'Tous niveaux' },
  { sport:'salsa', club:'Salle des fêtes', adresse:"place d'Armes", ville:'Valenciennes', lat:50.3580, lng:3.5230, jour:'Samedi', date:19, heure:'18h00', duree:'1h', places:10, encadrant:'Rosa, professeure', niveau:'Débutants' },
  { sport:'yoga', club:'Studio Prana', adresse:'rue de Bellain', ville:'Douai', lat:50.3700, lng:3.0790, jour:'Mercredi', date:16, heure:'12h30', duree:'45 min', places:6, encadrant:'Claire, professeure', niveau:'Tous niveaux' },
  { sport:'aviron', club:'Base nautique de la Scarpe', adresse:'chemin de halage', ville:'Douai', lat:50.3760, lng:3.0700, jour:'Dimanche', date:20, heure:'9h30', duree:'2h', places:6, encadrant:'Olivier, moniteur', niveau:'Débutants' },
  { sport:'crosstraining', club:'Box Douaisienne', adresse:'rue de Paris', ville:'Douai', lat:50.3680, lng:3.0820, jour:'Lundi', date:14, heure:'19h00', duree:'45 min', places:5, encadrant:'Sami, coach', niveau:'Tous niveaux' },
  { sport:'marche', club:'Cambrai Marche Nordique', adresse:'jardin public', ville:'Cambrai', lat:50.1740, lng:3.2330, jour:'Vendredi', date:18, heure:'9h30', duree:'1h30', places:12, encadrant:'Monique, animatrice', niveau:'Débutants' },
  { sport:'aquagym', club:'Centre aquatique', adresse:'', ville:'Maubeuge', lat:50.2790, lng:3.9700, jour:'Samedi', date:19, heure:'11h00', duree:'45 min', places:12, encadrant:'Kevin, maître-nageur', niveau:'Tous niveaux' },

  // Pas-de-Calais
  { sport:'rugby', club:'Stade du Crinchon', adresse:'rue du Crinchon', ville:'Arras', lat:50.2860, lng:2.7700, jour:'Mercredi', date:16, heure:'19h00', duree:'1h30', places:7, encadrant:'Antoine, éducateur', niveau:'Tous niveaux' },
  { sport:'escalade', club:'Arras Grimpe', adresse:'rue Saint-Aubert', ville:'Arras', lat:50.2920, lng:2.7730, jour:'Samedi', date:19, heure:'10h00', duree:'1h30', places:5, encadrant:'Léa, monitrice', niveau:'Débutants' },
  { sport:'pilates', club:'Studio du Beffroi', adresse:'place des Héros', ville:'Arras', lat:50.2915, lng:2.7800, jour:'Jeudi', date:17, heure:'12h15', duree:'50 min', places:6, encadrant:'Sophie, professeure', niveau:'Tous niveaux' },
  { sport:'boxe', club:'Boxing Club Lensois', adresse:'rue de Lille', ville:'Lens', lat:50.4340, lng:2.8300, jour:'Mercredi', date:16, heure:'18h30', duree:'1h', places:4, encadrant:'Mourad, entraîneur', niveau:'Débutants' },
  { sport:'course', club:'Les Foulées des terrils', adresse:'base 11/19', ville:'Loos-en-Gohelle', lat:50.4520, lng:2.7900, jour:'Dimanche', date:20, heure:'9h00', duree:'1h15', places:14, encadrant:'Bruno, coach', niveau:'Tous niveaux' },
  { sport:'volley', club:'Salle Jean-Macé', adresse:'rue Jean-Macé', ville:'Béthune', lat:50.5290, lng:2.6420, jour:'Mardi', date:15, heure:'20h00', duree:'2h', places:6, encadrant:'Aurélie, capitaine du club', niveau:'Tous niveaux' },
  { sport:'natation', club:'Centre aquatique du Front de mer', adresse:'', ville:'Calais', lat:50.9640, lng:1.8500, jour:'Lundi', date:14, heure:'19h00', duree:'45 min', places:5, encadrant:'Damien, maître-nageur', niveau:'Par niveaux' },
  { sport:'salsa', club:'Maison pour tous', adresse:'rue Royale', ville:'Calais', lat:50.9540, lng:1.8520, jour:'Jeudi', date:17, heure:'20h00', duree:'1h', places:9, encadrant:'Yasmina, professeure', niveau:'Débutants' },
  { sport:'kayak', club:'Marais audomarois', adresse:'', ville:'Saint-Omer', lat:50.7650, lng:2.2600, jour:'Samedi', date:19, heure:'14h30', duree:'2h', places:8, encadrant:'Hélène, monitrice', niveau:'Débutants' },
  { sport:'marche', club:'Autour des remparts', adresse:'', ville:'Boulogne-sur-Mer', lat:50.7270, lng:1.6150, jour:'Dimanche', date:20, heure:'10h00', duree:'1h30', places:12, encadrant:'Gérard, animateur', niveau:'Débutants' },
  { sport:'charavoile', club:'Plage de Berck', adresse:'', ville:'Berck', lat:50.4050, lng:1.5620, jour:'Samedi', date:19, heure:'13h30', duree:'2h', places:6, encadrant:'Thibault, moniteur', niveau:'Débutants' },
  { sport:'charavoile', club:'Base nautique Sud', adresse:'', ville:'Le Touquet', lat:50.5160, lng:1.5800, jour:'Dimanche', date:20, heure:'11h00', duree:'2h', places:5, encadrant:'Chloé, monitrice', niveau:'Débutants' },

  // Somme
  { sport:'aviron', club:'Club nautique de la Somme', adresse:'chemin de halage', ville:'Amiens', lat:49.8990, lng:2.3040, jour:'Dimanche', date:20, heure:'10h00', duree:'2h', places:6, encadrant:'Pierre, moniteur', niveau:'Débutants' },
  { sport:'kayak', club:'Hortillonnages', adresse:'', ville:'Amiens', lat:49.8995, lng:2.3130, jour:'Samedi', date:19, heure:'15h00', duree:'1h30', places:8, encadrant:'Camille, monitrice', niveau:'Débutants' },
  { sport:'badminton', club:'Halle Saint-Leu', adresse:'rue Saint-Leu', ville:'Amiens', lat:49.8980, lng:2.2980, jour:'Mardi', date:15, heure:'19h00', duree:'1h30', places:5, encadrant:'Romain, entraîneur', niveau:'Tous niveaux' },
  { sport:'yoga', club:'Studio Hortillon', adresse:'rue des Trois-Cailloux', ville:'Amiens', lat:49.8930, lng:2.2990, jour:'Jeudi', date:17, heure:'18h30', duree:'1h', places:7, encadrant:'Nora, professeure', niveau:'Tous niveaux' },
  { sport:'crosstraining', club:'Box Picarde', adresse:'rue Jules-Barni', ville:'Amiens', lat:49.8880, lng:2.2900, jour:'Mercredi', date:16, heure:'18h00', duree:'45 min', places:4, encadrant:'Jordan, coach', niveau:'Tous niveaux' },
  { sport:'marche', club:'Baie de Somme', adresse:'', ville:'Saint-Valery-sur-Somme', lat:50.1850, lng:1.6330, jour:'Samedi', date:19, heure:'10h00', duree:'2h', places:12, encadrant:'Martine, animatrice', niveau:'Débutants' },

  // Oise
  { sport:'arc', club:"Compagnie d'arc du Beauvaisis", adresse:'', ville:'Beauvais', lat:49.4300, lng:2.0850, jour:'Samedi', date:19, heure:'14h00', duree:'1h30', places:5, encadrant:'Jean-Luc, entraîneur', niveau:'Débutants' },
  { sport:'natation', club:"Piscine du plan d'eau", adresse:'', ville:'Beauvais', lat:49.4400, lng:2.0700, jour:'Mercredi', date:16, heure:'19h00', duree:'45 min', places:8, encadrant:'Sarah, maître-nageuse', niveau:'Par niveaux' },
  { sport:'judo', club:'Judo Club Beauvaisien', adresse:'rue de Calais', ville:'Beauvais', lat:49.4280, lng:2.0900, jour:'Jeudi', date:17, heure:'19h30', duree:'1h30', places:5, encadrant:'Frédéric, ceinture noire', niveau:'Débutants' },
  { sport:'kayak', club:"Base de l'Oise", adresse:'', ville:'Compiègne', lat:49.4200, lng:2.8200, jour:'Dimanche', date:20, heure:'10h00', duree:'2h', places:8, encadrant:'Élise, monitrice', niveau:'Débutants' },
  { sport:'course', club:'Forêt de Compiègne', adresse:'', ville:'Compiègne', lat:49.4050, lng:2.8400, jour:'Samedi', date:19, heure:'9h00', duree:'1h15', places:20, encadrant:'Vincent, coach', niveau:'Tous niveaux' },

  // Aisne
  { sport:'aquagym', club:'Centre aquatique', adresse:'', ville:'Saint-Quentin', lat:49.8480, lng:3.2900, jour:'Mardi', date:15, heure:'12h15', duree:'45 min', places:12, encadrant:'Laetitia, maître-nageuse', niveau:'Tous niveaux' },
  { sport:'volley', club:'Palais des sports', adresse:'', ville:'Saint-Quentin', lat:49.8440, lng:3.2850, jour:'Mercredi', date:16, heure:'20h00', duree:'2h', places:6, encadrant:'Alexis, capitaine du club', niveau:'Tous niveaux' },
  { sport:'marche', club:"Parc d'Isle", adresse:'', ville:'Saint-Quentin', lat:49.8410, lng:3.3000, jour:'Dimanche', date:20, heure:'9h30', duree:'1h30', places:10, encadrant:'Josiane, animatrice', niveau:'Débutants' },
  { sport:'salsa', club:'Salle de la Citadelle', adresse:'', ville:'Laon', lat:49.5640, lng:3.6200, jour:'Vendredi', date:18, heure:'20h00', duree:'1h', places:8, encadrant:'Diego, professeur', niveau:'Débutants' },
  { sport:'boxe', club:'Boxing Club Soissonnais', adresse:'', ville:'Soissons', lat:49.3820, lng:3.3240, jour:'Lundi', date:14, heure:'19h00', duree:'1h', places:5, encadrant:'Rachid, entraîneur', niveau:'Débutants' }
];
