import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="w-[72px] border-r border-black/10 flex justify-center fixed h-full">
        <Sidebar />
      </div>
      <div className="flex-1 px-4 ml-[72px]">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}
