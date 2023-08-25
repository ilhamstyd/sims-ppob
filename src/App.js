import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Navigationbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { Profile } from "./pages/Profile";
import TopUp from "./pages/TopUp";
import ListTransaction from "./pages/ListTransaction";
import ProfileEdit from "./pages/ProfileEdit";

function App() {
  return (
      <div>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile-buy/:id" element={<Profile />} />
          <Route path="/top-up" element={<TopUp />} />
          <Route path="/list-transaction" element={<ListTransaction />} />
          <Route path="/myprofile" element={<ProfileEdit />} />
        </Routes>
      </div>
  );
}

export default App;
