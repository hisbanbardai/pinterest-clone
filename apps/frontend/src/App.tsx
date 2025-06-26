import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import CreatePinPage from "./pages/CreatePinPage";
import ProfilePage from "./pages/ProfilePage";
import PinDetailsPage from "./pages/PinDetailsPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ImageKitUpload from "./components/ImageKitUpload";
import SearchQueryContextProvider from "./contexts/SearchQueryContextProvider";

function App() {
  return (
    <BrowserRouter>
      <SearchQueryContextProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-pin" element={<CreatePinPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/pin/:id" element={<PinDetailsPage />} />
            <Route path="/test" element={<ImageKitUpload />} />
          </Route>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </SearchQueryContextProvider>
    </BrowserRouter>
  );
}

export default App;
