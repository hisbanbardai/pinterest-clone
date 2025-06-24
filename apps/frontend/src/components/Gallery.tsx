import { Image } from "@imagekit/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

// const items = [
//   {
//     id: 1,
//     source: "/pins/pin1.jpeg",
//   },
//   {
//     id: 2,
//     source: "/pins/pin2.jpeg",
//   },
//   {
//     id: 3,
//     source: "/pins/pin3.jpeg",
//   },
//   {
//     id: 4,
//     source: "/pins/pin4.jpeg",
//   },
//   {
//     id: 5,
//     source: "/pins/pin5.jpeg",
//   },
//   {
//     id: 6,
//     source: "/pins/pin6.jpeg",
//   },
//   {
//     id: 7,
//     source: "/pins/pin7.jpeg",
//   },
//   {
//     id: 8,
//     source: "/pins/pin8.jpeg",
//   },
//   {
//     id: 9,
//     source: "/pins/pin9.jpeg",
//   },
//   {
//     id: 10,
//     source: "/pins/pin10.jpeg",
//   },
//   {
//     id: 11,
//     source: "/pins/pin11.jpeg",
//   },
//   {
//     id: 12,
//     source: "/pins/pin12.jpeg",
//   },
//   {
//     id: 13,
//     source: "/pins/pin13.jpeg",
//   },
//   {
//     id: 14,
//     source: "/pins/pin14.jpeg",
//   },
//   {
//     id: 15,
//     source: "/pins/pin15.jpeg",
//   },
//   {
//     id: 16,
//     source: "/pins/pin16.jpeg",
//   },
//   {
//     id: 17,
//     source: "/pins/pin17.jpeg",
//   },
//   {
//     id: 18,
//     source: "/pins/pin18.jpeg",
//   },
//   {
//     id: 19,
//     source: "/pins/pin19.jpeg",
//   },
//   {
//     id: 20,
//     source: "/pins/pin20.jpeg",
//   },
// ];

const LIMIT = 10;

async function fetchPins({ pageParam }) {
  console.log(pageParam);
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/pins?limit=${LIMIT}&offset=${pageParam}`
  );
  console.log(data);
  return data;
}

export default function Gallery() {
  // Queries
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["pins"],
  //   queryFn: fetchPins,
  //   staleTime: 1000 * 60 * 60,
  //   refetchOnWindowFocus: false,
  //   retry: false,
  // });

  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pins"],
    queryFn: fetchPins,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.pins.length < LIMIT ? undefined : lastPage.nextOffset,
  });

  if (error) {
    return "An error occurred: " + error.message;
  }

  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-4 lg:columns-7 px-4">
        {Array.from({ length: 20 }).map(() => (
          <div
            role="status"
            className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 mb-4"
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

  // return (
  //   <main className="columns-1 sm:columns-2 md:columns-4 lg:columns-7 px-4">
  //     {data?.map((item) => <GalleryItem item={item} key={item.id} />)}
  //   </main>
  // );

  return <button onClick={() => fetchNextPage()}>Load more</button>;
}

function GalleryItem({ item }) {
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

        <div className="hidden group-hover:flex flex-col items-end justify-between absolute w-full top-0 left-0 bg-black/30 h-full py-3 pr-3 transition-all duration-1000">
          <div>
            <button className="text-white bg-red-600 py-3 px-4 rounded-full font-semibold cursor-pointer">
              Save
            </button>
          </div>

          <div className="flex gap-3">
            <button className="bg-white p-1 rounded-full cursor-pointer">
              <img src="/general/share.svg" alt="share-pin-icon" />
            </button>
            <button className="bg-white p-1 rounded-full cursor-pointer">
              <img src="/general/more.svg" alt="more-options-icon" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

/*
How useInfiniteQuery Works Under the Hood:
1. Initial fetch:

    React Query calls your queryFn with pageParam set to initialPageParam (usually 0 or whatever you provide).

    Your queryFn fetches that "page" of data from the backend and returns it.

2. Storing pages:

    The response of each fetch is stored in an array called pages. So pages[0] is the first page, pages[1] the second, etc.

3. Determining if more data exists:

    After each fetch, React Query calls your getNextPageParam function with:

      lastPage: the data you just fetched pages: all pages fetched so far

    Your function decides what the next pageParam should be (e.g., the next offset i.e. skip in prisma).

    If getNextPageParam returns a value, React Query knows it can fetch another page when triggered.

    If it returns undefined, React Query knows there are no more pages.

4. Fetching next page:

    React Query does NOT automatically fetch the next page right away. It waits for you to trigger it via fetchNextPage() (or via something like a scroll event).

    When you call fetchNextPage(), React Query uses the last pageParam returned from getNextPageParam and calls queryFn again with that.

*/
