import { Link } from "react-router";
import Logo from "./Logo";

type TAuthComponentProps = {
  children: React.ReactNode;
  title: string;
  bottomText: string;
  linkText: string;
  linkTo: string;
};

export default function AuthComponent({
  children,
  title,
  bottomText,
  linkText,
  linkTo,
}: TAuthComponentProps) {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="shadow-xl px-10 py-8 flex flex-col gap-5 rounded-2xl min-w-[450px]">
        <Logo />
        <h1 className="text-2xl font-semibold text-center">{title}</h1>
        {children}
        <p className="text-sm text-center">
          {bottomText}{" "}
          <span className="font-bold">
            <Link to={linkTo}>{linkText}</Link>
          </span>
        </p>
      </div>
    </main>
  );
}
