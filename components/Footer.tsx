import Image from "next/image";
import Link from "next/link";
const Footer: React.FC = () => {
    return (

        <footer className="row-start-3 striped-navbar flex gap-6 pt-1 flex-wrap items-center justify-between h-24">
            <a className="items-center flex p-3">
                <Image
                    aria-hidden
                    src="/SEBvit.png"
                    alt="SEB icon"
                    width={64}
                    height={64}
                />
            </a>

            <a className="flex items-center gap-2">
                <p className="text-white">
                    Helsingkrona Nation, Tornavägen 3C, 223 64 Lund
                    Tel: 046-14 60 64, Mail: kuratel@helsingkrona.se
                </p>
            </a>

            <a className="items-center flex p-3">
                <Image
                    aria-hidden
                    src="/studentlund-vit.png"
                    alt="Studentlund icon"
                    width={64}
                    height={64}
                />
            </a>
        </footer>
    );
};

export default Footer;