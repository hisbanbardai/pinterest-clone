export default function ProfileAvatar({ image }: { image?: string }) {
  return (
    <div className="cursor-pointer hidden sm:block">
      <img
        className="w-[30px] object-cover rounded-full"
        src={image ? image : "/general/noAvatar.png"}
        alt=""
      />
    </div>
  );
}
