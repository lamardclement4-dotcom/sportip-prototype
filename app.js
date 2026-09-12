/* =============================================================
   FONCTIONNEMENT DU PROTOTYPE : onboarding, calcul, écrans.
   Les contenus sont dans questions.js, sports.js et seances.js.
   ============================================================= */

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
SEANCES.forEach((x, i) => { x.id = 's' + i; });

const reponses = Object.fromEntries(QUESTIONS.map(q => [q.id, []]));
// profil de démonstration, si l'on saute à l'écran Profil sans avoir répondu
const EXEMPLE = { envie:['defouler','depasser'], plaisir:['depense','technique'], format:['groupe'], ambiance:['progres'],
  cadre:['salle'], contact:['opposition'], forme:['moyen'], experience:['aucun'], contraintes:['rien'], frein:['niveau'],
  ville:['croix'], distance:['10'], moments:['soir'] };
let seanceCourante = SEANCES[0], vues = [], ordre = [];

/* ---------- outils ---------- */
const places = n => n + (n > 1 ? ' places' : ' place');
const repondu = () => QUESTIONS.some(q => reponses[q.id].length);
const heure = x => parseInt(x.heure, 10);

function km(a, b){
  const r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}
function distanceTexte(d){
  if (d < 1) return `${Math.max(100, Math.round(d * 10) * 100)} m`;
  return d < 10 ? `${d.toFixed(1).replace('.', ',')} km` : `${Math.round(d)} km`;
}
// « de Croix », mais « d'Amiens »
const de = nom => (/^[aeiouyéèh]/i.test(nom) ? "d'" : 'de ') + nom;
function moment(x){
  if (x.jour === 'Samedi' || x.jour === 'Dimanche') return 'weekend';
  const h = heure(x);
  return h < 12 ? 'matin' : h < 14 ? 'midi' : h >= 18 ? 'soir' : 'apres-midi';
}

// ville et rayon de recherche : réponses de l'onboarding, sinon Croix et 10 km
const contexteDe = r => ({ ville: VILLES[r.ville[0]] || VILLES.croix, maxKm: Number(r.distance[0] || 10) });
const contexte = () => contexteDe(reponses);

/* ---------- calcul de compatibilité, de 0 à 1 ---------- */
const FORME    = { reprise:[1, .6, .25], moyen:[.8, 1, .6], forme:[.55, .85, 1] };       // selon l'intensité 1, 2, 3
const CONTACT  = { aucun:[1, .45, 0], leger:[.85, 1, .5], opposition:[.6, .85, 1] };     // selon le contact 0, 1, 2
const AMBIANCE = { loisir:[1, .85, .6], progres:[.7, 1, .85], competition:[.4, .75, 1] }; // selon la compétition 0, 1, 2

function compatibilite(s, r){
  let total = 0, poids = 0;
  const critere = (p, v) => { total += p * v; poids += p; };
  const moyenne = (choix, notes) => choix.reduce((a, c) => a + notes[c], 0) / (3 * choix.length);
  if (r.envie.length)    critere(25, moyenne(r.envie, s.envies));
  if (r.plaisir.length)  critere(15, moyenne(r.plaisir, s.plaisirs));
  if (r.format.length)   critere(15, r.format.some(f => s.format.includes(f)) ? 1 : .3);
  if (r.ambiance.length) critere(10, AMBIANCE[r.ambiance[0]][s.competition]);
  if (r.cadre.length && !r.cadre.includes('egal')) critere(10, r.cadre.some(c => s.cadres.includes(c)) ? 1 : .2);
  if (r.contact.length)  critere(10, CONTACT[r.contact[0]][s.contact]);
  if (r.forme.length)    critere(15, FORME[r.forme[0]][s.intensite - 1]);
  let note = poids ? total / poids : .5;
  // les contraintes pénalisent ou écartent, quel que soit le reste
  if (r.contraintes.includes('articulations')) note *= [1, .75, .4][s.impact];
  if (r.contraintes.includes('eau'))           note *= [1, .5, 0][s.eau];
  if (r.contraintes.includes('vertige') && s.hauteur) note = 0;
  if (r.contact.includes('aucun') && s.contact === 2) note *= .4;
  // petits coups de pouce : des bases déjà acquises, un frein que ce sport lève
  if (s.famille && r.experience.includes(s.famille)) note *= 1.05;
  if (r.frein.includes('personne') && (s.format.includes('groupe') || s.format.includes('equipe'))) note *= 1.03;
  if (r.frein.includes('niveau') && s.intensite < 3) note *= 1.03;
  return note;
}

