import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function EditHero() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    const { data } = await supabase
      .from("heros")
      .select("*")
      .eq("id", id)
      .single();

    setForm(data);
  };

  const updateHero = async () => {
    await supabase.from("heros").update(form).eq("id", id);
    navigate("/admin/heros");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Hero</h1>

      <input
        name="name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 mb-3"
      />

      <input
        name="help"
        value={form.help || ""}
        onChange={(e) => setForm({ ...form, help: e.target.value })}
        className="w-full border p-2 mb-3"
      />

      <input
        name="image"
        value={form.image || ""}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="w-full border p-2 mb-3"
      />

      <button
        onClick={updateHero}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}