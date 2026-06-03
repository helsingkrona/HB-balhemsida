import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        {/* Aftermovie som bakgrund (redan klippt till själva filmningen på disk) */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/aftermovie.mp4" type="video/mp4" />
        </video>

        {/* Mörk scrim för läsbarhet */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/45 to-navy/85" />

        <div className="relative z-10 text-center text-parchment">
          <p className="text-xs uppercase tracking-[0.35em] text-gold sm:text-sm">
            Helsingkrona Nation
          </p>

          <h1 className="mt-4 font-serif text-5xl font-semibold sm:text-7xl">
            Snörsjöaorden
          </h1>
          <p className="mt-1 font-serif text-2xl tracking-[0.3em] text-gold sm:text-3xl">
            ANNO 2026
          </p>

          <div className="rule-gold mx-auto my-7 w-40" />

          {/* Datum */}
          <ul className="flex flex-col items-center justify-center gap-2 font-serif text-lg sm:flex-row sm:gap-8 sm:text-xl">
            <li>Fredag <span className="text-gold">2/10</span></li>
            <li className="hidden text-gold/60 sm:inline">·</li>
            <li>Lördag <span className="text-gold">3/10</span></li>
            <li className="hidden text-gold/60 sm:inline">·</li>
            <li>Söndag <span className="text-gold">4/10</span></li>
          </ul>

          <div className="mt-9">
            <Link href="/anmalan" className="btn-primary">
              Till anmälan
            </Link>
            <p className="mt-3 text-sm text-parchment/70">Anmälan öppnar inom kort</p>
          </div>
        </div>
      </section>

      {/* Helgens festligheter */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center font-serif text-4xl font-semibold text-parchment">
          Helgens festligheter
        </h2>
        <div className="rule-gold mx-auto mt-4 mb-10 w-40" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Fredag */}
          <div className="card-surface p-6">
            <h3 className="mb-4 text-center text-2xl font-semibold text-navy">
              Fredag 2 oktober
            </h3>
            <ul className="space-y-2 text-ink">
              <li className="font-medium text-nationRed">Snörsjöasittning · 18:00</li>
              <li>
                Sittning å Helsingkrona nations gille för att båda välkomna våra vännationer och för
                att värma upp ordentligt inför lördagens balfestligheter. Kvällen avslutas på
                Helsingkronas nattklubb Schlagernatt.
              </li>
            </ul>
          </div>

          {/* Lördag */}
          <div className="card-surface p-6">
            <h3 className="mb-4 text-center text-2xl font-semibold text-navy">
              Lördag 3 oktober
            </h3>
            <ul className="space-y-2 text-ink">
              <li className="font-medium text-nationRed">Dörrarna öppnar · 16:30</li>
              <li>
                Ordenshögtid &amp; middag med installation av hederledamöter och proinspektor å
                Akademiska föreningen.
              </li>
            </ul>
          </div>

          {/* Söndag */}
          <div className="card-surface p-6">
            <h3 className="mb-4 text-center text-2xl font-semibold text-navy">
              Söndag 4 oktober
            </h3>
            <ul className="space-y-2 text-ink">
              <li className="font-medium text-nationRed">Balbrunch · 12:00</li>
              <li>
                Vill man förlänga sin balhelg så kan man anmäla sig till en brunch på Helsingkrona där
                man kan bota din huvudvärk, eller välja att skjuta upp den till måndagen. Här bjuds det
                på en fin brunchbuffé och försäljning av klassiska brunchdrinkar.
              </li>
            </ul>
          </div>
        </div>

        {/* Hälsning från proinspektor */}
        <div className="card-surface mx-auto mt-10 max-w-3xl p-8">
          <h3 className="mb-3 text-center text-2xl font-semibold text-navy">
            Snörsjöamossens historia
          </h3>
          <p className="text-ink">
            Snörsjöamossen i Småland testamenterades 1947 till Helsingkrona Nation av Emy Ekberg,
            tidigare medlem i nationen. 1976 instiftades Snörsjöa-orden, med huvudsakligt syfte att
            få en bra anledning att årligen ställa till med en nationsfest utöver det vanliga. Det
            första ordensfirandet skedde 1978 i AF:s stora sal, och sedan dess har Snörsjöabalen
            firats årligen, med undantag från pandemi-året 2020. Därav kommer den 50:onde balen gå
            av stapeln 2028.
          </p>
        </div>
      </section>

      {/* Glimtar från balen */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-center font-serif text-4xl font-semibold text-parchment">
          Glimtar från balen
        </h2>
        <div className="rule-gold mx-auto mt-4 mb-10 w-40" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { src: "/serving_food.jpg", caption: "Middagen" },
            { src: "/party.jpg", caption: "Festen" },
            { src: "/dancing_club.jpg", caption: "Dansen" },
          ].map((img) => (
            <figure
              key={img.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-gold/40 shadow-md"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-0 right-0 text-center font-serif text-xl tracking-wide text-parchment">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
