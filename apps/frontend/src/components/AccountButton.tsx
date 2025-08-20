import { useEffect, useState } from "react";
import UserOptionsModal from "./UserOptionsModal";
import { useLocation } from "react-router";

export default function AccountButton() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //we are using useLocation to close the modal whenever user navigates from one route to the other
  useEffect(() => {
    setIsModalOpen(false);
  }, [location.pathname]);

  function handleClick() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <div className=" sm:block relative">
      <button
        onClick={handleClick}
        className="bg-neutral-200 p-1 rounded-full cursor-pointer"
      >
        <img
          className="w-[15px]"
          src="/general/arrow.svg"
          alt="down arrow icon"
        />
      </button>
      {isModalOpen && <UserOptionsModal />}
    </div>
  );
}
