import { Image } from "@imagekit/react";
import ProfileAvatar from "../components/ProfileAvatar";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";
import { Link } from "react-router";

export default function PinDetailsPage() {
  return (
    <main className="max-h-screen mb-10">
      <section className="lg:max-w-5xl lg:flex-row md:flex-col flex-col max-w-3xl flex justify-center mx-auto h-full">
        <div className="flex gap-10 flex-1">
          <div className="mt-4">
            <svg
              aria-hidden="true"
              aria-label=""
              height="36"
              role="img"
              viewBox="0 0 24 24"
              width="36"
              className="hover:bg-neutral-200 px-2 cursor-pointer rounded-full "
            >
              <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
            </svg>
          </div>

          <div className="overflow-hidden flex-1 rounded-l-2xl h-full">
            <Image
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              src={"/pins/pin1.jpeg"}
              alt="test picture"
              width={736}
              className="h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 border-b border-t border-r rounded-r-2xl border-black/10 p-2 flex flex-col gap-8">
          <div className="flex justify-between">
            <div className="flex items-center gap-5 font-semibold">
              <img src="/general/react.svg" alt="Love icon" width={20} />
              <span>273</span>
              <img src="/general/share.svg" alt="" width={20} />
              <img src="/general/more.svg" alt="" width={20} />
            </div>
            <div>
              <button className="bg-red-600 text-white px-3 py-2 rounded-full">
                Save
              </button>
            </div>
          </div>

          <div className="flex items-center text-[13px] gap-2">
            <ProfileAvatar />
            <Link to={"/profile/john"}>
              <span>John Doe</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto text-sm">
            <Comments />
          </div>

          <div>
            <CommentForm />
          </div>
        </div>
      </section>
    </main>
  );
}
