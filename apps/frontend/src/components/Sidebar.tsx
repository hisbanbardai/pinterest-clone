import { Link } from "react-router";

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
  {
    href: "/",
    imageSource: "/general/updates.svg",
    alt: "updates icon image",
  },
  {
    href: "/",
    imageSource: "/general/messages.svg",
    alt: "messages icon image",
  },
  {
    href: "/",
    imageSource: "/general/more.svg",
    alt: "more icon image",
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
            className="last:mt-auto flex justify-center w-[48px] h-[48px] hover:bg-neutral-100 cursor-pointer"
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

function Logo() {
  return (
    <div className="w-full flex justify-center">
      <a href="/" className="w-[24px]">
        <img src="/general/logo.png" alt="logo image" />
      </a>
    </div>
  );
}
