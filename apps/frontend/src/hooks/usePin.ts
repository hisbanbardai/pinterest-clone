import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchPin(id: string | undefined) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/pins/${id}`
  );
  // console.log(data);
  return response.data;
}

export default function usePin(id: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => fetchPin(id),
    enabled: !!id,
  });

  const { pin, user } = data || {};

  return {
    pin,
    user,
    isLoading,
    error,
  };
}
