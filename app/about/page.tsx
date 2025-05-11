import Image from "next/image";
export default function AboutPage() {

    return (
        <main>

            <div className="container mx-auto flex items-center justify-between p-3">
                
                <div className="basis-1/2 flex justify-start p-3">
                    <p>Varje höst går Helsingkronas kära Snörsjöaorden av stapeln! Men varför håller Helsingkrona en bal varje år och varför heter den Snörsjöaorden? Jo, balen har en anrik historia som går hela vägen tillbaka till 1947 då en Helsingkronit vid namn Emy Ekberg donerade en mosse vid namn Snörsjöamossen till Helsingkrona i syfte att nationen skulle sälja den och på så sätt tjäna pengar på mossen.
                        <br></br>
                        Mossen har ett utsökt läge i det småländska landskapet strax norr om Markaryd men någon försäljning blev aldrig av och tur var väl det! Istället kom några finurliga Helskroniter 1976 på en idé om hur mossen kunde nyttjas och samma år skapades Snörsjöaorden. År 1978 var det äntligen dags och då intog Snörsjöaorden AF-borgen för första gången i Snörsjöamossens ära och ställde till med en bal utan dess like. Sedan dess har balen hållits traditionsenligt den första lördagen i oktober för att hedra mossen!

                    </p>

                </div>

                <div className="basis-1/2 flex justify-center">
                    <div className="relative w-80 h-80"> {/* Adjust width & height as needed */}
                        <Image
                            src={"/studiovega_241005_002.jpg"}
                            alt="OM och marskalker"
                            fill={true}
                        />
                    </div>
                </div>
            </div>
        </main>
    )


}