import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const heros = [
  {
    name: "Aarav",
    help: "Sponsored surgery for Moti",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sneha",
    help: "Adopted 2 puppies",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul",
    help: "Donated for 5 rescues",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Priya",
    help: "Helped injured street dogs",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function HasheroHeros() {

  const [heros, setHeros] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchHeros();
  }, []);

  const fetchHeros = async () => {
    const { data, error } = await supabase
      .from("heros")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setHeros(data);
    }
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? heros.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === heros.length - 1 ? 0 : prev + 1));
  };

  // prevent crash before data loads
  if (!heros.length) return null;

  const visible = [
    heros[(current - 1 + heros.length) % heros.length],
    heros[current],
    heros[(current + 1) % heros.length],
  ];


  return (
    <div className="px-4 py-16 bg-gray-50 text-center">
      {/* HEADER */}
      <h2 className="text-2xl md:text-3xl font-bold">
        Hashero Heros 🏆
      </h2>
      <p className="text-gray-600 text-sm mt-1 mb-6">
        Real people making real impact. You could be here next.
      </p>

      {/* CAROUSEL */}
      <div className="flex items-center justify-center gap-4">

        {/* LEFT */}
        {/* <button
          onClick={prev}
          className="hidden md:block bg-white shadow p-2 rounded-full"
        >
          ◀
        </button> */}

        {/* DESKTOP (3 CARDS) */}
        <div className="hidden md:flex items-center gap-4">
          {visible.map((hero, index) => {
            const isCenter = index === 1;

            return (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl p-4 transition-all duration-300
                  ${isCenter ? "scale-110 shadow-lg" : "scale-95 opacity-70"}
                  w-[260px] lg:w-[320px]
                `}
              >
                <img
                  src={hero.image}
                  className="w-14 h-14 rounded-full object-cover mx-auto"
                />

                <h3 className="mt-3 font-semibold text-lg">
                  {hero.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {hero.help}
                </p>

                <span className="inline-block mt-3 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Impact Maker
                </span>
              </div>
            );
          })}
        </div>

        {/* MOBILE (1 CARD ONLY) */}
        <div className="md:hidden w-full max-w-xs">
          <div className="bg-white rounded-2xl shadow p-4">
            <img
              src={heros[current].image}
              className="w-14 h-14 rounded-full object-cover mx-auto"
            />

            <h3 className="mt-3 font-semibold text-lg">
              {heros[current].name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {heros[current].help}
            </p>

            <span className="block mt-3 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Impact Maker
            </span>
          </div>

        
        </div>

        <div className="flex justify-between items-center gap-10 absolute">
          {/* LEFT */}
        <button
         onClick={prev} 
          className=" bg-white  shadow mt-64  p-3 rounded-full"
        >
              ◀
            </button>
        {/* RIGHT */}
        <button
          onClick={next}
          className=" bg-white  shadow mt-64  p-3 rounded-full"
        >
          ▶
        </button>
        </div>
      </div>
    </div>
  );
}