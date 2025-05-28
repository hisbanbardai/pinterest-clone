export default function SearchForm() {
  return (
    <div className="flex gap-4 bg-neutral-100 h-[50px] items-center px-4 rounded-xl">
      <img src="/general/search.svg" alt="search icon" className="w-[15px]" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none"
        />
      </form>
    </div>
  );
}
