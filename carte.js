/* =============================================================
   CARTE DES SÉANCES — Leaflet, fond de carte OpenStreetMap.
   Sans connexion internet, l'écran Carte propose la liste à la place.
   ============================================================= */

const TUILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const REGION = [[48.83, 1.38], [51.09, 4.26]];   // Hauts-de-France

let carte = null, calque = null, selection = null, centrage = null;
const marqueurs = new Map();

const fondDeCarte = () => L.tileLayer(TUILES, { maxZoom:19, attribution:ATTRIBUTION });

function icone(x, actif){
  const pourVous = sportsPourVous().includes(x.sport);
  return L.divIcon({
    className: 'pin' + (pourVous ? ' pour-vous-pin' : '') + (actif ? ' actif' : ''),
    html: `<span>${SPORTS[x.sport].emoji}</span>`, iconSize:[34, 34], iconAnchor:[17, 17]
  });
}

function initCarte(){
  if (carte) return true;
  if (!window.L) { document.getElementById('carte-horsligne').hidden = false; return false; }
  carte = L.map('carte-fond', { zoomControl:false, minZoom:7, maxBounds:[[48.3, 0.5], [51.6, 5.1]] });
  carte.attributionControl.setPrefix(false);
  fondDeCarte().addTo(carte);
  L.control.zoom({ position:'topright' }).addTo(carte);
  calque = L.layerGroup().addTo(carte);
  carte.on('moveend', compterVisibles);
  carte.on('click', () => selectionner(null));

  // navigation : sauter d'une ville à l'autre, ou voir toute la région
  const choix = document.getElementById('carte-ville');
  choix.innerHTML = '<option value="">Aller à…</option><option value="region">Toute la région</option>' +
    Object.entries(VILLES).map(([cle, v]) => `<option value="${cle}">${v.nom} (${v.num})</option>`).join('');
  choix.addEventListener('change', () => {
    if (choix.value === 'region') carte.fitBounds(REGION);
    else if (choix.value) carte.setView([VILLES[choix.value].lat, VILLES[choix.value].lng], 12);
    choix.value = '';
  });
  document.getElementById('carte-recentrer').addEventListener('click', recentrer);
  document.querySelectorAll('#carte-filtres .envie').forEach(b => b.addEventListener('click', majMarqueurs));
  recentrer();
  return true;
}

function recentrer(){
  const v = contexte().ville;
  carte.setView([v.lat, v.lng], 12);
}

// appelé à chaque affichage de l'écran Carte
function afficherCarte(){
  if (!initCarte()) return;
  const pourVous = document.querySelector('#carte-filtres [data-filtre="pourvous"]');
  pourVous.hidden = !sportsPourVous().length;
  if (pourVous.hidden) pourVous.setAttribute('aria-pressed', 'false');
  carte.invalidateSize();
  majMarqueurs();
  if (centrage) { carte.setView([centrage.lat, centrage.lng], 14); selectionner(centrage); centrage = null; }
}

// depuis la fiche ou le profil : la prochaine ouverture de la carte se centre là
function centrerSurSeance(x){ centrage = x; }

function majMarqueurs(){
  if (!carte) return;
  calque.clearLayers();
  marqueurs.clear();
  seancesFiltrees(filtresActifs('#carte-filtres')).forEach(x => {
    const m = L.marker([x.lat, x.lng], { icon:icone(x, x === selection), title:`${SPORTS[x.sport].nom} · ${x.club}` });
    m.on('click', () => selectionner(x));
    m.addTo(calque);
    marqueurs.set(x, m);
  });
  if (selection && !marqueurs.has(selection)) selectionner(null);
  compterVisibles();
}

function selectionner(x){
  if (selection && marqueurs.has(selection)) marqueurs.get(selection).setIcon(icone(selection, false)).setZIndexOffset(0);
  selection = x;
  const apercu = document.getElementById('carte-apercu');
  apercu.hidden = !x;
  document.getElementById('carte-compte').hidden = !!x;
  if (!x) { compterVisibles(); return; }
  if (marqueurs.has(x)) marqueurs.get(x).setIcon(icone(x, true)).setZIndexOffset(1000);
  const s = SPORTS[x.sport];
  apercu.innerHTML = `<button class="apercu" data-va="seance" data-seance="${x.id}">
    <span class="apercu-emoji">${s.emoji}</span>
    <span class="apercu-texte"><span class="quoi">${s.nom}</span>
      <span class="quand">${x.jour} ${x.date} sept., ${x.heure} · ${x.club}, ${x.ville}</span>
      <span class="quand">À ${distanceTexte(km(contexte().ville, x))} · ${places(x.places)}</span></span>
    <span class="apercu-fleche">›</span>
  </button>`;
}

function compterVisibles(){
  if (!carte || selection) return;
  const zone = carte.getBounds();
  const n = [...marqueurs.keys()].filter(x => zone.contains([x.lat, x.lng])).length;
  document.getElementById('carte-compte').textContent = n
    ? `${n} séance${n > 1 ? 's' : ''} dans cette zone · touchez un repère`
    : 'Aucune séance ici : déplacez ou dézoomez la carte';
}

/* ---------- mini-carte de la fiche séance ---------- */
let miniCarte = null, miniRepere = null;

function majMiniCarte(x){
  if (!window.L) return;
  if (!miniCarte) {
    miniCarte = L.map('fiche-carte', { zoomControl:false, dragging:false, scrollWheelZoom:false,
      doubleClickZoom:false, boxZoom:false, keyboard:false, touchZoom:false });
    miniCarte.attributionControl.setPrefix(false);
    fondDeCarte().addTo(miniCarte);
    miniRepere = L.marker([x.lat, x.lng], { icon:icone(x, true), interactive:false }).addTo(miniCarte);
  }
  miniCarte.invalidateSize();
  miniCarte.setView([x.lat, x.lng], 15, { animate:false });
  miniRepere.setLatLng([x.lat, x.lng]).setIcon(icone(x, true));
}
