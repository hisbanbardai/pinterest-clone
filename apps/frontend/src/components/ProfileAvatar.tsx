export default function ProfileAvatar() {
  return (
    <div className="cursor-pointer hidden sm:block">
      <img
        className="w-[30px] object-cover"
        src="/general/noAvatar.png"
        alt=""
      />
    </div>
  );
}
