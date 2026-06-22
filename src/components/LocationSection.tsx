import { Car, ExternalLink, MapPin, Navigation, ParkingCircle } from "lucide-react";
import { EVENT, MAPS_DIRECTIONS, MAPS_EMBED_URL, MAPS_LINK } from "../lib/config";
import Reveal from "./Reveal";

export default function LocationSection() {
  return (
    <section id="lieu" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal className="mb-12 text-center">
        <p className="eyebrow">Localisation</p>
        <h2 className="section-title mt-2">Comment nous rejoindre</h2>
        <p className="mx-auto mt-3 max-w-lg muted">
          {EVENT.venue} — {EVENT.venueDetail}
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Map */}
        <Reveal className="lg:col-span-3">
          <div className="gradient-border overflow-hidden p-1.5">
            <div className="overflow-hidden rounded-[1rem]">
              <iframe
                title="Carte — Faculté des Sciences de Sfax"
                src={MAPS_EMBED_URL}
                className="h-[340px] w-full sm:h-[420px]"
                style={{ border: 0, filter: "saturate(1.1)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>

        {/* Info + actions */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-4">
            <div className="gradient-border flex items-start gap-3 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyanx-400 to-electric-600 text-white shadow-glow">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-display text-lg font-bold">{EVENT.venue}</p>
                <p className="text-sm muted">{EVENT.venueDetail}</p>
              </div>
            </div>

            <div className="gradient-border flex items-start gap-3 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric-400 to-electric-600 text-white">
                <Car size={20} />
              </span>
              <div>
                <p className="font-semibold">Accès & transport</p>
                <p className="text-sm muted">
                  Campus universitaire de Sfax, route de Soukra. Accessible en bus et taxi ;
                  arrivez 15 min en avance.
                </p>
              </div>
            </div>

            <div className="gradient-border flex items-start gap-3 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-[#1a1500]">
                <ParkingCircle size={20} />
              </span>
              <div>
                <p className="font-semibold">Stationnement</p>
                <p className="text-sm muted">
                  Parking gratuit disponible sur le campus <span className="opacity-70">(placeholder)</span>.
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1">
                <ExternalLink size={16} /> Ouvrir dans Google Maps
              </a>
              <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                <Navigation size={16} /> Obtenir l'itinéraire
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
