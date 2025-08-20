import { Image } from "@imagekit/react";
import ProfileAvatar from "./ProfileAvatar";
import { Link } from "react-router";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import usePinContext from "../hooks/usePinContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function savePost(pinId: string) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/savedPins`,
    {
      pinId,
    },
    {
      withCredentials: true,
    }
  );

  if (response.status !== 201 && response.status !== 200) {
    throw new Error("Unable to save or unsave pin");
  }

  return response.data;
}

export default function Pin() {
  const { error, isLoading, pin, user, savedPinCount } = usePinContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: savePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["pin", pin.id] }),
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message);
    },
  });

  function handleSaveBtnClick(pinId: string) {
    mutation.mutate(pinId);
  }

  if (error) {
    return <p className="text-red-500">An error occurred: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:flex-row md:items-center md:justify-center mt-10 flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center w-full h-100 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-[500px]">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <main className="mb-10">
      <section className="lg:max-w-5xl lg:flex-row md:flex-col flex-col max-w-3xl flex justify-center mx-auto ">
        <div className="flex gap-10 flex-1">
          <div className="mt-4" hidden>
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

          <div className="overflow-hidden flex-1 rounded-l-2xl">
            <Image
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              // src={"/pins/pin1.jpeg"}
              src={pin.imageUrl}
              alt="test picture"
              width={736}
              className="h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 border-b border-t border-r rounded-r-2xl border-black/10 p-2 flex flex-col gap-8">
          <div className="flex justify-between">
            <div className="flex items-center gap-5 font-semibold">
              {savedPinCount ? (
                <span className="font-normal text-sm">
                  📌 {savedPinCount} people saved this pin
                </span>
              ) : null}
            </div>
            <div>
              <button
                onClick={() => handleSaveBtnClick(pin.id)}
                className="bg-red-600 text-white px-3 py-2 rounded-full cursor-pointer hover:bg-red-400"
              >
                {pin.savedPins.length ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-2xl">{pin.title}</h1>
          </div>

          <div className="flex items-center text-[13px] gap-2">
            <ProfileAvatar image={user.image} />
            <Link to={`/profile/${user.username}`}>
              <span className="text-[16px]">{user.name}</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto text-sm">
            <Comments pinId={pin.id} />
          </div>

          <div>
            <CommentForm pinId={pin.id} />
          </div>
        </div>
      </section>
    </main>
  );
}