// la séance la plus pratique d'un sport : dans le rayon, au bon moment, puis la plus proche
function meilleureSeance(sport, r, ctx){
  return SEANCES.filter(x => x.sport === sport).map(x => {
    const d = km(ctx.ville, x);
    return { x, d, dansRayon: d <= ctx.maxKm, bonMoment: !r.moments.length || r.moments.includes(moment(x)) };
  }).sort((a, b) => (b.dansRayon - a.dansRayon) || (b.bonMoment - a.bonMoment) || (a.d - b.d))[0];
}

function classement(r){
  const ctx = contexteDe(r);
  return Object.entries(SPORTS).map(([id, s]) => {
    const m = meilleureSeance(id, r, ctx);
    if (!m) return null;
    let note = compatibilite(s, r);
    // un sport sans séance dans le rayon choisi recule nettement
    if (!m.dansRayon) note *= .5; else if (!m.bonMoment) note *= .85;
    return { id, s, note: Math.min(note, .99), ...m };
  }).filter(o => o && o.note > .05).sort((a, b) => b.note - a.note || a.d - b.d);
}

const sportsPourVous = () => repondu() ? classement(reponses).slice(0, 3).map(o => o.id) : [];

const MOTS = {
  envie:   { defouler:'Pour vous défouler', detendre:'Pour souffler', muscler:'Pour vous renforcer',
             rencontrer:'Pour rencontrer du monde', decouvrir:'Pour découvrir', depasser:'Pour vous dépasser' },
  plaisir: { jeu:'Du jeu', technique:'De la technique', rythme:'Du rythme', depense:'Ça transpire', nature:'En pleine nature', calme:'Au calme' },
  format:  { seul:'En solo', duo:'À deux', groupe:'En petit groupe', equipe:'En équipe' },
  cadre:   { salle:'En salle', dehors:'En plein air', eau:"Dans l'eau" }
};
function raisons(s, r){
  const t = [], meilleur = (choix, notes) => [...choix].sort((a, b) => notes[b] - notes[a])[0];
  const e = meilleur(r.envie, s.envies);     if (e && s.envies[e] >= 2) t.push(MOTS.envie[e]);
  const p = meilleur(r.plaisir, s.plaisirs); if (p && s.plaisirs[p] >= 2) t.push(MOTS.plaisir[p]);
  if (r.contraintes.includes('articulations') && s.impact === 0) t.push('Doux pour les articulations');
  if (s.famille && r.experience.includes(s.famille)) t.push('Proche de ce que vous connaissez');
  const f = r.format.find(v => s.format.includes(v)); if (f) t.push(MOTS.format[f]);
  const c = r.cadre.find(v => s.cadres.includes(v)); if (c) t.push(MOTS.cadre[c]);
  if (r.contact.includes('aucun') && s.contact === 0) t.push('Sans contact');
  if (r.forme.includes('reprise') && s.intensite === 1) t.push('Idéal pour reprendre');
  return t.length ? t.slice(0, 3) : ['Proche de vos envies'];
}

/* ---------- filtres (Résultats et Carte) ---------- */
const FILTRES = {
  soir: x => heure(x) >= 18,
  weekend: x => moment(x) === 'weekend',
  debutants: x => x.niveau === 'Débutants',
  prete: x => SPORTS[x.sport].toutPrete
};
const filtresActifs = sel => $$(`${sel} [data-filtre][aria-pressed="true"]`).map(b => b.dataset.filtre);
function seancesFiltrees(actifs){
  const pourVous = actifs.includes('pourvous') ? sportsPourVous() : null;
  return SEANCES.filter(x => (!pourVous || pourVous.includes(x.sport)) &&
    actifs.every(f => f === 'pourvous' || FILTRES[f](x)));
}

/* ---------- rendu ---------- */
function carteSeance(x, note){
  const s = SPORTS[x.sport], d = km(contexte().ville, x);
  return `<button class="seance" data-va="seance" data-seance="${x.id}">
    <span><span class="quoi">${s.emoji} ${s.nom}</span><span class="quand">${x.jour} ${x.heure} · ${x.club}, ${x.ville}<br>À ${distanceTexte(d)}${note ? ` · <span class="match">${Math.round(note * 100)} % pour vous</span>` : ''}</span></span>
    <span class="places${x.places > 2 ? ' calme' : ''}">${places(x.places)}</span>
  </button>`;
}

