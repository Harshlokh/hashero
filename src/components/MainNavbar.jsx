import { useNavigate, useLocation } from "react-router-dom";

export default function MainNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "View Impact", path: "/impact" },
    { name: "Success", path: "/success" },
{ name: "Contact", action: "scroll-footer" }
  ];

  return (
    <>
      {/* TOP NAV (Desktop) */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b sticky top-0 z-50">
        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold cursor-pointer"
        >
          Hashero 🐾
        </h1>

        <div className="flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
  if (item.action === "scroll-footer") {
    const footer = document.getElementById("footer-section");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    navigate(item.path);
  }
}}
              className="text-gray-800 hover:text-black text-sm font-semibold"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM NAV (Mobile) */}
      <div className="md:hidden flex max-[480px]:flex-col items-center justify-between  w-full border-b py-4 px-8 bg-white border-t z-50">
        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold cursor-pointer"
        >
          Hashero 🐾
        </h1>
        <div className="flex  justify-between gap-4 py-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
  if (item.action === "scroll-footer") {
    const footer = document.getElementById("footer-section");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    navigate(item.path);
  }
}}
              className="flex flex-col items-center max-[370px]:text-[12px] text-sm font-semibold text-gray-800  hover:text-black "
            >
              {/* ICONS (simple + clean) */}
              <span className="">
                {item.name === "Home" && ""}
                {item.name === "View Impact" && ""}
                {item.name === "Success" && ""}
                {item.name === "Contact" && ""}
              </span>

              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}