import { useState } from "react";
import UserOptionsModal from "./UserOptionsModal";

export default function AccountButton() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  function handleClick() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <div className="hidden sm:block relative">
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
