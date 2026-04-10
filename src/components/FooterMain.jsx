import { useNavigate } from "react-router-dom";

export default function FooterMain() {
  const navigate = useNavigate();

  return (
    <div id="footer-section" className="bg-[#f9fafb]  border-t mt-10">
      <div className="px-4 p-5 mx-auto">
        
        {/* TOP */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          
          {/* BRAND */}
          <div>
            <h2
              onClick={() => navigate("/")}
              className="text-lg font-semibold cursor-pointer"
            >
              Hashero 🐾
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              A transparent platform to help, rescue, and adopt animals in need.
              Real stories. Real impact.
            </p>
            <p className="text-sm text-green-600 mt-2 max-w-sm">

                email: harshlokhande486@gmail.com</p>
            <p className="text-sm text-green-600 mt-2 max-w-sm">

                number : 7821907069</p>
          </div>

          {/* LINKS */}
          <div className="flex gap-10 text-sm">
            <div>
              <p className="font-medium mb-2">Explore</p>
              <ul className="space-y-1 text-gray-500">
                <li
                  onClick={() => navigate("/")}
                  className="cursor-pointer hover:text-black"
                >
                  Home
                </li>
                <li
                  onClick={() => navigate("/success")}
                  className="cursor-pointer hover:text-black"
                >
                  Success Stories
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium mb-2">Get Involved</p>
              <ul className="space-y-1 text-gray-500">
                <li className="cursor-pointer hover:text-black">
                  Report a Dog
                </li>
                <li className="cursor-pointer hover:text-black">
                  Donate / Sponsor
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          
          <p>© {new Date().getFullYear()} Hashero. All rights reserved.</p>

          <p className="mt-2 md:mt-0">
            Built with care for animals 🐶
          </p>
        </div>
      </div>
    </div>
  );
}