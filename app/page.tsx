import Banner from "@/components/Banner";

export default function Home() {
  return (
    <>
      <main className="bg-blue-950">  
        <Banner />


        <div className="container mx-auto px-4 pt-4 pb-16">
          <h2 className="text-4xl text-white font-bold text-center">Helgens festligheter</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Friday Column */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">
                Friday, October 4
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>🎵 Snörsjöasittning - 18:00</li>
                <li>🍽️ Dinner & Entertainment</li>
                <li>🍻 Afterparty at the Nation</li>
              </ul>
            </div>

            {/* Saturday Column */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-center text-green-700 mb-4">
                Saturday, October 5
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>🎩 Balmiddag - 17:00</li>
                <li>🍷 Formal Dinner & Speeches</li>
                <li>🎶 Live Music & Dance</li>
              </ul>
            </div>

            {/* Sunday Column */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-center text-red-700 mb-4">
                Sunday, October 6
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>🥂 Balbrunch - 11:00</li>
                <li>☕ Coffee & Relaxation</li>
                <li>🎤 Closing Ceremony</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


