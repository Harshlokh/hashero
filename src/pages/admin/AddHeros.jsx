import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AddHero() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addHero = async () => {
    await supabase.from("heros").insert([form]);
    navigate("/admin/heros");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Hero</h1>

      <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2 mb-3" />
      <input name="help" placeholder="Help" onChange={handleChange} className="w-full border p-2 mb-3" />
      <input name="image" placeholder="Image URL" onChange={handleChange} className="w-full border p-2 mb-3" />

      <button onClick={addHero} className="bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}