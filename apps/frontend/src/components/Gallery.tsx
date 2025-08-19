import { Image } from "@imagekit/react";
import { Link } from "react-router";
import usePins from "../hooks/usePins";
import useSearchQueryContext from "../hooks/useSearchQueryContext";
import type { TPin } from "../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export default function Gallery({
  userId,
  galleryType,
}: {
  userId?: string;
  galleryType?: string;
}) {
  const { searchText } = useSearchQueryContext();
  const { error, isLoading, hasNextPage, data, observeDivRef } = usePins(
    searchText,
    userId,
    galleryType
  );

  if (error) {
    return <p className="text-red-500">An error occurred: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-4 lg:columns-7 px-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            role="status"
            className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 mb-4"
            key={index}
          >
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ))}
      </div>
    );
  }

  if (data?.pages[0].pins.length === 0) {
    return (
      <div className="text-center font-semibold text-lg mb-5">
        No related posts!!
      </div>
    );
  }

  return (
    <>
      <main className="columns-1 sm:columns-2 md:columns-4 lg:columns-7 px-4">
        {data?.pages.flatMap((page) =>
          page.pins.map((pin: TPin) => <GalleryItem item={pin} key={pin.id} />)
        )}
      </main>
      <div ref={observeDivRef} className="h-[50px]"></div>
      {!hasNextPage ? (
        <div className="text-center font-semibold text-lg mb-5">
          All posts are loaded!!
        </div>
      ) : (
        <div className="text-center font-semibold text-lg mb-5">
          Loading more posts...
        </div>
      )}
    </>
  );
}

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

function GalleryItem({ item }: { item: TPin }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pins"] }),
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message);
    },
  });

  function handleSaveBtnClick(pinId: string) {
    mutation.mutate(pinId);
  }

  return (
    <div className="rounded-lg mb-5 overflow-hidden cursor-pointer group relative">
      <Link to={`/pin/${item.id}`}>
        <Image
          className="w-full"
          loading="lazy"
          responsive={false}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          src={item.imageUrl}
          transformation={[
            {
              quality: 20,
            },
            {
              width: 372,
            },
          ]}
        />
      </Link>
      <div className="hidden group-hover:flex flex-col items-end justify-between absolute w-full top-0 left-0 bg-black/30 h-full py-3 pr-3 transition-all duration-1000 pointer-events-none">
        <div>
          <button
            onClick={() => handleSaveBtnClick(item.id)}
            className="text-white bg-red-600 hover:bg-red-400 py-3 px-4 rounded-full font-semibold cursor-pointer pointer-events-auto"
          >
            {item.savedPins.length ? "Saved" : "Save"}
          </button>
        </div>

        {/* <div className="flex gap-3">
            <button className="bg-white p-1 rounded-full cursor-pointer">
              <img src="/general/share.svg" alt="share-pin-icon" />
            </button>
            <button className="bg-white p-1 rounded-full cursor-pointer">
              <img src="/general/more.svg" alt="more-options-icon" />
            </button>
          </div> */}
      </div>
    </div>
  );
}
