import DogCard from "../components/DogCard";
import MainNavbar from "../components/MainNavbar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Success() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    const { data, error } = await supabase
      .from("dogs")
      .select("*")
      .eq("is_success", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setDogs(data);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f4]">
      <MainNavbar />

      {/* HEADER */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Success Stories 🎉
        </h1>
        <p className="text-gray-600 text-sm mt-2 max-w-xl">
          These are real stories of dogs who were rescued, treated, and given a
          second chance. Every contribution made a difference.
        </p>
      </div>

      {/* GRID */}
      <div className="px-4 pb-24">
        {loading ? (
          <p className="text-center mt-10 text-gray-500">
            Loading stories...
          </p>
        ) : dogs.length === 0 ? (
          <div className="text-center mt-16 text-gray-500">
            <p>No success stories yet.</p>
            <p className="text-sm mt-1">
              Be the first to create one 🐾
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}