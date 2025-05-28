export default function UserOptionsModal() {
  return (
    <ul className="bg-black/65 px-2 py-4 rounded-xl flex flex-col gap-3 w-[120px] text-center absolute right-0 mr-3 mt-6 text-white">
      <li className="hover:bg-neutral-500 cursor-pointer py-1">Profile</li>
      <li className="hover:bg-neutral-500 cursor-pointer py-1">Settings</li>
      <li className="hover:bg-neutral-500 cursor-pointer py-1">Logout</li>
    </ul>
  );
}
