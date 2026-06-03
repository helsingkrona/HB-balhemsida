import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="bg-navy">
            {/* Heraldisk guldlinje */}
            <div className="rule-gold" />

            <div className="container mx-auto px-4 py-6">
                <p className="text-center font-serif text-lg tracking-wide text-parchment mb-6">
                    Snörsjöaorden <span className="lozenge" /> Helsingkrona Nation
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6">
                    <Image
                        aria-hidden
                        src="/SEBvit.png"
                        alt=""
                        width={64}
                        height={64}
                    />

                    <p className="text-parchment/90 text-center text-sm leading-relaxed">
                        Helsingkrona Nation, Tornavägen 3C, 223 64 Lund
                        <br />
                        Tel: 046-14 60 64 &nbsp;·&nbsp; kuratel@helsingkrona.se
                    </p>

                    <Image
                        aria-hidden
                        src="/studentlund-vit.png"
                        alt=""
                        width={64}
                        height={64}
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
