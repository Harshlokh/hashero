import { useEffect, useState } from "react";
import { dogs } from "../data";
import DogCard from "../components/DogCard";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import HeaderBanner from "../components/HeaderBanner";
import HasheroHeros from "../components/HasheroHeros";
import ReportDogModal from "../forms/ReportDogModal";
import FooterMain from "../components/FooterMain";
import { supabase } from "../lib/supabase";

export default function Feed() {
  const [location, setLocation] = useState("All");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const [dogs,setDogs]=useState([]);
  const [loading,setLoading]=useState(true);

  const [openForm, setOpenForm] = useState(false);

  const filtered = dogs.filter((dog) => {
    return (
      (location === "All" || dog.location === location) &&
      (category === "All" || dog.category === category) &&
      !dog.is_success
    );
  });


  useEffect(() => {
  fetchDogs();
}, []);

const fetchDogs = async () => {
  const { data, error } = await supabase
    .from("dogs")
    .select("*")
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

  <HeaderBanner />
  <HasheroHeros />

  {/* DOGS SECTION */}
  <div id="dogs-section" className="px-4 mt-6 pb-24">
    
    {/* SECTION HEADER */}
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold">
          Dogs Looking for Help 
        </h2>
        <p className="text-sm text-gray-500">
          Adopt, support, or simply share their story
        </p>
      </div>
    </div>

    {/* GRID */}
    {loading ? (
  <p className="text-center mt-10 text-gray-500">Loading dogs...</p>
) : filtered.length === 0 ? (
  <p className="text-center text-gray-500 mt-10">
    No dogs available right now.
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    {filtered.map((dog) => (
      <DogCard key={dog.id} dog={dog} />
    ))}
  </div>
)}
  </div>

  {/* FLOATING CTA */}
 <button
  onClick={() => setOpenForm(true)}
  className="fixed bottom-5 right-5 bg-black text-white px-5 py-3 rounded-full shadow-lg text-sm"
>
  + Help a Dog
</button>

{openForm && <ReportDogModal onClose={() => setOpenForm(false)} />}
    <FooterMain />
</div>
  );
}