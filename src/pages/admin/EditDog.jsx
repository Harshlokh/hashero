import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function EditDog() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDog();
  }, []);

  const fetchDog = async () => {
    const { data } = await supabase
      .from("dogs")
      .select("*")
      .eq("id", id)
      .single();

    setForm(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateDog = async () => {
    await supabase.from("dogs").update(form).eq("id", id);
    navigate("/adminhashero");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Dog</h1>

      {Object.keys(form).map((field) =>
        field !== "id" && field !== "created_at" ? (
          <input
            key={field}
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
          />
        ) : null
      )}

      <button
        onClick={updateDog}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}