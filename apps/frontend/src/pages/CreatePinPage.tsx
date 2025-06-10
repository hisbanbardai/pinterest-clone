export default function CreatePinPage() {
  return (
    <main className="min-h-screen overflow-y-auto mb-10">
      <div className="flex justify-between items-center border-b border-black/10 py-3 w-full px-4 border-t">
        <span className="font-semibold text-xl">Create Pin</span>
        <div className="flex gap-5 items-center">
          <span className="text-black/35 font-medium">Changes stored!</span>
          <button className="text-white bg-red-600 py-3 px-4 rounded-full cursor-pointer">
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-col max-w-[500px] mx-5 sm:mx-auto lg:flex-row lg:justify-center lg:max-w-[1000px]  gap-10 pt-7">
        <div className="flex-1/3 flex flex-col gap-6">
          <div className="bg-neutral-200 h-[500px] rounded-2xl border-neutral-300 border-1 flex flex-col justify-between py-5">
            <div className="flex flex-col justify-center items-center flex-1 gap-3">
              <img
                src="/general/upload.svg"
                alt="upload-icon"
                className="w-[25px] object-cover"
              />
              <p className="text-black/70">
                Choose a file or drag and drop it here
              </p>
            </div>
            <div className="text-sm text-center text-neutral-500 px-4">
              We recommend using high quality .jpg files less than 20MB or .mp4
              files less than 200MB.
            </div>
          </div>

          <p className="border-b border-neutral-300"></p>

          <button className="bg-neutral-200 font-semibold rounded-full py-1">
            Save from URL
          </button>
        </div>

        <div className="flex-1/2 ">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="title">
                Title
              </label>
              <input
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px]"
                type="text"
                id="title"
                name="title"
                placeholder="Add a title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="description">
                Description
              </label>
              <textarea
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px] resize-none"
                id="description"
                name="description"
                placeholder="Add a detailed description"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="link">
                Link
              </label>
              <input
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px]"
                type="text"
                id="link"
                name="link"
                placeholder="Add a link"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="board">
                Board
              </label>
              <select
                name="board"
                id="board"
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px] text-black/45"
              >
                <option value="">Choose a board</option>
                <option value="1">Board 1</option>
                <option value="2">Board 2</option>
                <option value="3">Board 3</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="tags">
                Tagged topics
              </label>
              <input
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px]"
                type="text"
                name="tags"
                id="tags"
                placeholder="Search for a tag"
              />
              <small className="text-black/50">
                Don't worry people won't see your tags
              </small>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
