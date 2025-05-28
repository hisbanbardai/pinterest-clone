import AccountButton from "./AccountButton";
import ProfileAvatar from "./ProfileAvatar";
import SearchForm from "./SearchForm";

export default function TopBar() {
  return (
    <div className="flex py-4 gap-5 items-center relative z-40">
      <div className="flex-1">
        <SearchForm />
      </div>
      <ProfileAvatar />
      <AccountButton />
    </div>
  );
}