function carteReco(o, r, i){
  const x = o.x;
  return `<button class="reco${i ? '' : ' premier'}" data-va="seance" data-seance="${x.id}">
    ${i ? '' : '<span class="meilleur">Meilleur choix</span>'}
    <span class="reco-tete"><span class="quoi">${o.s.emoji} ${o.s.nom}</span><span class="score">${Math.round(o.note * 100)}&nbsp;%</span></span>
    <span class="raisons">${raisons(o.s, r).map(t => `<span>${t}</span>`).join('')}</span>
    <span class="reco-pied"><span>${x.jour} ${x.heure} · ${x.club}, ${x.ville} · à ${distanceTexte(o.d)}</span><b${x.places > 2 ? ' class="calme"' : ''}>${places(x.places)}</b></span>
  </button>`;
}

function rendreQuestions(){
  const profil = $('#profil'), total = QUESTIONS.length;
  QUESTIONS.forEach((q, i) => {
    const n = i + 1, suivant = n < total ? `q${n + 1}` : 'profil';
    const s = document.createElement('section');
    s.className = 'vue plein etape';
    s.id = `q${n}`;
    s.dataset.groupe = 'bienvenue';
    s.setAttribute('data-plein-ecran', '');
    s.innerHTML = `
      <div class="etape-tete">
        <button class="retour" data-va="${n > 1 ? `q${n - 1}` : 'bienvenue'}" aria-label="Retour">←</button>
        <div class="jauge" aria-hidden="true"><span style="width:${(n / total * 100).toFixed(1)}%"></span></div>
        <span class="etape-num">${n} / ${total}</span>
      </div>
      <p class="surtitre">${q.partie}</p>
      <h2 id="q${n}-titre">${q.titre.replace(/ ([?!:])/g, ' $1')}</h2>
      <p class="sous">${q.aide}</p>
      <div class="choix${q.grille ? ' grille' : ''}" role="group" aria-labelledby="q${n}-titre" data-question="${q.id}" data-max="${q.max}">
        ${q.options.map(([v, libelle, precision, o = {}]) => `<button class="option" aria-pressed="false" data-valeur="${v}"${o.seul ? ' data-seul' : ''}><span><span class="libelle">${libelle}</span>${precision ? `<span class="precision">${precision}</span>` : ''}</span></button>`).join('')}
      </div>
      <div class="bas">
        <button class="action suivant" data-va="${suivant}" disabled>${n < total ? 'Continuer' : 'Voir mes sports'}</button>
        <button class="lien" data-va="${suivant}">Passer cette question</button>
      </div>`;
    profil.before(s);
  });
  $('#nb-questions').textContent = total;
}

// les réponses en étiquettes (les questions pratiques vont dans une phrase à part)
function traits(r){
  return QUESTIONS.filter(q => !q.sansTrait).flatMap(q => r[q.id].map(v => {
    const o = q.options.find(opt => opt[0] === v), reglages = (o && o[3]) || {};
    return o && !reglages.neutre ? `<span>${reglages.trait || o[1]}</span>` : '';
  })).join('');
}
function pratique(r){
  const ctx = contexteDe(r);
  const mots = { matin:'le matin', midi:'à midi', soir:'le soir', weekend:'le week-end' };
  const quand = r.moments.map(m => mots[m]);
  const liste = quand.length > 1 ? quand.slice(0, -1).join(', ') + ' ou ' + quand[quand.length - 1] : quand[0];
  return `Séances autour ${de(ctx.ville.nom)}, ${ctx.maxKm < 999 ? `à moins de ${ctx.maxKm} km` : 'sans limite de distance'}${liste ? ', ' + liste : ''}.`;
}

function rendreProfil(){
  const reel = repondu(), r = reel ? reponses : EXEMPLE;
  const top = classement(r).slice(0, 3);
  $('#profil-exemple').hidden = reel;
  $('#profil-traits').innerHTML = traits(r);
  $('#profil-pratique').textContent = pratique(r);
  $('#profil-recos').innerHTML = top.map((o, i) => carteReco(o, r, i)).join('');
  // les envies de l'accueil se calent sur les réponses
  if (reel) $$('#accueil [data-lien]').forEach(b => {
    const [q, valeurs] = b.dataset.lien.split(':');
    b.setAttribute('aria-pressed', String(valeurs.split(',').some(v => reponses[q].includes(v))));
  });
}

