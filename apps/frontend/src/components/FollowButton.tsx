import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export default function FollowButton({
  isFollowing,
  username,
}: {
  isFollowing: boolean;
  username: string | undefined;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", username] });
    },
    onError(error) {
      console.error(error.message);
      toast.error(error.message);
    },
  });

  async function handleFollow(username: string | undefined) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/follows/${username}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Unable to follow/unfollow the user");
    }

    return response.data;
  }

  return (
    <button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate(username)}
      className="bg-red-600 text-white font-medium px-4 py-3 rounded-full text-sm cursor-pointer hover:bg-red-500 disabled:bg-red-200"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
