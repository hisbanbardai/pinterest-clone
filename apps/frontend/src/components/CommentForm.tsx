import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

export default function CommentForm() {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [inputComment, setInputComment] = useState("");

  function handleEmojiClick(emoji_obj: EmojiClickData) {
    setInputComment((prev) => prev + emoji_obj.emoji);
    setIsEmojiPickerOpen(false);
  }

  function handleChangeComment(e: React.ChangeEvent<HTMLInputElement>) {
    setInputComment(e.target.value);
  }

  return (
    <form className="flex bg-neutral-100 rounded-full px-4 py-2 items-center">
      <input
        type="text"
        placeholder="Add a comment"
        className=" w-full  placeholder:text-black/25 outline-none"
        value={inputComment}
        onChange={handleChangeComment}
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
    </form>
  );
}
