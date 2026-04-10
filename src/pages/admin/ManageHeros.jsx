import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminHeros() {
  const [heros, setHeros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHeros();
  }, []);

  const fetchHeros = async () => {
    const { data } = await supabase
      .from("heros")
      .select("*")
      .order("created_at", { ascending: false });

    setHeros(data);
  };

  const deleteHero = async (id) => {
    if (!confirm("Delete this hero?")) return;

    await supabase.from("heros").delete().eq("id", id);
    fetchHeros();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex gap-5 sm:flex-row flex-col justify-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold">Heros</h1>
        <Link to="/">
          {" "}
          <button className="bg-black text-white rounded-md text-sm px-4 py-2">
            Go home
          </button>
        </Link>
        <button
          onClick={() => navigate("/admin/addheros")}
          className="bg-green-600 max-w-[120px] text-sm text-white px-4 py-2 rounded"
        >
          + Add Hero
        </button>
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-4 md:hidden">
        {heros.map((hero) => (
          <div key={hero.id} className="bg-white p-4 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <img src={hero.image} className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="font-semibold">{hero.name}</h2>
                <p className="text-sm text-gray-500">{hero.help}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/admin/heros/edit/${hero.id}`)}
                className="flex-1 bg-blue-500 text-white py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteHero(hero.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <table className="w-full border rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Help</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {heros.map((hero) => (
              <tr key={hero.id} className="border-t">
                <td className="p-3">
                  <img src={hero.image} className="w-10 h-10 rounded-full" />
                </td>

                <td className="p-3">{hero.name}</td>
                <td className="p-3 text-gray-600">{hero.help}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/heros/edit/${hero.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHero(hero.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
