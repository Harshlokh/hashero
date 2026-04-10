import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Detail from "./pages/Detail";
import Success from "./pages/Success";
import ImpactSection from "./pages/ImpactSection";
import AdminMain from "./pages/AdminMain";
import AddDog from "./pages/AddDog";
import EditDog from "./pages/admin/EditDog";
import AddHeros from "../src/pages/admin/AddHeros";
import ManageHeros from "../src/pages/admin/ManageHeros";
import EditHero from "./pages/admin/EditHero";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/dog/:id" element={<Detail />} />
        <Route path="/success" element={<Success />} />
        <Route path="/impact" element={<ImpactSection />} />
        <Route path="/adminhashero" element={<AdminMain />} />
        <Route path="/adminadddog" element={<AddDog />} />
        <Route path="/admin/editdog/:id" element={<EditDog />} />
        <Route path="/admin/addheros" element={<AddHeros />} />
        <Route path="/admin/heros" element={<ManageHeros />} />
        <Route path="/admin/heros/edit/:id" element={<EditHero />} />
        
      </Routes>
    </BrowserRouter>
  );
}