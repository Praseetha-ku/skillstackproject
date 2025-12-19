import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dasboard";
import AddSkill from "./pages/AddSkill";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/skills/add" element={<AddSkill />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
