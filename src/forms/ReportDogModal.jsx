import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ReportDogModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  let imageUrl = null;

  if (form.image) {
    const fileExt = form.image.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("reports")
      .upload(fileName, form.image);

    if (error) {
      console.error("Upload error:", error);
    } else {
      const { data } = supabase.storage
        .from("reports")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }
  }

  await supabase.from("dog_reports").insert([
    {
      name: form.name,
      phone: form.phone,
      location: form.location,
      description: form.description,
      image: imageUrl,
    },
  ]);

  alert("Report submitted 🚀");
  onClose();
};
  return (
    <div className="fixed inset-0 bg-black/40  flex  items-center justify-center z-50">
      
      {/* MODAL */}
      <div className="bg-white w-full md:max-w-md mx-5 rounded-2xl  p-5">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Report a Dog in Need 🐾
          </h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Found a dog that needs help? Share details and we’ll take it from here.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Dog Location (Area / City)"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />

          <textarea
            name="description"
            placeholder="What happened? (injured, abandoned, etc.)"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm"
          />

          {/* ACTIONS */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-sm mt-2"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}