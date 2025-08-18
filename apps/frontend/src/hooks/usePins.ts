import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function usePins(
  searchText: string,
  userId: string,
  galleryType?: string | undefined
) {
  const LIMIT = 21;

  // below function would work if we use offset based pagination

  // async function fetchPins({ pageParam }) {
  //   const { data } = await axios.get(
  //     `${import.meta.env.VITE_API_BASE_URL}/pins?limit=${LIMIT}&offset=${pageParam}`
  //   );
  //   return data;
  // }

  async function fetchPins({
    pageParam,
    searchText,
    userId,
    galleryType,
  }: {
    pageParam: string | null;
    searchText: string;
    userId: string;
    galleryType: string | undefined;
  }) {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/pins?limit=${LIMIT}&cursor=${pageParam}&search=${searchText}&userId=${userId || ""}&galleryType=${galleryType || ""}`
    );
    return data;
  }

  // Queries
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["pins"],
  //   queryFn: fetchPins,
  //   staleTime: 1000 * 60 * 60,
  //   refetchOnWindowFocus: false,
  //   retry: false,
  // });

  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["pins", searchText, userId],
      //we are passing the pageParam as an argument below because React Query manages the pageParam internally. React Query calls your function and passes the current pageParam as an argument. Your function i.e. fetchPins receives it and uses it.
      queryFn: ({ pageParam }) =>
        fetchPins({ pageParam, searchText, userId, galleryType }),
      initialPageParam: null,
      getNextPageParam: (lastPage) =>
        lastPage.pins.length < LIMIT ? undefined : lastPage.cursor,
    });

  const observeDivRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    function handleIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersect, options);
    if (observeDivRef.current) {
      observer.observe(observeDivRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return {
    error,
    isLoading,
    data,
    observeDivRef,
    hasNextPage,
  };
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

      lastPage: the data you just fetched
      pages: all pages fetched so far

    Your function decides what the next pageParam should be (e.g., the next offset i.e. skip in prisma).

    If getNextPageParam returns a value, React Query knows it can fetch another page when triggered.

    If it returns undefined, React Query knows there are no more pages.

4. Fetching next page:

    React Query does NOT automatically fetch the next page right away. It waits for you to trigger it via fetchNextPage() (or via something like a scroll event).

    When you call fetchNextPage(), React Query uses the last pageParam returned from getNextPageParam and calls queryFn again with that.

*/
