import axios from "axios";
import { Link, useNavigate } from "react-router";
import useAuthentication from "../hooks/useAuthentication";

export default function UserOptionsModal() {
  const navigate = useNavigate();
  const { handleLogout, currentUser } = useAuthentication();

  async function handleClick() {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    // localStorage.removeItem("userId");

    handleLogout();
    navigate("/signin");
  }

  return (
    <ul className="bg-black/65 px-2 py-4 rounded-xl flex flex-col gap-3 w-[120px] text-center absolute right-0 mr-3 mt-6 text-white">
      <li className="hover:bg-neutral-500 cursor-pointer py-1">
        <Link to={`/profile/${currentUser?.username}`}>Profile</Link>
      </li>
      <li className="hover:bg-neutral-500 cursor-pointer py-1">Settings</li>
      <li>
        <button
          onClick={handleClick}
          className="w-full hover:bg-neutral-500 cursor-pointer py-1"
        >
          Logout
        </button>
      </li>
    </ul>
  );
}
