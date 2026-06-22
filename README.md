# Invitation — Soutenance PFE 🎓

Site d'invitation premium (single-page + page `/attendance`) pour une soutenance
de Projet de Fin d'Études. Glassmorphism, fond de particules animé, compte à
rebours en direct, confirmation de présence partagée et livre d'or.

**Stack** : React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion ·
lucide-react · qrcode.react · html-to-image · canvas-confetti.
**Backend** : Netlify Functions + Netlify Blobs (aucune base externe).
**Déploiement** : Netlify.

## Fonctionnalités

- Hero plein écran (effet machine à écrire, photo placeholder, CTA)
- Cartes d'information animées (date, heure, lieu, événement)
- Compte à rebours live + bouton « Ajouter au calendrier » (.ics)
- Carte Google Maps intégrée + itinéraire
- **Confirmation de présence partagée** : chaque visiteur voit qui a confirmé
  avant lui (stockage Netlify Blobs, clés par entrée → aucune perte concurrente)
- Compteur live + barre de progression vers l'objectif + dernières confirmations
- Carte d'invitation personnalisée (n° participant, QR, export PNG) + confettis
- Page `/attendance` : table recherchable des participant·e·s
- Livre d'or, partage social (WhatsApp / Facebook / LinkedIn / Email)
- Mode clair/sombre, responsive, animations respectant `prefers-reduced-motion`

## Personnalisation

Toutes les infos de l'événement vivent dans **un seul fichier** :
[`src/lib/config.ts`](src/lib/config.ts) (date, heure, lieu, présentateur,
objectif, textes de partage). La date alimente automatiquement le bandeau, le
compte à rebours et le fichier `.ics`.

> La date est réglée sur **25 juin 2026** (l'énoncé indiquait 2025, déjà passé —
> un compte à rebours nécessite une date future). Modifier `datetimeISO`.

## Développement

```bash
npm install
npm run dev          # Vite (UI seule)
# Pour tester Functions + Blobs en local :
#   npm i -g netlify-cli && netlify dev
npm run build        # build de production -> dist/
```

## Données

Les confirmations et messages sont stockés dans Netlify Blobs (store global
persistant `soutenance-attendees` / `soutenance-guestbook`). Les endpoints :

- `GET/POST /.netlify/functions/attendees`
- `GET/POST /.netlify/functions/guestbook`

Garde-fous : honeypot anti-bot, plafond d'entrées, nettoyage des caractères de
contrôle, troncature sûre par point de code.
