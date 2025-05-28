import Gallery from "./components/Gallery";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="flex min-h-screen">
      <div className="w-[72px] border-r border-black/10 flex justify-center fixed h-full">
        <Sidebar />
      </div>
      <div className="bg-blue-100 flex-1 px-4 ml-[72px]">
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
}

export default App;
