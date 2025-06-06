export default function CommentForm() {
  return (
    <form className="flex bg-neutral-200 rounded-full px-4 py-2 items-center">
      <input
        type="text"
        placeholder="Add a comment"
        className=" w-full  placeholder:text-black/25 outline-none"
      />
      <div className="text-lg cursor-pointer">😊</div>
    </form>
  );
}
