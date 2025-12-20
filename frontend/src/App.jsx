import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dasboard";
import AddSkill from "./pages/AddSkill";
import SkillList from "./pages/Skills";

import DailyLogList from "./pages/DailyList";
import AddDailyLog from "./pages/DailyLogs";
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/skills/add" element={<AddSkill />} />
      <Route path="/skills" element={<SkillList />} />
      <Route path="/skills/add/daily" element={<AddDailyLog />} />
      <Route path="/logs" element={<DailyLogList />} />
      <Route path="/profile" element={<Profile />} />


      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