function rendreAccueil(){
  const ctx = contexte(), reel = repondu();
  let choix;
  if (reel) choix = classement(reponses).slice(0, 3).map(o => [o.x, o.note]);
  else {  // sans profil : les séances les plus proches, un sport différent à chaque fois
    const vus = new Set();
    choix = SEANCES.map(x => [x, km(ctx.ville, x)]).sort((a, b) => a[1] - b[1])
      .filter(([x]) => !vus.has(x.sport) && vus.add(x.sport)).slice(0, 3).map(([x]) => [x]);
  }
  $('#pour-vous').hidden = !reel;
  $('#accueil-liste').innerHTML = choix.map(([x, note]) => carteSeance(x, note)).join('');
  const n = SEANCES.filter(x => km(ctx.ville, x) <= ctx.maxKm).length;
  $('#accueil-tout').textContent = n ? `Voir les ${n} séances près ${de(ctx.ville.nom)}` : 'Voir toutes les séances';
}

function rendreResultats(){
  const ctx = contexte();
  const notes = repondu() ? Object.fromEntries(classement(reponses).map(o => [o.id, o.note])) : {};
  const toutes = seancesFiltrees(filtresActifs('#resultats-filtres'))
    .map(x => [x, km(ctx.ville, x)]).sort((a, b) => a[1] - b[1]);
  let liste = toutes.filter(([, d]) => d <= ctx.maxKm);
  const elargi = !liste.length && toutes.length > 0;
  if (elargi) liste = toutes.slice(0, 6);
  $('#resultats-titre').textContent = `${liste.length} séance${liste.length > 1 ? 's' : ''}`;
  $('#resultats-sous').textContent = elargi
    ? `Rien à moins de ${ctx.maxKm} km ${de(ctx.ville.nom)} avec ces critères : voici les plus proches.`
    : `Du lundi 14 au dimanche 20 septembre, ${ctx.maxKm < 999 ? `à moins de ${ctx.maxKm} km ${de(ctx.ville.nom)}` : `dans toute la région, depuis ${ctx.ville.nom}`}.`;
  $('#resultats-liste').innerHTML = liste.map(([x]) => carteSeance(x, notes[x.sport])).join('');
  const vide = $('#resultats-vide');
  vide.hidden = liste.length > 0;
  vide.innerHTML = 'Aucune séance avec ces filtres. <button data-effacer>Retirer les filtres</button>';
}

// fiche séance, paiement, confirmation et compte suivent la séance choisie
function remplirFiche(){
  const x = seanceCourante, s = SPORTS[x.sport], ctx = contexte();
  const lieu = [x.club, x.adresse, x.ville].filter(Boolean).join(', ');
  const champs = {
    etiquette: x.places <= 2 ? `Plus que ${places(x.places)}` : x.niveau,
    nom: s.nom, club: `${x.club} · ${x.ville}`, description: s.description,
    quand: `${x.jour} ${x.date} sept., ${x.heure} · ${x.duree}`,
    ou: lieu, distance: `À ${distanceTexte(km(ctx.ville, x))} ${de(ctx.ville.nom)}`,
    qui: x.encadrant, niveau: x.niveau, apporter: s.apporter, prete: s.prete,
    places: `${places(x.places)} restante${x.places > 1 ? 's' : ''}`,
    creneau: `${s.nom}, ${x.jour.toLowerCase()} ${x.heure} à ${x.ville}`,
    encadrant: x.encadrant.split(',')[0],
    dateLongue: `${x.jour} ${x.date} septembre, ${x.heure}`,
    adresse: lieu,
    aVenir: `${x.jour} ${x.date} sept., ${x.heure} · ${x.ville}`
  };
  $$('[data-champ]').forEach(el => { el.textContent = champs[el.dataset.champ]; });
  $('#fiche-itineraire').href = `https://www.google.com/maps/dir/?api=1&destination=${x.lat},${x.lng}`;
}

function majBarreEtat(){
  const v = contexte().ville;
  $('#barre-ville').textContent = `${v.nom} (${v.num})`;
}

function reinitialiser(){
  QUESTIONS.forEach(q => { reponses[q.id] = []; });
  $$('.option').forEach(o => o.setAttribute('aria-pressed', 'false'));
  $$('.suivant').forEach(b => { b.disabled = true; });
  majBarreEtat();
}

/* ---------- navigation ---------- */
const RENDUS = { profil:rendreProfil, accueil:rendreAccueil, resultats:rendreResultats };
const RETOURS = { carte:'← Carte', resultats:'← Séances', profil:'← Profil', accueil:'← Accueil', compte:'← Mon compte' };

