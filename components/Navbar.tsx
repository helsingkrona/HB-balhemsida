import Image from "next/image";
import Link from "next/link";
const Navbar: React.FC = () => {
  return (
    <nav className="bg-primaryBlue p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="basis-1/5 flex justify-start">
          <a href="/">
            <Image
              src={"/shield_color.png"}
              alt="HB logo"
              width={64}
              height={64}
            />
          </a>

        </div>
        <ul className="basis-3/5 flex justify-center space-x-6">
          <li>
            <Link href="/about" className="text-white hover:underline">Om</Link>
          </li>
          <li>
            <Link href="/anmalan" className="text-white hover:underline">Anmälan</Link>
          </li>
          <li>
            <Link href="/sponsorer" className="text-white hover:underline">Sponsorer</Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:underline">Kontakt</Link>
          </li>
        </ul>
        <div className="basis-1/5">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;