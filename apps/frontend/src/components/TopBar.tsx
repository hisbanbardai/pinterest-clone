import useAuthentication from "../hooks/useAuthentication";
import AccountButton from "./AccountButton";
import ProfileAvatar from "./ProfileAvatar";
import SearchForm from "./SearchForm";

export default function TopBar() {
  const { currentUser } = useAuthentication();

  return (
    <div className="flex py-4 gap-5 top-0 items-center w-[calc(100%-72px)] z-40 pr-3 fixed bg-white h-[80px]">
      <div className="pl-4 flex-1">
        <SearchForm />
      </div>
      <div>
        <ProfileAvatar image={currentUser?.image} />
      </div>
      <div>
        <AccountButton />
      </div>
    </div>
  );
}
