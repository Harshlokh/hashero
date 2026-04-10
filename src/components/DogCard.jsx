import { useNavigate } from "react-router-dom";

export default function DogCard({ dog }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dog/${dog.id}`)}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={dog.image}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* STATUS BADGE */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-xs rounded-full text-gray-800 shadow-sm">
          {dog.status}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {dog.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {dog.location}
        </p>

        {/* subtle divider vibe */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Tap to view story →
          </span>
        </div>
      </div>
    </div>
  );
}