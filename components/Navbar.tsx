import Image from "next/image";
import Link from "next/link";
const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-950 p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="basis-1/5 flex justify-start">
          <Link href="/">
            <Image
              src={"/shield_color.png"}
              alt="HB logo"
              width={64}
              height={64}
            />
          </Link>

        </div>
        <ul className="basis-3/5 flex justify-center space-x-6">
          <li>
            <Link href="/" className="navbar-links">Start</Link>
          </li>
          <li>
            <Link href="/about" className="navbar-links">Om</Link>
          </li>
          <li>
            <Link href="/anmalan" className="navbar-links">Anmälan</Link>
          </li>
          <li>
            <Link href="https://helsingkrona.se/sv/kontakta-oss" className="navbar-links">Kontakt</Link>
          </li>
        </ul>
        <div className="basis-1/5">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;