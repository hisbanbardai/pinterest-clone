const navLinks = [
  {
    href: "/",
    imageSource: "/general/home.svg",
    alt: "home icon image",
  },
  {
    href: "/",
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
    <nav className="flex flex-col h-full gap-16 py-8 w-full items-center">
      <Logo />
      <ul className="flex flex-col gap-10 h-full w-full items-center">
        {navLinks.map((link) => (
          <li
            key={link.alt}
            className="last:mt-auto flex justify-center w-[48px] h-[48px] hover:bg-neutral-300"
          >
            <a href={link.href} className="flex justify-center">
              <img src={link.imageSource} alt={link.alt} className="w-[20px]" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <div className="w-full flex justify-center">
      <a href="/" className="w-[22px]">
        <img src="/general/logo.png" alt="logo image" />
      </a>
    </div>
  );
}
