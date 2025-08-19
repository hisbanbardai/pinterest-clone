import { Link } from "react-router";
import Logo from "./Logo";

const navLinks = [
  {
    href: "/",
    imageSource: "/general/home.svg",
    alt: "home icon image",
  },
  {
    href: "/create-pin",
    imageSource: "/general/create.svg",
    alt: "create icon image",
  },
];

export default function Sidebar() {
  return (
    <nav className="flex flex-col h-full gap-8 py-8 w-full items-center">
      <Logo />
      <ul className="flex flex-col gap-8 h-full w-full items-center">
        {navLinks.map((link) => (
          <li
            key={link.alt}
            className=" flex justify-center w-[48px] h-[48px] hover:bg-neutral-100 cursor-pointer"
          >
            <Link to={link.href} className="flex justify-center">
              <img src={link.imageSource} alt={link.alt} className="w-[20px]" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
