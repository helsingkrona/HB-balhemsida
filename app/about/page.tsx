import Image from "next/image";
export default function AboutPage() {

    return (
        <main>

            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 mb-12">
                    <p>Varje höst går Helsingkronas kära Snörsjöaorden av stapeln! Men varför håller Helsingkrona en bal varje år och varför heter den Snörsjöaorden? Jo, balen har en anrik historia som går hela vägen tillbaka till 1947 då en Helsingkronit vid namn Emy Ekberg donerade en mosse vid namn Snörsjöamossen till Helsingkrona i syfte att nationen skulle sälja den och på så sätt tjäna pengar på mossen.
                        <br></br>
                        Mossen har ett utsökt läge i det småländska landskapet strax norr om Markaryd men någon försäljning blev aldrig av och tur var väl det! Istället kom några finurliga Helskroniter 1976 på en idé om hur mossen kunde nyttjas och samma år skapades Snörsjöaorden. År 1978 var det äntligen dags och då intog Snörsjöaorden AF-borgen för första gången i Snörsjöamossens ära och ställde till med en bal utan dess like. Sedan dess har balen hållits traditionsenligt den första lördagen i oktober för att hedra mossen!
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">



                    <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        <div className="relative w-full h-full min-w-[120px] min-h-[120px] p-2 grid place-items-center">
                            <Image
                                aria-hidden
                                src="/medalj1.jpg"
                                alt="medalj 1"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="p-2 m-2">
                            <p>5:e ståndet: Torvvändare <br></br>
                                Denna medalj tilldelas vid deltagande i Snörsjöaorden för första gången. <br></br>Denna och följande medaljer är alla utformade i form av Snörsjöamossen i Småland.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        <div className="relative w-full h-full min-w-[120px] min-h-[120px] p-2 grid place-items-center">
                            <Image
                                aria-hidden
                                src="/medalj2.jpg"
                                alt="medalj 2"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="p-2 m-2">
                            <p>4:e ståndet: Stigfinnare <br></br>
                                Denna medalj får du när du deltar på Snörsjöaorden andra gången. <br></br>Den bygger vidare på Torvvändarens utformning, men kompletteras med ett stigmotiv.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        <div className="relative w-full h-full min-w-[120px] min-h-[120px] p-2 grid place-items-center">
                            <Image
                                aria-hidden
                                src="/medalj3.jpg"
                                alt="medalj 3"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="p-2 m-2">
                            <p>3:e ståndet Flottare <br></br>
                                Vid det tredje deltagandet i Snörsjöaorden tilldelas ståndet Flottare. <br></br>Medaljen utökas med motiv av vattendrag.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        <div className="relative w-full h-full min-w-[120px] min-h-[120px] p-2 grid place-items-center">
                            <Image
                                aria-hidden
                                src="/medalj4.jpg"
                                alt="medalj 4"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="p-2 m-2">
                            <p>2:a ståndet Rallare<br></br>
                                Vid det fjärde deltagandet i Snörsjöaorden erhålls en medalj som nu har utökats med en tågräls.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        <div className="relative w-full h-full min-w-[120px] min-h-[120px] p-2 grid place-items-center">
                            <Image
                                aria-hidden
                                src="/medalj5.jpg"
                                alt="medalj 5"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="p-2 m-2">
                            <p>1:a ståndet Jägare <br></br>
                                Jägare kan tilldelas vid deltagande i Snörsjöabalen för femte gången.<br></br>För denna medalj krävs dock mer än enbart närvaro på ordenskapitlet. Medaljen är den sista i ordningen, och det slutliga tillägget är ett jakttorn.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    )


}