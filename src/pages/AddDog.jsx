import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AddDog() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await supabase.from("dogs").insert([form]);
    navigate("/adminhashero");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Dog</h1>

      {["name","location","status","category","image","description","adoption_link","payment_link"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}