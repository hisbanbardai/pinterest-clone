import ProfileAvatar from "./ProfileAvatar";

export default function Comments() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">5 Comments</p>

      {Array.from({ length: 5 }).map(() => (
        <Comment />
      ))}
    </div>
  );
}

function Comment() {
  return (
    <div className="flex gap-2 items-start">
      <ProfileAvatar />
      <div>
        <p>John Doe</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p className="text-xs text-neutral-500">1h</p>
      </div>
    </div>
  );
}
