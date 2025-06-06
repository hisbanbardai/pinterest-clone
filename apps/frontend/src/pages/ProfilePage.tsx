import { useState } from "react";

export default function ProfilePage() {
  const [galleryType, setGalleryType] = useState("saved");

  const activeTypeStyle = "border-b-3 border-black";

  function handleClickType() {
    setGalleryType((prev) => (prev === "saved" ? "created" : "saved"));
  }

  return (
    <main className="flex justify-center flex-col items-center gap-15">
      <section className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col items-center">
          <img
            className="w-[50px] object-cover"
            src="/general/noAvatar.png"
            alt=""
          />
          <p className="text-2xl font-bold">John Doe</p>
          <p className="text-neutral-400">@johndoe</p>
          <p className="font-semibold">10 followers &middot; 20 followings</p>
        </div>
        <div className="flex gap-5">
          <img src="/general/share.svg" alt="" width={20} />
          <button className="bg-neutral-300 text-black font-medium px-4 py-3 rounded-full text-sm cursor-pointer">
            Message
          </button>
          <button className="bg-red-600 text-white font-medium px-4 py-3 rounded-full text-sm cursor-pointer">
            Follow
          </button>
          <img src="/general/more.svg" alt="" width={20} />
        </div>
      </section>

      <section className="flex gap-6 font-semibold">
        <button
          onClick={handleClickType}
          className={`cursor-pointer hover:text-neutral-400 ${galleryType === "created" && activeTypeStyle} pb-1`}
        >
          Created
        </button>
        <button
          onClick={handleClickType}
          className={`cursor-pointer hover:text-neutral-400 ${galleryType === "saved" && activeTypeStyle} pb-1`}
        >
          Saved
        </button>
      </section>
    </main>
  );
}
