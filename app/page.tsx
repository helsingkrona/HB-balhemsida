import Banner from "@/components/Banner";
import Image from "next/image";
import CountdownServer from "@/components/CountdownServer"

export default function Home() {
  return (
    <>
      <main
        style={{
          backgroundImage: "url('/studiovega_241005_249.jpg')",
          minHeight: "100vh", // to fill screen
          backgroundSize: "cover",
        }}>

        {/* Overlay for text and countdown */}
        <div className=" flex flex-col items-center justify-center text-center pt-24">
          {/* Title */}
          <h1 className="text-white text-5xl md:text-5xl font-bold mb-2">
            SNÖRSJÖAORDEN 2025
          </h1>

          {/* Countdown Timer */}
          <CountdownServer />
        </div>



        <div className="container mx-auto px-4 pt-24 pb-16">
          <h2 className="text-4xl text-white font-bold text-center">Helgens festligheter</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Friday Column */}
            <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl text-blue-950 font-semibold text-center mb-4">
                Fredag 4 oktober
              </h3>
              <ul className="space-y-2 text-black">
                <li>Snörsjöasittning - 18:00</li>
                <li>Sittning å Helsingkrona nations gille för att båda välkomna våra vännationer och för att värma upp ordentligt inför lördagens balfestligheter. Kvällen avslutas på Helsingkronas nattklubb Schlagernatt.</li>
                
              </ul>
            </div>

            {/* Saturday Column */}
            <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-center text-blue-950 mb-4">
                Lördag 5 oktober
              </h3>
              <ul className="space-y-2 text-black">
                <li>Dörrarna öppnar - 16.30</li>
                <li>Ordenshögtid & middag med installation av hederledamöter och proinspektor å Akademiska föreningen.</li>
              </ul>
            </div>

            {/* Sunday Column */}
            <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-center text-blue-950 mb-4">
                Söndag 6 oktober
              </h3>
              <ul className="space-y-2 text-black">
                <li>Balbrunch - 12:00</li>
                <li>Vill man förlänga sin balhelg så kan man anmäla sig till en brunch på Helsingkrona där man kan bota din huvudvärk, eller välja att skjuta upp den till måndagen. Här bjuds det på en fin brunchbuffé och försäljning av klassiska brunchdrinkar.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


