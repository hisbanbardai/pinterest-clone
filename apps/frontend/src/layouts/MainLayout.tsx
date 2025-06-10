import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-y-hidden w-full">
      <div className="w-[72px] border-r border-black/10 flex justify-center fixed h-full">
        <Sidebar />
      </div>
      <div className="flex-1 ml-[72px] mt-[80px] w-full ">
        <TopBar />
        <div className="h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
