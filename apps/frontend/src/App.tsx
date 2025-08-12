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
import { Toaster } from "sonner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import UserContextProvider from "./contexts/UserContextProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <SearchQueryContextProvider>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create-pin" element={<CreatePinPage />} />
                  <Route path="/profile/:username" element={<ProfilePage />} />
                  <Route path="/pin/:id" element={<PinDetailsPage />} />
                  <Route path="/test" element={<ImageKitUpload />} />
                </Route>
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>
            </Routes>
          </SearchQueryContextProvider>
        </UserContextProvider>
      </BrowserRouter>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
