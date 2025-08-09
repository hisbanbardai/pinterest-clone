import { useQuery } from "@tanstack/react-query";
import ProfileAvatar from "./ProfileAvatar";
import axios from "axios";
import type { TComment } from "../lib/types";
import { format } from "timeago.js";

export default function Comments({ pinId }: { pinId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["commentsByPin", pinId],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/comments/${pinId}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    enabled: !!pinId,
  });

  if (isLoading) {
    return;
  }

  if (error) {
    return <p className="text-red-500">An error occurred: {error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">{data.comments.length} Comments</p>

      {data.comments.map((comment: TComment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

function Comment({ comment }: { comment: TComment }) {
  const { user } = comment;

  return (
    <div className="flex gap-2 items-start">
      <ProfileAvatar image={user.image} />
      <div>
        <p>{user.name}</p>
        <p>{comment.text}</p>
        <p className="text-xs text-neutral-500">{format(comment.createdAt)}</p>
      </div>
    </div>
  );
}
