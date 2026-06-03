export default function ContactPage() {
  return (
    <main>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-950 text-center mb-6">Kontakt</h1>

          <p className="text-black mb-6 text-center">
            Har du frågor om Snörsjöaorden? Hör gärna av dig till oss!
          </p>

          <div className="space-y-4 text-black">
            <div>
              <h2 className="text-xl font-semibold text-blue-950">Helsingkrona Nation</h2>
              <p>
                Tornavägen 3C, 223 64 Lund
                <br />
                Tel: 046-14 60 64
                <br />
                Mail:{" "}
                <a href="mailto:kuratel@helsingkrona.se" className="text-blue-700 underline">
                  kuratel@helsingkrona.se
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-950">Frågor om anmälan</h2>
              <p>
                Övermarskalk:{" "}
                <a href="mailto:overmarskalk@helsingkrona.se" className="text-blue-700 underline">
                  overmarskalk@helsingkrona.se
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-950">Tekniska frågor om hemsidan</h2>
              <p>
                <a href="mailto:it@helsingkrona.se" className="text-blue-700 underline">
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