function afficher(id){
  const vue = document.getElementById(id);
  if (!vues.includes(vue)) return;
  if (RENDUS[id]) RENDUS[id]();
  vues.forEach(v => v === vue ? v.setAttribute('data-active', '') : v.removeAttribute('data-active'));
  const groupe = vue.dataset.groupe || id;
  $$('.telecommande button, .nav button').forEach(b =>
    b.setAttribute('aria-current', String(b.dataset.va === id || b.dataset.va === groupe)));
  $('.mobile').classList.toggle('plein-ecran', vue.hasAttribute('data-plein-ecran'));
  vue.scrollTop = 0;
  if (id === 'carte') afficherCarte();
  if (id === 'seance') majMiniCarte(seanceCourante);
}

function demarrer(){
  rendreQuestions();
  vues = $$('.vue');
  ordre = vues.map(v => v.id);

  // tout élément porteur de data-va navigue
  document.addEventListener('click', e => {
    if (e.target.closest('[data-effacer]')) {
      $$('#resultats-filtres [data-filtre]').forEach(b => b.setAttribute('aria-pressed', 'false'));
      rendreResultats();
      return;
    }
    const cible = e.target.closest('[data-va]');
    if (!cible) return;
    const actuel = $('.vue[data-active]').id;
    if (cible.hasAttribute('data-reinit')) reinitialiser();
    if (cible.dataset.seance) {
      seanceCourante = SEANCES.find(x => x.id === cible.dataset.seance);
      remplirFiche();
      if (RETOURS[actuel]) { const r = $('#fiche-retour'); r.dataset.va = actuel; r.textContent = RETOURS[actuel]; }
    }
    if (cible.hasAttribute('data-centrer')) centrerSurSeance(seanceCourante);
    if (cible.hasAttribute('data-pour-vous')) $('#carte-filtres [data-filtre="pourvous"]').setAttribute('aria-pressed', 'true');
    afficher(cible.dataset.va);
  });

  // réponses de l'onboarding : un choix, ou plusieurs jusqu'à data-max
  $$('.choix').forEach(groupe => {
    const q = groupe.dataset.question, max = Number(groupe.dataset.max);
    const options = [...groupe.querySelectorAll('.option')];
    const suivant = groupe.closest('.vue').querySelector('.suivant');
    options.forEach(o => o.addEventListener('click', () => {
      const v = o.dataset.valeur;
      let choix = reponses[q];
      if (choix.includes(v)) choix = choix.filter(c => c !== v);
      else if (o.hasAttribute('data-seul')) choix = [v];
      else {
        choix = choix.filter(c => !groupe.querySelector(`[data-valeur="${c}"]`).hasAttribute('data-seul'));
        choix.push(v);
        if (choix.length > max) choix.shift();   // au-delà du maximum, le plus ancien choix saute
      }
      reponses[q] = choix;
      options.forEach(x => x.setAttribute('aria-pressed', String(choix.includes(x.dataset.valeur))));
      suivant.disabled = !choix.length;
      majBarreEtat();
    }));
  });

  // boutons à état (envies, filtres) ; les filtres de Résultats relancent la liste
  $$('.envie').forEach(b => b.addEventListener('click', () =>
    b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')));
  $$('#resultats-filtres .envie').forEach(b => b.addEventListener('click', rendreResultats));

  // formules : une seule à la fois, et le bouton de paiement suit le prix
  $$('.packs').forEach(groupe => {
    const payer = groupe.closest('.vue').querySelector('.action');
    groupe.querySelectorAll('.pack').forEach(p => p.addEventListener('click', () => {
      groupe.querySelectorAll('.pack').forEach(a => a.setAttribute('aria-pressed', 'false'));
      p.setAttribute('aria-pressed', 'true');
      payer.textContent = `Payer ${p.querySelector('.prix').textContent} et réserver`;
    }));
  });

  // flèches clavier pour dérouler la démonstration (sauf dans la carte et les listes déroulantes)
  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea, select, .leaflet-container')) return;
    const i = ordre.indexOf($('.vue[data-active]').id);
    if (e.key === 'ArrowRight') afficher(ordre[Math.min(i + 1, ordre.length - 1)]);
    if (e.key === 'ArrowLeft')  afficher(ordre[Math.max(i - 1, 0)]);
  });

  remplirFiche();
  afficher($('.vue[data-active]').id);
}
