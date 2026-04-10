import { useNavigate } from "react-router-dom";

export default function HeaderBanner() {
  const navigate = useNavigate();

  const scrollToDogs = () => {
    const section = document.getElementById("dogs-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden md:flex md:items-center">
        
        {/* TEXT SECTION */}
        <div className="p-5 md:p-8 md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
           A platform where only animals matter
          </h1>

          <p className="text-gray-600 mt-3 text-sm md:text-base">
            Hashero is built for one simple reason — to connect real people with
            animals who genuinely need help. Every dog you see here has a story,
            a struggle, and a chance at a better life.
          </p>

          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Whether it’s adopting, sponsoring medical care, or simply sharing,
            your action directly impacts a life. No middlemen, no confusion —
            just transparent help where you can see exactly where your support goes.
          </p>

          <p className="text-gray-500 mt-2 text-sm hidden md:block">
            The goal is simple: build a space where helping is real, visible,
            and actually reaches the ones who need it most.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-3 mt-5 flex-wrap">
            <button
              onClick={scrollToDogs}
              className="bg-black text-white px-5 py-2 rounded-full text-sm shadow"
            >
              View Dogs Near You
            </button>

            <button
              onClick={() => navigate("/success")}
              className="bg-gray-100 px-5 py-2 rounded-full text-sm"
            >
              See Success Stories
            </button>
          </div>
        </div>

        {/* IMAGE SECTION */}
       <div className="md:w-1/2 relative">
  <img
    src="/catdog.jpg"
    alt="dog"
    className="w-full h-64  md:h-[60vh] object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
</div>
      </div>
    </div>
  );
}