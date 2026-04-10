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
  let imageUrl = null;

  if (form.image) {
    const fileExt = form.image.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("heros")
      .upload(fileName, form.image);

    if (error) {
      console.error(error);
      return;
    }

    const { data } = supabase.storage
      .from("heros")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }

  await supabase.from("heros").insert([
    {
      name: form.name,
      help: form.help,
      image: imageUrl,
    },
  ]);

  navigate("/admin/heros");
};

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Hero</h1>

      <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2 mb-3" />
      <input name="help" placeholder="Help" onChange={handleChange} className="w-full border p-2 mb-3" />
     <input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) =>
    setForm({ ...form, image: e.target.files[0] })
  }
  className="w-full border p-2 mb-3"
/>

      <button onClick={addHero} className="bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}