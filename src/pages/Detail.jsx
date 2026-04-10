import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import MainNavbar from "../components/MainNavbar";

export default function Detail() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDog();
  }, [id]);

  const fetchDog = async () => {
    const { data, error } = await supabase
      .from("dogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setDog(data);
    }

    setLoading(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!dog) return <div className="p-6">Dog not found</div>;

  return (
    <div className=" min-h-[calc(100vh-70px)] mx-auto">
     <MainNavbar />
     <div className="p-6">
     <h1 className="font-bold text-black text-2xl sm:text-4xl">Here are the details of {dog.name}</h1>
      <img
        src={dog.image}
        className="w-full h-80 mt-10 max-w-3xl object-cover rounded-2xl mb-4"
      />

      <h1 className="text-3xl font-bold">{dog.name}</h1>
      <p className="text-gray-500">{dog.location}</p>

      {/* STATUS */}
      <span className="inline-block mt-2 bg-gray-100 px-3 py-1 text-xs rounded-full">
        {dog.status}
      </span>

      {/* CATEGORY */}
      <p className="mt-2 text-sm text-gray-400">
        {dog.category}
      </p>

      <p className="mt-4 text-lg">{dog.description}</p>

      {/* Actions */}
      <div className="mt-6 flex gap-4 flex-wrap">
        {dog.adoption_link && (
          <a
            href={dog.adoption_link}
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            I want to Adopt
          </a>
        )}

        {dog.payment_link && (
          <a
            href={dog.payment_link}
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Sponsor Medical Care
          </a>
        )}
      </div>
      </div>
    </div>
  );
}