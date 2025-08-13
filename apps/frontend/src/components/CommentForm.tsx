import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

async function addComment(comment: { text: string; pinId: string }) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/comments`,
    comment,
    {
      withCredentials: true,
    }
  );

  return response.data;
}

export default function CommentForm({ pinId }: { pinId: string }) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentsByPin", pinId] });
      setInputComment("");
    },
  });

  function handleEmojiClick(emoji_obj: EmojiClickData) {
    setInputComment((prev) => prev + emoji_obj.emoji);
    setIsEmojiPickerOpen(false);
  }

  function handleChangeComment(e: React.ChangeEvent<HTMLInputElement>) {
    setInputComment(e.target.value);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputComment.trim()) {
      return;
    }

    mutation.mutate({
      text: inputComment,
      pinId,
    });
  }

  return (
    <form
      className="flex bg-neutral-100 rounded-full px-4 py-2 items-center"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        placeholder="Add a comment"
        className=" w-full placeholder:text-black/25 outline-none"
        value={inputComment}
        onChange={handleChangeComment}
        disabled={mutation.isPending}
      />
      <div className="text-lg cursor-pointer relative">
        <div onClick={() => setIsEmojiPickerOpen((prev) => !prev)}>😊</div>
        <div className="absolute bottom-10 right-10">
          <EmojiPicker
            open={isEmojiPickerOpen}
            onEmojiClick={handleEmojiClick}
            autoFocusSearch
          />
        </div>
      </div>
      <button className="cursor-pointer ml-2" disabled={mutation.isPending}>
        <svg
          aria-hidden="true"
          aria-label=""
          className="Hn_ gUZ U9O AR6"
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M4.07 1.37a2.1 2.1 0 0 0-2.8 2.59L3.94 12l-2.69 8.04a2.1 2.1 0 0 0 2.81 2.6l18.1-7.7A3 3 0 0 0 24 12.18v-.36a3 3 0 0 0-1.83-2.76zm-.89 1.86a.1.1 0 0 1 .1-.02l18.11 7.7a1 1 0 0 1 .61.91v.36a1 1 0 0 1-.6.92L3.28 20.8a.1.1 0 0 1-.13-.12L5.72 13H14v-2H5.72L3.16 3.33a.1.1 0 0 1 .02-.1"></path>
        </svg>
      </button>
    </form>
  );
}
