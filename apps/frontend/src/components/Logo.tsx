import { Link } from "react-router";

export default function Logo() {
  return (
    <div className="w-full flex justify-center">
      <Link to="/" className="w-[24px]">
        <img src="/general/logo.png" alt="logo image" />
      </Link>
    </div>
  );
}
