export default function ContactPage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-center font-serif text-5xl font-semibold text-parchment">
          Kontakt
        </h1>
        <div className="rule-gold mx-auto mt-4 mb-10 w-40" />

        <div className="card-surface mx-auto max-w-2xl p-8">
          <p className="mb-8 text-center text-ink">
            Har du frågor om Snörsjöaorden? Hör gärna av dig till oss!
          </p>

          <div className="space-y-6 text-ink">
            <div>
              <h2 className="font-serif text-xl font-semibold text-navy">Helsingkrona Nation</h2>
              <p>
                Tornavägen 3C, 223 64 Lund
                <br />
                Tel: 046-14 60 64
                <br />
                Mail:{" "}
                <a href="mailto:kuratel@helsingkrona.se" className="text-nationRed underline">
                  kuratel@helsingkrona.se
                </a>
              </p>
            </div>

            <div className="rule-gold" />

            <div>
              <h2 className="font-serif text-xl font-semibold text-navy">Frågor om anmälan</h2>
              <p>
                Notarie:{" "}
                <a href="mailto:notarie@helsingkrona.se" className="text-nationRed underline">
                  notarie@helsingkrona.se
                </a>
              </p>
            </div>

            <div className="rule-gold" />

            <div>
              <h2 className="font-serif text-xl font-semibold text-navy">Tekniska frågor om hemsidan</h2>
              <p>
                <a href="mailto:it@helsingkrona.se" className="text-nationRed underline">
                  it@helsingkrona.se
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
