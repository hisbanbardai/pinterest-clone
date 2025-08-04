import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProfile(username: string | undefined) {
  async function fetchUserProfile(username: string | undefined) {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/users/${username}`
    );
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["username", username],
    queryFn: () => fetchUserProfile(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  return {
    data,
    isLoading,
    error,
  };
}
